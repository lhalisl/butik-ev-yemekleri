import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { Clock, Leaf, Tag, Heart, ChevronDown } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <ScrollReveal />
      <main>

        {/* ── HERO ── */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center text-center text-white"
          style={{
            backgroundImage: "url('/brand_assets/restaurant_interior_hazal_1779105131583.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-green-dark/30 via-green-dark/65 to-green-dark/90" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-32">
            <span className="animate-hero-0 inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold border border-gold/30 bg-gold/10 px-4 py-2 rounded-full mb-6">
              Şef Hazal Demir İmzalı
            </span>
            <h1 className="animate-hero-1 text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Annenizin Mutfağından<br />
              <span className="text-gold">Şefin Elinden</span>
            </h1>
            <p className="animate-hero-2 text-white/80 text-lg md:text-xl font-light mb-10 leading-relaxed">
              Günlük taze ev yemekleri&nbsp;•&nbsp;Esenyurt / İstanbul<br />
              Gece 24:00'e kadar hizmetinizdeyiz
            </p>
            <div className="animate-hero-3 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu"
                className="btn-primary-shimmer text-white px-8 py-4 rounded-full text-base font-bold shadow-lg"
              >
                Hemen Sipariş Ver
              </Link>
              <Link
                href="/menu"
                className="btn-outline border border-white/60 hover:border-white text-white px-8 py-4 rounded-full text-base font-medium"
              >
                Menüyü Gör
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 animate-bounce">
            <ChevronDown size={30} />
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="hakkimizda" className="py-24 bg-cream overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-burgundy mb-3 block">Hakkımızda</span>
              <h2 className="text-4xl md:text-5xl font-bold text-green mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Hazal Chef'in<br />Hikayesi
              </h2>
              <span className="gold-line mb-6" />
              <p className="text-muted text-base leading-relaxed mb-4">
                2024 yılında Esenyurt'ta kapılarını açan Butik Ev Yemekleri, Şef Hazal Demir'in annesinden öğrendiği tariflerle hayata geçirdiği samimi bir lezzet durağıdır.
              </p>
              <p className="text-muted text-base leading-relaxed mb-8">
                Her tabak, endüstriyel mutfakların değil; sevgiyle, taze malzemeyle ve geleneksel yöntemlerle hazırlanmış ev yemeklerinin sıcaklığını taşır.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Her sabah taze pişirilir, ertesi güne bırakılmaz',
                  'Katkısız, mevsimlik malzemeler',
                  'Gece 24:00\'e kadar sıcak servis',
                ].map((v, i) => (
                  <li key={v} className={`reveal delay-${i + 1} flex items-center gap-3 text-muted text-sm border-b border-text/8 pb-3`}>
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <Link href="/menu" className="btn-press inline-block bg-green hover:bg-green-mid text-white px-6 py-3 rounded-full font-semibold transition-colors text-sm">
                Menüyü Keşfet
              </Link>
            </div>
            <div className="reveal-left relative">
              <Image
                src="/brand_assets/restaurant_interior_hazal_1779105131583.png"
                alt="Hazal Chef restoranının içi"
                width={600}
                height={520}
                className="rounded-2xl object-cover shadow-2xl w-full h-[500px]"
                style={{ objectFit: 'cover' }}
              />
              <div className="float-badge absolute -bottom-5 -left-5 w-20 h-20 bg-cream rounded-full border-2 border-gold/30 p-1.5 shadow-lg">
                <Image src="/brand_assets/butik_ev_yemekleri_logo_1779105040278.png" alt="Logo" width={80} height={80} className="rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ── SPOTLIGHT ── */}
        <section
          id="imza-yemek"
          className="relative py-24 overflow-hidden"
          style={{
            backgroundImage: "url('/brand_assets/kuzu_tandir_meal_1779105065583.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(8,18,10,0.98) 0%, rgba(8,18,10,0.9) 40%, rgba(8,18,10,0.4) 70%, rgba(8,18,10,0.15) 100%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="reveal text-xs font-semibold tracking-[0.18em] uppercase text-gold mb-4 block">İmza Yemek</span>
              <h2 className="reveal delay-1 text-5xl md:text-6xl font-bold text-gold mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Kuzu But<br />Tandır
              </h2>
              <p className="reveal delay-2 text-white/75 text-base leading-relaxed mb-6">
                300 gramlık kuzu but, saatlerce tütsüde sabırla pişirilir. Her lokmasında Şef Hazal'ın imzasını hissedersiniz.
              </p>
              <div className="reveal delay-2 text-white text-5xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                450 <span className="text-2xl opacity-60">₺</span>
              </div>
              <p className="reveal delay-3 text-gold text-sm mb-8">Pilav &nbsp;•&nbsp; Salata &nbsp;•&nbsp; Ayran dahil</p>
              <Link
                href="/menu"
                className="reveal delay-3 btn-gold inline-block bg-gold hover:bg-gold-light text-green-dark px-8 py-4 rounded-full font-bold shadow-lg"
              >
                Hemen Sipariş Ver
              </Link>
            </div>
            <div className="reveal-scale hidden lg:flex justify-center">
              <Image
                src="/brand_assets/kuzu_tandir_hazal_1779105143670.png"
                alt="Kuzu But Tandır"
                width={480}
                height={480}
                className="rounded-2xl shadow-2xl"
                style={{ transform: 'perspective(1000px) rotateY(-3deg)' }}
              />
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ── */}
        <section id="neden-biz" className="py-20 bg-green text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="reveal text-center mb-12">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold mb-3 block">Neden Hazal Chef?</span>
              <h2 className="text-3xl font-bold italic" style={{ fontFamily: 'var(--font-heading)' }}>Anne eli değmiş gibi</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Leaf size={28} />, title: 'Günlük Taze', desc: 'Her sabah taze malzemelerle hazırlanır. Dünden kalma asla yok.' },
                { icon: <Clock size={28} />, title: 'Gece 24:00\'e Kadar', desc: 'Geç saatlerde de sıcak, taze yemek kapınıza gelir.' },
                { icon: <Tag size={28} />, title: 'Uygun Fiyat', desc: '100 ₺\'den başlayan fiyatlarla doyurucu ev lezzetleri.' },
                { icon: <Heart size={28} />, title: 'Ev Lezzeti', desc: 'Şef Hazal\'ın annesinden öğrendiği tarifler, sevgiyle hazırlanır.' },
              ].map((b, i) => (
                <div key={b.title} className={`reveal delay-${i + 1} text-center group`}>
                  <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mx-auto mb-4 transition-all duration-300 group-hover:bg-gold/20 group-hover:border-gold/60 group-hover:scale-110">
                    {b.icon}
                  </div>
                  <h3 className="font-semibold text-gold-light mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{b.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="yorumlar" className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="reveal text-center mb-12">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-burgundy mb-3 block">Yorumlar</span>
              <h2 className="text-4xl font-bold text-green mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Müşteri Yorumları</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-5xl font-bold text-green" style={{ fontFamily: 'var(--font-heading)' }}>4.1</span>
                <div>
                  <div className="flex text-gold text-xl">{'★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}<span className="opacity-30">★</span></div>
                  <p className="text-muted text-xs">Google Yorumlarına Göre</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: 'Ahmet Y.', stars: 5, text: '"Kuzu tandırı kesinlikle denemelisiniz. Et o kadar yumuşak ki çatalla ayrılıyor. Fiyat-kalite dengesi mükemmel."' },
                { name: 'Fatma K.', stars: 5, text: '"Ev yemekleri diyorlar, gerçekten öyle. Patlıcan musakka tam annemin yaptığı gibi. Sütlaç da favorim oldu."' },
                { name: 'Mert O.',  stars: 4, text: '"Gece 11\'de sipariş verdim, 35 dakikada geldi ve hâlâ sıcaktı. Kuzu kaburga tandır çok doldurucu."' },
                { name: 'Selin A.', stars: 4, text: '"Çiğ köftesi enfes! Sipariş süreci çok kolay, anında onay geliyor. Kesinlikle tavsiye ederim."' },
              ].map((r, i) => (
                <div key={r.name} className={`reveal delay-${i + 1} bg-card rounded-2xl p-6 shadow-sm border border-text/8 hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-text">{r.name}</p>
                      <div className="text-gold text-sm">{'★'.repeat(r.stars)}<span className="opacity-25">{'★'.repeat(5 - r.stars)}</span></div>
                    </div>
                  </div>
                  <p className="text-muted text-sm leading-relaxed italic">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="iletisim" className="py-24 bg-green-dark text-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold mb-4 block">İletişim</span>
              <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Bize Ulaşın</h2>
              <span className="gold-line mb-8" />
              <div className="space-y-5">
                {[
                  { label: 'Adres', value: 'Barbaros Hayrettin Paşa, 2300. Sk. No:34522, 34440 Esenyurt / İstanbul' },
                  { label: 'Çalışma Saatleri', value: 'Her gün — Gece 24:00\'e kadar açık' },
                ].map(c => (
                  <div key={c.label} className="flex gap-4">
                    <div>
                      <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">{c.label}</p>
                      <p className="text-white/70 text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/menu" className="btn-primary-shimmer text-white px-6 py-3 rounded-full font-bold text-sm text-center">
                  Online Sipariş Ver
                </Link>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Barbaros+Hayrettin+Pa%C5%9Fa+2300+Sk+No+34522+Esenyurt+%C4%B0stanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline border border-gold/40 text-gold-light hover:border-gold text-center px-6 py-3 rounded-full text-sm"
                >
                  Haritada Gör
                </a>
              </div>
            </div>
            <div className="reveal-scale bg-green/30 border border-gold/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
              <div className="float-badge">
                <Image src="/hazal_chef_logo.png" alt="Hazal Chef" width={80} height={80} className="rounded-full" />
              </div>
              <div>
                <p className="text-gold-light font-bold text-xl" style={{ fontFamily: 'var(--font-heading)' }}>Hazal Chef</p>
                <p className="text-white/50 text-sm">Butik Ev Yemekleri</p>
                <p className="text-white/50 text-sm">Esenyurt / İstanbul</p>
              </div>
              <Link
                href="/menu"
                className="btn-gold bg-gold hover:bg-gold-light text-green-dark font-bold px-6 py-3 rounded-full text-sm"
              >
                Sipariş Ver
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
