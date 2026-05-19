'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, ShoppingBag, Package, LogOut, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/siparisler', label: 'Siparişler', icon: <ShoppingBag size={18} /> },
  { href: '/admin/urunler',    label: 'Ürünler',    icon: <Package size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-green-dark flex flex-col shadow-xl
        transition-transform duration-300 ease-in-out
        md:static md:w-56 md:flex-shrink-0 md:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/hazal_chef_logo.png" alt="Hazal Chef" width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-white text-sm font-semibold leading-tight">Hazal Chef</p>
                <p className="text-white/60 text-xs">Yönetim Paneli</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="md:hidden text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <p className="text-white/50 text-[10px] uppercase tracking-widest px-3 py-2">Menü</p>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/85 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
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
            className="flex items-center gap-2 px-3 py-2 text-white/65 hover:text-white text-xs transition-colors"
          >
            <LayoutDashboard size={14} />
            Siteye Git
          </Link>
          <Link
            href="/api/admin/logout"
            className="flex items-center gap-2 px-3 py-2 text-white/65 hover:text-red-400 text-xs transition-colors"
          >
            <LogOut size={14} />
            Çıkış Yap
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-green-dark sticky top-0 z-30 border-b border-white/10">
          <button
            onClick={() => setOpen(true)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <Menu size={22} />
          </button>
          <Image src="/hazal_chef_logo.png" alt="Hazal Chef" width={28} height={28} className="rounded-full" />
          <span className="text-white text-sm font-semibold">Hazal Chef</span>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
