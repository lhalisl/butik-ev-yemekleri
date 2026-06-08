import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// The store's built-in admin has been retired in favour of the single
// Operations Panel. This notice points staff to the new panel.
export default function AdminRetiredPage() {
  const panelUrl = process.env.NEXT_PUBLIC_PANEL_URL || 'http://localhost:3000';

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <p className="text-xs uppercase tracking-widest text-muted mb-3">Hazal Chef</p>
        <h1
          className="text-3xl font-bold text-green mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Yönetim Paneli Taşındı
        </h1>
        <p className="text-muted text-sm mb-8">
          Sipariş takibi, durum güncelleme ve stok yönetimi artık tek bir yerde:
          <span className="font-semibold text-green"> Operasyon Paneli</span>. Bu eski
          ekran kullanımdan kaldırıldı.
        </p>
        <a
          href={panelUrl}
          className="inline-flex items-center justify-center gap-2 bg-green hover:bg-green-mid text-white px-6 py-3 rounded-full font-semibold text-sm transition-all"
        >
          Operasyon Paneline Git
          <ArrowRight size={16} />
        </a>
        <div className="mt-6">
          <Link href="/" className="text-muted hover:text-green text-xs underline">
            Müşteri sitesine dön
          </Link>
        </div>
      </div>
    </main>
  );
}
