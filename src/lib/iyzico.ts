// iyzico (iyzipay) helpers. Server-only — never import into a client component.
import Iyzipay from 'iyzipay';

export function getIyzipay() {
  return new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY!,
    secretKey: process.env.IYZICO_SECRET_KEY!,
    uri: process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com',
  });
}

// Re-export the enum bag so routes can use Iyzipay.LOCALE etc.
export { Iyzipay };

// Promise wrappers around the callback-style SDK.
export function initCheckoutForm(iyzipay: any, request: any): Promise<any> {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) =>
      err ? reject(err) : resolve(result),
    );
  });
}

export function retrieveCheckoutForm(iyzipay: any, request: any): Promise<any> {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutForm.retrieve(request, (err: any, result: any) =>
      err ? reject(err) : resolve(result),
    );
  });
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
