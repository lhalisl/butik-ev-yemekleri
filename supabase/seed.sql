-- ═══════════════════════════════════════════════════════
-- Hazal Chef — Seed Data (26 Menu Items)
-- Run AFTER schema.sql
-- ═══════════════════════════════════════════════════════

insert into products (menu_number, name, includes, price, category, image_url, stock, min_stock, active, featured)
values
  ('soup',  'Yayla Çorbası',              'Günlük taze hazırlanır',            100,  'corba-tatli',  '/brand_assets/menu/yayla_corbasi.webp',                       50, 5, true,  false),
  ('1',     'Antep Soğan Kebabı',          'Pilav • Çorba',                    275,  'et-tandir',    '/brand_assets/menu/antep_sogan_kebap.jpg',                    50, 5, true,  false),
  ('2',     'Soslu Kaşarlı Köfte',         'Spagetti Makarna • Çorba',          300,  'et-tandir',    '/brand_assets/menu/soslu_kasarli_kofte.png',                  50, 5, true,  false),
  ('3',     'Fırın Tavuk Baget But',       'Sebzeli • Pilav • Çorba',           275,  'tavuk',        '/brand_assets/menu/firin_tavuk_baget_but.webp',               50, 5, true,  false),
  ('4',     'Patlıcan Musakka',            'Dana Kıyma • Pilav • Yoğurt',       275,  'ev-yemekleri', '/brand_assets/menu/patlican_musakka.jpg',                     50, 5, true,  false),
  ('5',     'Kuzu Kaburga Tandır',         'Sebzeli • Pilav • Çorba',           350,  'et-tandir',    '/brand_assets/kuzu_tandir_meal_1779105065583.png',             50, 5, true,  true),
  ('6',     'Kuzu But Tandır (300g)',      'Pilav • Salata • Ayran',            450,  'et-tandir',    '/brand_assets/kuzu_tandir_hazal_1779105143670.png',            50, 5, true,  true),
  ('7',     'Dana Et Kavurma',             '120g • Pilav • Salata • Ayran',     450,  'et-tandir',    '/brand_assets/menu/dana_et_kavurma.jpg',                      50, 5, true,  false),
  ('8',     'Et Sote',                     'Pilav • Çorba',                    350,  'et-tandir',    '/brand_assets/menu/et_sote.jpg',                              50, 5, true,  false),
  ('9',     'Kilis Tava',                  'Pilav • Çorba',                    300,  'et-tandir',    '/brand_assets/menu/kilis_tava.jpg',                           50, 5, true,  false),
  ('10',    'Çiğ Köfte',                   '250g • Yeşillik • 3 Lavaş • Soslar',250,  'ev-yemekleri', '/brand_assets/menu/cig_kofte.jpg',                            50, 5, true,  false),
  ('11',    'Fırın Tavuk Tava',            'Pilav • Çorba',                    275,  'tavuk',        '/brand_assets/menu/firin_tavuk_tava.webp',                    50, 5, true,  false),
  ('12',    'Zeytinyağlı Barbunya',        'Pilav • Yoğurt',                   250,  'ev-yemekleri', '/brand_assets/menu/zeytinyagli_barbunya.jpg',                 50, 5, true,  false),
  ('13',    'Köri Soslu Tavuk',            'Makarna • Çorba',                  275,  'tavuk',        '/brand_assets/menu/kori_soslu_tavuk.webp',                    50, 5, true,  false),
  ('14',    'Etli Kuru Fasulye',           'Pilav • Yoğurt',                   250,  'ev-yemekleri', '/brand_assets/menu/etli_kuru_fasulye.jpg',                    50, 5, true,  false),
  ('15',    'Etli Nohut Yahni',            'Pilav • Yoğurt',                   250,  'ev-yemekleri', '/brand_assets/menu/etli_nohut_yahni.jpg',                     50, 5, true,  false),
  ('16',    'Ton Balıklı Salata',          'Jumbo Kraft Kase • Çorba',          275,  'ev-yemekleri', '/brand_assets/menu/ton_balikli_salata.jpg',                   50, 5, true,  false),
  ('17',    'Etli Taze Fasulye',           'Pilav • Yoğurt',                   250,  'ev-yemekleri', '/brand_assets/menu/etli_taze_fasulye.webp',                   50, 5, true,  false),
  ('18',    'Soslu Fırın Kanat',           'Pilav • Salata',                   275,  'tavuk',        '/brand_assets/menu/soslu_firin_kanat.jpg',                    50, 5, true,  false),
  ('19',    'Soslu Fırın Kalçalı But',     'Pilav • Salata',                   275,  'tavuk',        '/brand_assets/menu/soslu_firin_kalcali_but.jpg',              50, 5, true,  false),
  ('20',    'Fırın Tavuk Pirzola',         '2 Adet • Pilav • Salata',           275,  'tavuk',        '/brand_assets/menu/firin_tavuk_pirzola.jpg',                  50, 5, true,  false),
  ('21',    'Fırın Tavuk Baget But (2 Adet)','Pilav • Salata',                 275,  'tavuk',        '/brand_assets/menu/firin_tavuk_but.jpg',                      50, 5, true,  false),
  ('22',    'Tavuk Sote',                  'Pilav • Çorba',                    250,  'tavuk',        '/brand_assets/menu/tavuk_sote.jpg',                           50, 5, true,  false),
  ('23',    'Etli Bamya',                  'Bulgur Pilavı • Yoğurt',           250,  'ev-yemekleri', '/brand_assets/menu/etli_bamya.avif',                          50, 5, true,  false),
  ('24',    'Tavuklu Nohutlu Pilav',       'Ayran • Turşu',                    250,  'tavuk',        '/brand_assets/menu/tavuklu_nohutlu_pilav.png',                50, 5, true,  false),
  ('tatli', 'Fırın Sütlaç',               'Günlük taze pişirilir',             100,  'corba-tatli',  '/brand_assets/menu/firin_sutlac.jpg',                         50, 5, true,  false)
on conflict do nothing;
