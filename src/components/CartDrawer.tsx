'use client';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-green text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span className="font-semibold">Sepetim</span>
            {items.length > 0 && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                {items.length} ürün
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Sepeti kapat"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted px-8 text-center">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="text-sm">Sepetiniz boş</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-green font-medium hover:underline"
              >
                Menüye git →
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map(item => (
                <li key={item.product.id} className="flex gap-3 p-4">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-cream-warm">
                    {item.product.image_url && (
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text line-clamp-1">{item.product.name}</p>
                    {item.product.includes && (
                      <p className="text-xs text-muted line-clamp-1">{item.product.includes}</p>
                    )}
                    <p className="text-sm font-bold text-burgundy mt-1">
                      {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted hover:text-red-500 transition-colors"
                      aria-label="Kaldır"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-4 bg-cream">
            <div className="flex justify-between items-center">
              <span className="text-muted text-sm">Toplam</span>
              <span className="text-xl font-bold text-green" style={{ fontFamily: 'var(--font-heading)' }}>
                {total.toLocaleString('tr-TR')} ₺
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-burgundy hover:bg-burgundy-dark text-white text-center py-3 rounded-full font-bold transition-all shadow-md"
            >
              Siparişi Tamamla
            </Link>

            <button
              onClick={clearCart}
              className="block w-full text-sm text-muted hover:text-red-500 text-center transition-colors"
            >
              Sepeti Temizle
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
