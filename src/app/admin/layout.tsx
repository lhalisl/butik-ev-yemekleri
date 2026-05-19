import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, ShoppingBag, Package, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/siparisler', label: 'Siparişler', icon: <ShoppingBag size={18} /> },
  { href: '/admin/urunler',    label: 'Ürünler',    icon: <Package size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-green-dark flex-shrink-0 flex flex-col shadow-xl">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image src="/hazal_chef_logo.png" alt="Hazal Chef" width={40} height={40} className="rounded-full" />
            <div>
              <p className="text-white text-sm font-semibold leading-tight">Hazal Chef</p>
              <p className="text-white/40 text-xs">Yönetim Paneli</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <p className="text-white/30 text-[10px] uppercase tracking-widest px-3 py-2">Menü</p>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            <LayoutDashboard size={14} />
            Siteye Git
          </Link>
          <Link
            href="/api/admin/logout"
            className="flex items-center gap-2 px-3 py-2 text-white/40 hover:text-red-400 text-xs transition-colors"
          >
            <LogOut size={14} />
            Çıkış Yap
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
