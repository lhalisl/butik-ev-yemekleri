import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { IYZ, retrieveCheckoutForm } from '@/lib/iyzico';

export const dynamic = 'force-dynamic';

// POST /api/payment/iyzico/callback
// iyzico posts the form token here after the buyer completes 3DS. We retrieve
// the result, mark the order paid/failed, and redirect to the order page.
export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const supabase = createServiceClient();

  let token = '';
  try {
    const form = await req.formData();
    token = String(form.get('token') || '');
  } catch {
    // ignore; handled below
  }

  const fail = (orderId?: string) =>
    NextResponse.redirect(
      `${origin}/${orderId ? `siparis/${orderId}` : 'checkout'}?odeme=basarisiz`,
      { status: 303 },
    );

  if (!token) return fail();

  // Match the order via the token we stashed at init.
  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('payment_ref', token)
    .single();

  let result: any;
  try {
    result = await retrieveCheckoutForm({
      locale: IYZ.LOCALE_TR,
      conversationId: order?.id || 'callback',
      token,
    });
  } catch {
    return fail(order?.id);
  }

  const orderId = order?.id || result?.conversationId;
  if (!orderId) return fail();

  const paid = result.status === 'success' && result.paymentStatus === 'SUCCESS';

  await supabase
    .from('orders')
    .update({
      payment_status: paid ? 'paid' : 'failed',
      payment_ref: paid ? String(result.paymentId) : token,
    })
    .eq('id', orderId);

  return NextResponse.redirect(
    `${origin}/siparis/${orderId}${paid ? '?odeme=basarili' : '?odeme=basarisiz'}`,
    { status: 303 },
  );
}
