import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Clock, MapPin, Phone, Package, ChefHat } from 'lucide-react';
import { createServiceClient } from '@/lib/supabase';
import type { Order, OrderItem } from '@/lib/types';

const STATUS_CONFIG = {
  bekliyor:      { label: 'Sipariş Alındı', color: 'bg-blue-100 text-blue-700',   icon: <Clock size={16} /> },
  hazirlaniyor:  { label: 'Hazırlanıyor',   color: 'bg-yellow-100 text-yellow-700', icon: <ChefHat size={16} /> },
  yolda:         { label: 'Yolda',          color: 'bg-orange-100 text-orange-700', icon: <Package size={16} /> },
  teslim:        { label: 'Teslim Edildi',  color: 'bg-green-100 text-green-700',   icon: <CheckCircle size={16} /> },
  iptal:         { label: 'İptal Edildi',   color: 'bg-red-100 text-red-700',       icon: null },
};

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  online: 'Online Kart', nakit: 'Nakit', kapida_kart: 'Kapıda Kart',
};
const PAYMENT_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  paid:     { label: 'Ödendi',          color: 'bg-green-100 text-green-700' },
  pending:  { label: 'Tahsil edilecek', color: 'bg-yellow-100 text-yellow-700' },
  failed:   { label: 'Ödeme başarısız', color: 'bg-red-100 text-red-700' },
  refunded: { label: 'İade edildi',     color: 'bg-orange-100 text-orange-700' },
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ odeme?: string }>;
}) {
  const { id } = await params;
  const { odeme } = await searchParams;
  const supabase = createServiceClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .single<Order & { order_items: OrderItem[]; payment_method?: string; payment_status?: string }>();

  if (error || !order) notFound();

  const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.bekliyor;
  const payMethod = PAYMENT_METHOD_LABEL[order.payment_method ?? 'nakit'] ?? order.payment_method;
  const payStatus = PAYMENT_STATUS_CONFIG[order.payment_status ?? 'pending'] ?? PAYMENT_STATUS_CONFIG.pending;
  // Payment result banner for online orders (DB is source of truth; ?odeme is a hint).
  const showPayBanner = order.payment_method === 'online' || odeme === 'basarili' || odeme === 'basarisiz';
  const paid = order.payment_status === 'paid';
  const payFailed = order.payment_status === 'failed' || (odeme === 'basarisiz' && !paid);

  return (
    <main className="min-h-screen bg-cream flex items-start justify-center pt-16 pb-16 px-4">
      <div className="w-full max-w-lg">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Siparişiniz Alındı!
          </h1>
          <p className="text-muted text-sm">
            Sipariş No: <span className="font-bold text-green">#{order.order_number}</span>
          </p>
        </div>

        {/* Payment result banner (online orders) */}
        {showPayBanner && (
          <div
            className={`rounded-2xl p-4 mb-4 text-sm font-medium ${
              paid
                ? 'bg-green-50 text-green-800 border border-green-200'
                : payFailed
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
            }`}
          >
            {paid
              ? '✓ Ödemeniz başarıyla alındı. Teşekkür ederiz!'
              : payFailed
                ? 'Ödeme tamamlanamadı. Siparişiniz kaydedildi — nakit/kapıda ödeyebilir veya tekrar deneyebilirsiniz.'
                : 'Ödemeniz bekleniyor.'}
          </div>
        )}

        {/* Status card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-text/8 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Sipariş Durumu</span>
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${status.color}`}>
              {status.icon}
              {status.label}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-sm text-muted">Ödeme</span>
            <span className="flex items-center gap-2 text-xs">
              <span className="font-medium text-text">{payMethod}</span>
              <span className={`font-semibold px-3 py-1.5 rounded-full ${payStatus.color}`}>{payStatus.label}</span>
            </span>
          </div>
        </div>

        {/* Customer info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-text/8 mb-4 space-y-3">
          <h2 className="text-sm font-semibold text-green">Sipariş Bilgileri</h2>
          <div className="flex items-start gap-2 text-sm">
            <Phone size={15} className="text-muted flex-shrink-0 mt-0.5" />
            <span className="text-text">{order.customer_name} — {order.customer_phone}</span>
          </div>
          {order.customer_address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={15} className="text-muted flex-shrink-0 mt-0.5" />
              <span className="text-text">{order.customer_address}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Package size={15} className="text-muted flex-shrink-0" />
            <span className="text-text capitalize">{
              { delivery: 'Eve Teslimat', pickup: 'Gel-Al', 'dine-in': 'Restoranda' }[order.delivery_type]
            }</span>
          </div>
          {order.notes && (
            <p className="text-xs text-muted bg-cream rounded-lg px-3 py-2">{order.notes}</p>
          )}
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-text/8 mb-4">
          <h2 className="text-sm font-semibold text-green mb-3">Sipariş İçeriği</h2>
          <ul className="space-y-2">
            {order.order_items?.map(item => (
              <li key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-text">{item.product_name}</span>
                <div className="flex items-center gap-2 text-muted">
                  <span>x{item.quantity}</span>
                  <span className="font-semibold text-burgundy">
                    {(item.unit_price * item.quantity).toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
            <span className="text-muted text-sm">Toplam</span>
            <span className="font-bold text-green text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
              {order.total.toLocaleString('tr-TR')} ₺
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-3">
          <p className="text-muted text-xs">
            Siparişinizle ilgili sorularınız için telefon ile ulaşabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              className="bg-green hover:bg-green-mid text-white px-6 py-3 rounded-full font-semibold text-sm text-center transition-all"
            >
              Yeni Sipariş Ver
            </Link>
            <Link
              href="/"
              className="border border-green/30 text-green px-6 py-3 rounded-full text-sm text-center transition-all hover:bg-green/5"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
