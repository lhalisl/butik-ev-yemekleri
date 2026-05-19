'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2, ShoppingBag, MapPin, Phone, User, FileText, Bike, Store, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import type { DeliveryType } from '@/lib/types';

const DELIVERY_OPTIONS: { value: DeliveryType; label: string; desc: string; icon: React.ReactNode }[] = [
  { value: 'delivery', label: 'Eve Teslimat', desc: 'Kapınıza getiriyoruz', icon: <Bike size={20} /> },
  { value: 'pickup', label: 'Gel-Al', desc: 'Adresten teslim alın', icon: <Store size={20} /> },
  { value: 'dine-in', label: 'Restoranda', desc: 'Masanıza servis', icon: <UtensilsCrossed size={20} /> },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Lütfen ad ve telefon numaranızı giriniz.');
      return;
    }
    if (deliveryType === 'delivery' && !form.address.trim()) {
      toast.error('Teslimat adresi zorunludur.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name.trim(),
          customer_phone: form.phone.trim(),
          customer_address: form.address.trim(),
          notes: form.notes.trim(),
          delivery_type: deliveryType,
          total,
          items: items.map(i => ({
            product_id: i.product.id,
            quantity: i.quantity,
            unit_price: i.product.price,
            product_name: i.product.name,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sipariş oluşturulamadı.');

      clearCart();
      router.push(`/siparis/${data.id}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Bir hata oluştu, tekrar deneyin.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <ShoppingBag size={56} className="mx-auto mb-4 text-muted opacity-30" />
            <h2 className="text-2xl font-bold text-green mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Sepetiniz boş</h2>
            <p className="text-muted text-sm mb-6">Sipariş vermek için önce menüden ürün ekleyin.</p>
            <Link href="/menu" className="bg-green text-white px-6 py-3 rounded-full font-semibold text-sm inline-block">
              Menüye Git
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-cream pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/menu" className="text-muted hover:text-green transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-bold text-green" style={{ fontFamily: 'var(--font-heading)' }}>
              Siparişi Tamamla
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form — left */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">

              {/* Delivery type */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-text/8">
                <h2 className="text-base font-semibold text-green mb-4">Teslimat Türü</h2>
                <div className="grid grid-cols-3 gap-3">
                  {DELIVERY_OPTIONS.map(o => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setDeliveryType(o.value)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all text-center ${
                        deliveryType === o.value
                          ? 'border-green bg-green/5 text-green'
                          : 'border-gray-200 text-muted hover:border-green/40'
                      }`}
                    >
                      {o.icon}
                      <span className="text-xs font-semibold">{o.label}</span>
                      <span className="text-[10px] opacity-60">{o.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal info */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-text/8 space-y-4">
                <h2 className="text-base font-semibold text-green">Müşteri Bilgileri</h2>

                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    placeholder="Ad Soyad *"
                    value={form.name}
                    onChange={set('name')}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green focus:outline-none text-sm"
                  />
                </div>

                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="tel"
                    placeholder="Telefon Numarası *"
                    value={form.phone}
                    onChange={set('phone')}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green focus:outline-none text-sm"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-4 text-muted" />
                    <textarea
                      placeholder="Teslimat Adresi * (Mahalle, sokak, bina, daire)"
                      value={form.address}
                      onChange={set('address')}
                      rows={2}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green focus:outline-none text-sm resize-none"
                    />
                  </div>
                )}

                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-4 text-muted" />
                  <textarea
                    placeholder="Sipariş notu (opsiyonel)"
                    value={form.notes}
                    onChange={set('notes')}
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green focus:outline-none text-sm resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-burgundy hover:bg-burgundy-dark disabled:opacity-60 text-white py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : null}
                {loading ? 'Sipariş oluşturuluyor…' : `Sipariş Ver — ${total.toLocaleString('tr-TR')} ₺`}
              </button>
            </form>

            {/* Order summary — right */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-text/8 sticky top-24">
                <h2 className="text-base font-semibold text-green mb-4 flex items-center gap-2">
                  <ShoppingBag size={17} />
                  Sipariş Özeti
                </h2>
                <ul className="space-y-3 mb-5">
                  {items.map(item => (
                    <li key={item.product.id} className="flex gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-cream-warm">
                        {item.product.image_url && (
                          <Image src={item.product.image_url} alt={item.product.name} width={48} height={48} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-burgundy flex-shrink-0">
                        {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted text-sm">Toplam</span>
                    <span className="text-2xl font-bold text-green" style={{ fontFamily: 'var(--font-heading)' }}>
                      {total.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
