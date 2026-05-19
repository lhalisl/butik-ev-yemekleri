'use client';
import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import MenuCard from '@/components/MenuCard';
import { MENU_ITEMS, CATEGORIES } from '@/lib/menuData';
import type { Product } from '@/lib/types';

// Build fake Product objects from static data (stock = 99 until Supabase is seeded)
const PRODUCTS: Product[] = MENU_ITEMS.map((item, idx) => ({
  ...item,
  id: `static-${idx}`,
  stock: 99,
  min_stock: 5,
  created_at: new Date().toISOString(),
}));

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(
    () => activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        {/* Header */}
        <section
          className="relative pt-32 pb-16 text-center text-white"
          style={{ background: 'linear-gradient(to bottom, #0c1810, #1A3A2A)' }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 block">
            Günlük Taze
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Günün Yemekleri
          </h1>
          <p className="text-white/55 text-base">
            Her gün taze hazırlanan Hazal Chef imzalı lezzetler&nbsp;•&nbsp;100&nbsp;₺'den başlayan fiyatlar
          </p>
        </section>

        {/* Filter tabs */}
        <section className="sticky top-14 z-30 bg-dark-bg/95 backdrop-blur-md border-b border-white/8 py-4">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all min-h-[40px] ${
                  activeCategory === cat.value
                    ? 'bg-gold text-green-dark shadow-md'
                    : 'border border-white/20 text-white/70 hover:border-gold hover:text-gold'
                }`}
              >
                {cat.label}
                {cat.value === 'all' && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === 'all' ? 'bg-green-dark/20' : 'bg-white/10'
                  }`}>
                    {PRODUCTS.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="bg-dark-bg min-h-screen py-8 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {filtered.length === 0 ? (
              <p className="text-white/40 text-center py-16">Bu kategoride yemek bulunamadı.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map(product => (
                  <MenuCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
