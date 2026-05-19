import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-green-dark" style={{ borderTop: '1px solid rgba(201,168,76,0.2)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image src="/hazal_chef_logo.png" alt="Hazal Chef" width={64} height={64} className="rounded-full opacity-90" />
          <div>
            <p className="text-gold-light font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>Hazal Chef</p>
            <p className="text-white/65 text-xs mt-0.5">Butik Ev Yemekleri</p>
            <p className="text-white/65 text-xs">Şef Hazal Demir İmzalı</p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2.5 text-center">
          {[
            { href: '/',             label: 'Ana Sayfa' },
            { href: '/menu',         label: 'Menü' },
            { href: '/#hakkimizda',  label: 'Hakkımızda' },
            { href: '/#iletisim',    label: 'İletişim' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/75 hover:text-gold text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="text-right space-y-1.5">
          <p className="text-gold font-semibold text-sm">Esenyurt / İstanbul</p>
          <p className="text-white/70 text-xs leading-relaxed">Barbaros Hayrettin Paşa, 2300. Sk. No:34522</p>
          <p className="text-white/70 text-xs">Her gün — Gece 24:00'e kadar</p>
        </div>
      </div>

      <div className="section-divider" />
      <div className="px-6 py-4 text-center">
        <p className="text-white/45 text-xs">© 2024 Hazal Chef — Butik Ev Yemekleri. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}
