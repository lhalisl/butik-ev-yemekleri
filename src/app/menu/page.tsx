'use client';
import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import MenuCard from '@/components/MenuCard';
import { CATEGORIES } from '@/lib/menuData';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

// Soup first, mains by number, dessert last.
const sortKey = (mn: string) =>
  mn === 'soup' ? -1 : mn === 'tatli' ? 9999 : (parseInt(mn, 10) || 5000);

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load real products (with real DB ids) so orders carry valid product_ids.
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true);
      if (!alive) return;
      if (!error && data) {
        setProducts(
          [...(data as Product[])].sort((a, b) => sortKey(a.menu_number) - sortKey(b.menu_number)),
        );
      }
      setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(
    () => (activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)),
    [activeCategory, products],
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
            {CATEGORIES.map((cat) => (
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
                    {products.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="bg-dark-bg min-h-screen py-8 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <p className="text-white/40 text-center py-16">Menü yükleniyor…</p>
            ) : filtered.length === 0 ? (
              <p className="text-white/40 text-center py-16">Bu kategoride yemek bulunamadı.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((product) => (
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
