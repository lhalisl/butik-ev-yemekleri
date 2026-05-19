'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        toast.error('Şifre hatalı.');
        return;
      }
      router.push('/admin/siparisler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/hazal_chef_logo.png" alt="Hazal Chef" width={72} height={72} className="rounded-full mx-auto mb-4 shadow-lg" />
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Hazal Chef
          </h1>
          <p className="text-white/50 text-sm mt-1">Yönetim Paneli</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-green font-semibold text-center">Giriş Yap</h2>

          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type={show ? 'text' : 'password'}
              placeholder="Şifre"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-green focus:outline-none text-sm"
            />
            <button
              type="button"
              onClick={() => setShow(v => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-green hover:bg-green-mid disabled:opacity-50 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </main>
  );
}
