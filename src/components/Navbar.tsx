'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/#hakkimizda', label: 'Hakkımızda' },
    { href: '/menu',        label: 'Menü' },
    { href: '/#yorumlar',   label: 'Yorumlar' },
    { href: '/#iletisim',   label: 'İletişim' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-green shadow-lg h-14'
          : 'h-18'
      }`}
      style={!scrolled ? {
        background: 'linear-gradient(to bottom, rgba(17,38,24,0.75) 0%, rgba(17,38,24,0) 100%)',
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 cursor-pointer">
          <Image
            src="/hazal_chef_logo.png"
            alt="Hazal Chef"
            width={44}
            height={44}
            className={`rounded-full drop-shadow-md transition-all duration-300 ${scrolled ? 'w-9 h-9' : 'w-11 h-11'}`}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold tracking-wide transition-colors relative group cursor-pointer"
              style={{ color: '#ffffff', textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-3 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            aria-label="Sepeti aç"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Sepet</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-burgundy text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>

          {/* Order CTA */}
          <Link
            href="/menu"
            className="hidden sm:flex items-center bg-gold hover:bg-gold-light text-green-dark px-4 py-2 rounded-full text-sm font-bold transition-all btn-gold cursor-pointer"
          >
            Sipariş Ver
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1 cursor-pointer"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menüyü aç"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="md:hidden bg-green border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-base font-semibold py-1 border-b border-white/10 transition-colors cursor-pointer hover:text-gold"
              style={{ color: '#ffffff' }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/menu"
            className="bg-gold text-green-dark text-center py-2 rounded-full font-bold cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            Sipariş Ver
          </Link>
        </div>
      )}
    </header>
  );
}
