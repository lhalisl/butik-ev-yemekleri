'use client';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { getBadgeLabel } from '@/lib/menuData';
import type { Product } from '@/lib/types';

export default function MenuCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} sepete eklendi`, {
      description: `${product.price.toLocaleString('tr-TR')} ₺`,
      duration: 2000,
    });
  };

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden bg-dark-card shadow-lg border border-white/5 group transition-transform duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-green-dark flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-gold/20 opacity-40" />
          </div>
        )}

        {/* Badge */}
        <span className="absolute top-2 left-2 bg-green-dark/85 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-sm border border-white/10 z-10">
          {getBadgeLabel(product.menu_number)}
        </span>

        {/* Featured star */}
        {product.featured && (
          <span className="absolute top-2 right-2 bg-gold/90 text-green-dark px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 z-10">
            <Star size={10} fill="currentColor" />
            İmza
          </span>
        )}

        {/* Out of stock overlay */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <span className="text-white font-bold text-sm bg-red-600 px-3 py-1 rounded-full">Tükendi</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 bg-dark-card">
        <h3 className="text-white font-semibold text-base leading-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </h3>
        {product.includes && (
          <p className="text-white/40 text-xs mb-3 leading-relaxed">{product.includes}</p>
        )}

        <div className="mt-auto pt-3 border-t border-white/8 space-y-2">
          <p className="text-gold font-bold text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            {product.price.toLocaleString('tr-TR')} <span className="text-sm opacity-70">₺</span>
          </p>
          <button
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-burgundy hover:bg-burgundy-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all"
          >
            <ShoppingCart size={15} />
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
}
