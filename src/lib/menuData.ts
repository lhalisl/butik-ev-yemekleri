import type { Product, Category } from './types';

type StaticProduct = Omit<Product, 'id' | 'created_at' | 'stock' | 'min_stock'>;

export const MENU_ITEMS: StaticProduct[] = [
  { menu_number: 'soup', name: 'Yayla Çorbası', includes: 'Günlük taze hazırlanır', price: 100, category: 'corba-tatli', image_url: '/brand_assets/menu/yayla_corbasi.webp', active: true, featured: false },
  { menu_number: '1',    name: 'Antep Soğan Kebabı', includes: 'Pilav • Çorba', price: 275, category: 'et-tandir', image_url: '/brand_assets/menu/antep_sogan_kebap.jpg', active: true, featured: false },
  { menu_number: '2',    name: 'Soslu Kaşarlı Köfte', includes: 'Spagetti Makarna • Çorba', price: 300, category: 'et-tandir', image_url: '/brand_assets/menu/soslu_kasarli_kofte.png', active: true, featured: false },
  { menu_number: '3',    name: 'Fırın Tavuk Baget But', includes: 'Sebzeli • Pilav • Çorba', price: 275, category: 'tavuk', image_url: '/brand_assets/menu/firin_tavuk_baget_but.webp', active: true, featured: false },
  { menu_number: '4',    name: 'Patlıcan Musakka', includes: 'Dana Kıyma • Pilav • Yoğurt', price: 275, category: 'ev-yemekleri', image_url: '/brand_assets/menu/patlican_musakka.jpg', active: true, featured: false },
  { menu_number: '5',    name: 'Kuzu Kaburga Tandır', includes: 'Sebzeli • Pilav • Çorba', price: 350, category: 'et-tandir', image_url: '/brand_assets/kuzu_tandir_meal_1779105065583.png', active: true, featured: true },
  { menu_number: '6',    name: 'Kuzu But Tandır (300g)', includes: 'Pilav • Salata • Ayran', price: 450, category: 'et-tandir', image_url: '/brand_assets/kuzu_tandir_hazal_1779105143670.png', active: true, featured: true },
  { menu_number: '7',    name: 'Dana Et Kavurma', includes: '120g • Pilav • Salata • Ayran', price: 450, category: 'et-tandir', image_url: '/brand_assets/menu/dana_et_kavurma.jpg', active: true, featured: false },
  { menu_number: '8',    name: 'Et Sote', includes: 'Pilav • Çorba', price: 350, category: 'et-tandir', image_url: '/brand_assets/menu/et_sote.jpg', active: true, featured: false },
  { menu_number: '9',    name: 'Kilis Tava', includes: 'Pilav • Çorba', price: 300, category: 'et-tandir', image_url: '/brand_assets/menu/kilis_tava.jpg', active: true, featured: false },
  { menu_number: '10',   name: 'Çiğ Köfte', includes: '250g • Yeşillik • 3 Lavaş • Soslar', price: 250, category: 'ev-yemekleri', image_url: '/brand_assets/menu/cig_kofte.jpg', active: true, featured: false },
  { menu_number: '11',   name: 'Fırın Tavuk Tava', includes: 'Pilav • Çorba', price: 275, category: 'tavuk', image_url: '/brand_assets/menu/firin_tavuk_tava.webp', active: true, featured: false },
  { menu_number: '12',   name: 'Zeytinyağlı Barbunya', includes: 'Pilav • Yoğurt', price: 250, category: 'ev-yemekleri', image_url: '/brand_assets/menu/zeytinyagli_barbunya.jpg', active: true, featured: false },
  { menu_number: '13',   name: 'Köri Soslu Tavuk', includes: 'Makarna • Çorba', price: 275, category: 'tavuk', image_url: '/brand_assets/menu/kori_soslu_tavuk.webp', active: true, featured: false },
  { menu_number: '14',   name: 'Etli Kuru Fasulye', includes: 'Pilav • Yoğurt', price: 250, category: 'ev-yemekleri', image_url: '/brand_assets/menu/etli_kuru_fasulye.jpg', active: true, featured: false },
  { menu_number: '15',   name: 'Etli Nohut Yahni', includes: 'Pilav • Yoğurt', price: 250, category: 'ev-yemekleri', image_url: '/brand_assets/menu/etli_nohut_yahni.jpg', active: true, featured: false },
  { menu_number: '16',   name: 'Ton Balıklı Salata', includes: 'Jumbo Kraft Kase • Çorba', price: 275, category: 'ev-yemekleri', image_url: '/brand_assets/menu/ton_balikli_salata.jpg', active: true, featured: false },
  { menu_number: '17',   name: 'Etli Taze Fasulye', includes: 'Pilav • Yoğurt', price: 250, category: 'ev-yemekleri', image_url: '/brand_assets/menu/etli_taze_fasulye.webp', active: true, featured: false },
  { menu_number: '18',   name: 'Soslu Fırın Kanat', includes: 'Pilav • Salata', price: 275, category: 'tavuk', image_url: '/brand_assets/menu/soslu_firin_kanat.jpg', active: true, featured: false },
  { menu_number: '19',   name: 'Soslu Fırın Kalçalı But', includes: 'Pilav • Salata', price: 275, category: 'tavuk', image_url: '/brand_assets/menu/soslu_firin_kalcali_but.jpg', active: true, featured: false },
  { menu_number: '20',   name: 'Fırın Tavuk Pirzola', includes: '2 Adet • Pilav • Salata', price: 275, category: 'tavuk', image_url: '/brand_assets/menu/firin_tavuk_pirzola.jpg', active: true, featured: false },
  { menu_number: '21',   name: 'Fırın Tavuk Baget But (2 Adet)', includes: 'Pilav • Salata', price: 275, category: 'tavuk', image_url: '/brand_assets/menu/firin_tavuk_but.jpg', active: true, featured: false },
  { menu_number: '22',   name: 'Tavuk Sote', includes: 'Pilav • Çorba', price: 250, category: 'tavuk', image_url: '/brand_assets/menu/tavuk_sote.jpg', active: true, featured: false },
  { menu_number: '23',   name: 'Etli Bamya', includes: 'Bulgur Pilavı • Yoğurt', price: 250, category: 'ev-yemekleri', image_url: '/brand_assets/menu/etli_bamya.avif', active: true, featured: false },
  { menu_number: '24',   name: 'Tavuklu Nohutlu Pilav', includes: 'Ayran • Turşu', price: 250, category: 'tavuk', image_url: '/brand_assets/menu/tavuklu_nohutlu_pilav.png', active: true, featured: false },
  { menu_number: 'tatli',name: 'Fırın Sütlaç', includes: 'Günlük taze pişirilir', price: 100, category: 'corba-tatli', image_url: '/brand_assets/menu/firin_sutlac.jpg', active: true, featured: false },
];

export const CATEGORIES: { value: string; label: string }[] = [
  { value: 'all',          label: 'Tümü' },
  { value: 'et-tandir',    label: 'Et & Tandır' },
  { value: 'tavuk',        label: 'Tavuk' },
  { value: 'ev-yemekleri', label: 'Ev Yemekleri' },
  { value: 'corba-tatli',  label: 'Çorba & Tatlı' },
];

export const BADGE_LABEL: Record<string, string> = {
  soup:  'Günün Çorbası',
  tatli: 'Tatlı',
};

export function getBadgeLabel(menuNumber: string): string {
  return BADGE_LABEL[menuNumber] ?? `Menü ${menuNumber}`;
}
