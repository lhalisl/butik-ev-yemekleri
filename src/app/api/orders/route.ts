import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import type { CreateOrderPayload } from '@/lib/types';

// GET /api/orders — admin: list all orders newest first
export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/orders — create new order
export async function POST(req: NextRequest) {
  const body: CreateOrderPayload = await req.json();

  if (!body.customer_name || !body.customer_phone || !body.items?.length) {
    return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Insert order
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      customer_address: body.customer_address || null,
      notes: body.notes || null,
      delivery_type: body.delivery_type,
      total: body.total,
      status: 'bekliyor',
    })
    .select()
    .single();

  if (orderErr || !order) {
    return NextResponse.json({ error: orderErr?.message ?? 'Sipariş oluşturulamadı.' }, { status: 500 });
  }

  // Insert order items
  const orderItems = body.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    product_name: item.product_name,
  }));

  const { error: itemsErr } = await supabase.from('order_items').insert(orderItems);
  if (itemsErr) {
    // Rollback order if items fail
    await supabase.from('orders').delete().eq('id', order.id);
    return NextResponse.json({ error: itemsErr.message }, { status: 500 });
  }

  // Decrement stock for each product
  for (const item of body.items) {
    await supabase.rpc('decrement_stock', {
      product_id: item.product_id,
      amount: item.quantity,
    });
  }

  return NextResponse.json(order, { status: 201 });
}
