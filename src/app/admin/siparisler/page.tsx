'use client';
import { useEffect, useState, useCallback } from 'react';
import { RefreshCw, ChevronDown, ChevronUp, Phone, MapPin, FileText, Clock } from 'lucide-react';
import { toast } from 'sonner';
import type { Order, OrderItem, OrderStatus } from '@/lib/types';

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'bekliyor',     label: 'Bekliyor',     color: 'bg-blue-100 text-blue-700' },
  { value: 'hazirlaniyor', label: 'Hazırlanıyor', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'yolda',        label: 'Yolda',        color: 'bg-orange-100 text-orange-700' },
  { value: 'teslim',       label: 'Teslim',       color: 'bg-green-100 text-green-700' },
  { value: 'iptal',        label: 'İptal',        color: 'bg-red-100 text-red-700' },
];

function statusInfo(s: OrderStatus) {
  return STATUS_OPTIONS.find(o => o.value === s) ?? STATUS_OPTIONS[0];
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function AdminSiparislerPage() {
  const [orders, setOrders] = useState<(Order & { order_items: OrderItem[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error('Siparişler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    setUpdating(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      toast.success('Durum güncellendi.');
    } catch {
      toast.error('Güncelleme başarısız.');
    } finally {
      setUpdating(null);
    }
  };

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s.value] = orders.filter(o => o.status === s.value).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Siparişler</h1>
          <p className="text-gray-500 text-sm">{orders.length} toplam sipariş</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-gray-200 hover:border-green px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Yenile
        </button>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {STATUS_OPTIONS.map(s => (
          <div key={s.value} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-800">{counts[s.value] || 0}</p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Orders table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw size={24} className="animate-spin mr-2" /> Yükleniyor…
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Henüz sipariş yok.</div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const s = statusInfo(order.status);
            const isExp = expanded === order.id;
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isExp ? null : order.id)}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                    #{order.order_number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{order.customer_name}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <Clock size={11} />
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${s.color}`}>
                    {s.label}
                  </span>
                  <p className="font-bold text-gray-800 text-sm flex-shrink-0">
                    {order.total.toLocaleString('tr-TR')} ₺
                  </p>
                  {isExp ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>

                {/* Expanded detail */}
                {isExp && (
                  <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 space-y-4">
                    {/* Customer info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Phone size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{order.customer_phone}</span>
                      </div>
                      {order.customer_address && (
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{order.customer_address}</span>
                        </div>
                      )}
                      {order.notes && (
                        <div className="flex items-start gap-2 sm:col-span-2">
                          <FileText size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 italic">{order.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Ürünler</p>
                      <ul className="space-y-1">
                        {order.order_items?.map(item => (
                          <li key={item.id} className="flex justify-between text-sm text-gray-700">
                            <span>{item.product_name} <span className="text-gray-400">x{item.quantity}</span></span>
                            <span className="font-medium">{(item.unit_price * item.quantity).toLocaleString('tr-TR')} ₺</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Status update */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Durum Güncelle</p>
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map(s => (
                          <button
                            key={s.value}
                            disabled={order.status === s.value || updating === order.id}
                            onClick={() => updateStatus(order.id, s.value)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all border-2 ${
                              order.status === s.value
                                ? `${s.color} border-transparent`
                                : 'border-gray-200 text-gray-500 hover:border-gray-400 bg-white'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
