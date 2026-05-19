'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, ShoppingBag, Package, LogOut, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/siparisler', label: 'Siparişler', icon: <ShoppingBag size={18} /> },
  { href: '/admin/urunler',    label: 'Ürünler',    icon: <Package size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/admin/giris') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col shadow-xl transition-transform duration-300 ease-in-out md:static md:w-56 md:flex-shrink-0 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ backgroundColor: '#112618' }}
      >
        {/* Logo */}
        <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/hazal_chef_logo.png" alt="Hazal Chef" width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-sm font-semibold leading-tight" style={{ color: '#ffffff' }}>Hazal Chef</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>Yönetim Paneli</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="md:hidden transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <p className="text-[10px] uppercase tracking-widest px-3 py-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Menü</p>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold"
                style={{
                  color: '#ffffff',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <LayoutDashboard size={14} />
            Siteye Git
          </Link>
          <Link
            href="/api/admin/logout"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <LogOut size={14} />
            Çıkış Yap
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 sticky top-0 z-30" style={{ backgroundColor: '#112618', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <button onClick={() => setOpen(true)} style={{ color: 'rgba(255,255,255,0.85)' }}>
            <Menu size={22} />
          </button>
          <Image src="/hazal_chef_logo.png" alt="Hazal Chef" width={28} height={28} className="rounded-full" />
          <span className="text-sm font-semibold" style={{ color: '#ffffff' }}>Hazal Chef</span>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}