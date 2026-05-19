# Hazal Chef — Next.js Sipariş Sistemi Kurulumu

## 1. Supabase Projesi Oluştur

1. [supabase.com](https://supabase.com) adresine gidin ve ücretsiz hesap açın
2. **New Project** → İstediğiniz bir isim verin (ör: `hazal-chef`)
3. Proje oluştuktan sonra sol menüden **Settings → API** sayfasına gidin
4. Şu değerleri kopyalayın:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

## 2. .env.local Dosyası

Proje klasöründe `.env.local` dosyası oluşturun:

```bash
cp .env.local.example .env.local
```

Ardından `.env.local` dosyasını açıp Supabase değerlerini girin.

## 3. Veritabanı Tablolarını Oluştur

Supabase Dashboard → **SQL Editor → New Query** sayfasına gidin.

Önce şemayı çalıştırın:
```sql
-- supabase/schema.sql dosyasının içeriğini buraya yapıştırın
```

Ardından ürünleri ekleyin:
```sql
-- supabase/seed.sql dosyasının içeriğini buraya yapıştırın
```

## 4. Projeyi Başlatın

```bash
npm install
npm run dev
```

Tarayıcıda açın: http://localhost:3000

## 5. Admin Paneline Giriş

- Adres: http://localhost:3000/admin
- Şifre: `.env.local` dosyasındaki `ADMIN_PASSWORD` değeri (varsayılan: `hazalchef2024`)

---

## Sayfalar

| Sayfa | URL |
|---|---|
| Ana Sayfa | `/` |
| Menü (sipariş) | `/menu` |
| Sepet & Ödeme | `/checkout` |
| Sipariş Onayı | `/siparis/[id]` |
| Admin — Siparişler | `/admin/siparisler` |
| Admin — Ürünler & Stok | `/admin/urunler` |

## Özellikler

- ✅ Tüm menü ürünleri (26 adet) gerçek fotoğraflarla
- ✅ Sepet sistemi (localStorage kalıcı)
- ✅ Kategori filtresi
- ✅ Online sipariş formu (Eve teslimat / Gel-Al / Restoranda)
- ✅ Sipariş takip sayfası
- ✅ Admin paneli — sipariş durumu güncelleme
- ✅ Admin paneli — stok yönetimi (+ / - butonları)
- ✅ Düşük stok / tükenme uyarıları
- ✅ Şifre korumalı admin girişi
