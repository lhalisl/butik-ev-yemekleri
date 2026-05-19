'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { RefreshCw, Plus, Minus, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/lib/types';

const CATEGORY_LABELS: Record<string, string> = {
  'et-tandir': 'Et & Tandır',
  'tavuk': 'Tavuk',
  'ev-yemekleri': 'Ev Yemekleri',
  'corba-tatli': 'Çorba & Tatlı',
};

export default function AdminUrunlerPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error('Ürünler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStock = async (productId: string, newStock: number) => {
    if (newStock < 0) return;
    setSaving(productId);
    try {
      const res = await fetch(`/api/products`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId, stock: newStock }),
      });
      if (!res.ok) throw new Error();
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    } catch {
      toast.error('Stok güncellenemedi.');
    } finally {
      setSaving(null);
    }
  };

  const toggleActive = async (product: Product) => {
    setSaving(product.id);
    try {
      const res = await fetch(`/api/products`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, active: !product.active }),
      });
      if (!res.ok) throw new Error();
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, active: !p.active } : p));
      toast.success(`${product.name} ${!product.active ? 'aktif' : 'pasif'} yapıldı.`);
    } catch {
      toast.error('Güncellenemedi.');
    } finally {
      setSaving(null);
    }
  };

  const grouped = products.reduce((acc, p) => {
    const cat = p.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {} as Record<string, Product[]>);

  const lowStock = products.filter(p => p.stock <= p.min_stock && p.stock > 0);
  const outOfStock = products.filter(p => p.stock === 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ürünler & Stok</h1>
          <p className="text-gray-500 text-sm">{products.length} ürün</p>
        </div>
        <button onClick={load} disabled={loading} className="flex items-center gap-2 bg-white border border-gray-200 hover:border-green px-4 py-2 rounded-xl text-sm font-medium transition-all">
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Yenile
        </button>
      </div>

      {/* Alerts */}
      {outOfStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 font-semibold text-sm">Tükenen ürünler ({outOfStock.length})</p>
            <p className="text-red-600 text-xs mt-0.5">{outOfStock.map(p => p.name).join(', ')}</p>
          </div>
        </div>
      )}
      {lowStock.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-700 font-semibold text-sm">Düşük stoklu ürünler ({lowStock.length})</p>
            <p className="text-yellow-600 text-xs mt-0.5">{lowStock.map(p => `${p.name} (${p.stock})`).join(', ')}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw size={24} className="animate-spin mr-2" /> Yükleniyor…
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
                {CATEGORY_LABELS[cat] ?? cat}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-4 py-3">Ürün</th>
                      <th className="text-right px-4 py-3 hidden sm:table-cell">Fiyat</th>
                      <th className="text-center px-4 py-3">Stok</th>
                      <th className="text-center px-4 py-3 hidden sm:table-cell">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map(product => (
                      <tr key={product.id} className={`${!product.active ? 'opacity-50' : ''}`}>
                        {/* Name + image */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-cream">
                              {product.image_url && (
                                <Image src={product.image_url} alt={product.name} width={40} height={40} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 leading-tight">{product.name}</p>
                              {product.includes && <p className="text-xs text-gray-400 leading-tight">{product.includes}</p>}
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-3 text-right hidden sm:table-cell">
                          <span className="text-sm font-bold text-gray-700">{product.price.toLocaleString('tr-TR')} ₺</span>
                        </td>

                        {/* Stock control */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => updateStock(product.id, product.stock - 1)}
                              disabled={saving === product.id || product.stock === 0}
                              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className={`w-10 text-center text-sm font-bold ${
                              product.stock === 0 ? 'text-red-600' :
                              product.stock <= product.min_stock ? 'text-yellow-600' :
                              'text-gray-800'
                            }`}>
                              {product.stock}
                            </span>
                            <button
                              onClick={() => updateStock(product.id, product.stock + 1)}
                              disabled={saving === product.id}
                              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </td>

                        {/* Active toggle */}
                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                          <button
                            onClick={() => toggleActive(product)}
                            disabled={saving === product.id}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all border ${
                              product.active
                                ? 'bg-green/10 text-green border-green/30 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                                : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-green/10 hover:text-green'
                            }`}
                          >
                            {product.active ? 'Aktif' : 'Pasif'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
