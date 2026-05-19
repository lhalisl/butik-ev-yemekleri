import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// GET /api/products — list all active products ordered by category
export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category')
    .order('menu_number');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PATCH /api/products — update stock or active status (admin)
export async function PATCH(req: NextRequest) {
  const body: { id: string; stock?: number; active?: boolean } = await req.json();

  if (!body.id) return NextResponse.json({ error: 'id gerekli.' }, { status: 400 });

  const updates: Record<string, unknown> = {};
  if (body.stock !== undefined) updates.stock = Math.max(0, body.stock);
  if (body.active !== undefined) updates.active = body.active;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
