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
    { href: '/menu', label: 'Menü' },
    { href: '/#yorumlar', label: 'Yorumlar' },
    { href: '/#iletisim', label: 'İletişim' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-green shadow-lg h-14' : 'bg-transparent h-18'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
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
              className="text-white/85 hover:text-white text-sm font-medium transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-full text-sm font-semibold transition-all"
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
            className="hidden sm:flex items-center bg-gold hover:bg-gold-light text-green-dark px-4 py-2 rounded-full text-sm font-bold transition-all"
          >
            Sipariş Ver
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
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
              className="text-white/80 hover:text-gold text-base font-medium py-1 border-b border-white/10"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/menu"
            className="bg-gold text-green-dark text-center py-2 rounded-full font-bold"
            onClick={() => setMenuOpen(false)}
          >
            Sipariş Ver
          </Link>
        </div>
      )}
    </header>
  );
}
