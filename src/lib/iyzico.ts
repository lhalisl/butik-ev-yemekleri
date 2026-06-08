// Dependency-free iyzico client. We call the REST API directly with the
// IYZWSv2 HMAC-SHA256 signature (replicated from the iyzipay SDK), so there are
// no native/dynamic-require deps for the bundler to miss on Vercel.
import crypto from 'crypto';

const BASE = process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com';

const PATHS = {
  initialize: '/payment/iyzipos/checkoutform/initialize/auth/ecom',
  retrieve: '/payment/iyzipos/checkoutform/auth/ecom/detail',
};

// Enum string values from the SDK (Iyzipay.js).
export const IYZ = {
  LOCALE_TR: 'tr',
  CURRENCY_TRY: 'TRY',
  PAYMENT_GROUP_PRODUCT: 'PRODUCT',
  BASKET_ITEM_PHYSICAL: 'PHYSICAL',
} as const;

function authHeader(path: string, bodyStr: string, randomString: string): string {
  const secret = process.env.IYZICO_SECRET_KEY || '';
  const apiKey = process.env.IYZICO_API_KEY || '';
  // signature = HMAC_SHA256(secret, randomString + uriPath + body) as hex
  const signature = crypto
    .createHmac('sha256', secret)
    .update(randomString + path + bodyStr)
    .digest('hex');
  const params = [`apiKey:${apiKey}`, `randomKey:${randomString}`, `signature:${signature}`].join('&');
  return 'IYZWSv2 ' + Buffer.from(params).toString('base64');
}

async function iyziPost(path: string, body: unknown): Promise<any> {
  const bodyStr = JSON.stringify(body); // sign and send the EXACT same bytes
  const randomString = crypto.randomBytes(8).toString('hex');
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: {
      Authorization: authHeader(path, bodyStr, randomString),
      'x-iyzi-rnd': randomString,
      'x-iyzi-client-version': 'butik-ev-direct-1',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: bodyStr,
  });
  return res.json();
}

export function initCheckoutForm(request: unknown): Promise<any> {
  return iyziPost(PATHS.initialize, request);
}

export function retrieveCheckoutForm(request: unknown): Promise<any> {
  return iyziPost(PATHS.retrieve, request);
}

// Split "Ad Soyad" into name + surname (iyzico requires both).
export function splitName(full: string): { name: string; surname: string } {
  const parts = (full || '').trim().split(/\s+/);
  if (parts.length === 1) return { name: parts[0] || 'Müşteri', surname: parts[0] || 'Müşteri' };
  return { name: parts.slice(0, -1).join(' '), surname: parts[parts.length - 1] };
}

// iyzico wants +90XXXXXXXXXX; fall back to a sandbox-valid number.
export function toGsm(phone?: string): string {
  const d = (phone || '').replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('0')) return '+9' + d;
  if (d.length === 10) return '+90' + d;
  return '+905350000000';
}
