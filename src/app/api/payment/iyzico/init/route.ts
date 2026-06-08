import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { IYZ, initCheckoutForm, splitName, toGsm } from '@/lib/iyzico';

export const dynamic = 'force-dynamic';

// POST /api/payment/iyzico/init  { orderId }
// Builds an iyzico Checkout Form for an already-created (pending) order and
// returns the embeddable form content + token.
export async function POST(req: NextRequest) {
  const { orderId } = await req.json();
  if (!orderId) return NextResponse.json({ error: 'orderId gerekli.' }, { status: 400 });

  const supabase = createServiceClient();
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single();
  if (error || !order) return NextResponse.json({ error: 'Sipariş bulunamadı.' }, { status: 404 });

  const { name, surname } = splitName(order.customer_name);
  const origin = req.nextUrl.origin;
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '85.34.78.112';
  const address = order.customer_address || 'Adres belirtilmedi';

  // One basket line per order item; their sum must equal price exactly.
  const basketItems = (order.order_items || []).map((it: any) => ({
    id: String(it.product_id || it.id),
    name: it.product_name,
    category1: 'Yemek',
    itemType: IYZ.BASKET_ITEM_PHYSICAL,
    price: (Number(it.unit_price) * it.quantity).toFixed(2),
  }));
  const priceNum = basketItems.reduce((s: number, b: any) => s + Number(b.price), 0);
  const price = priceNum.toFixed(2);

  const request = {
    locale: IYZ.LOCALE_TR,
    conversationId: String(order.id),
    price,
    paidPrice: price,
    currency: IYZ.CURRENCY_TRY,
    basketId: `BEY-${order.order_number}`,
    paymentGroup: IYZ.PAYMENT_GROUP_PRODUCT,
    callbackUrl: `${origin}/api/payment/iyzico/callback`,
    enabledInstallments: [1],
    buyer: {
      id: String(order.id),
      name,
      surname,
      gsmNumber: toGsm(order.customer_phone),
      email: `siparis${order.order_number}@butikevyemekleri.com`,
      identityNumber: '11111111111',
      registrationAddress: address,
      ip,
      city: 'İstanbul',
      country: 'Türkiye',
    },
    shippingAddress: { contactName: order.customer_name, city: 'İstanbul', country: 'Türkiye', address },
    billingAddress: { contactName: order.customer_name, city: 'İstanbul', country: 'Türkiye', address },
    basketItems,
  };

  let result: any;
  try {
    result = await initCheckoutForm(request);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Ödeme başlatılamadı.' }, { status: 502 });
  }

  if (result.status !== 'success') {
    return NextResponse.json({ error: result.errorMessage || 'Ödeme başlatılamadı.' }, { status: 502 });
  }

  // Stash the token so the callback can find this order.
  await supabase.from('orders').update({ payment_ref: result.token }).eq('id', order.id);

  return NextResponse.json({
    checkoutFormContent: result.checkoutFormContent,
    token: result.token,
  });
}
