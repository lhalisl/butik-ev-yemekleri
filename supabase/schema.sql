-- ═══════════════════════════════════════════════════════
-- Hazal Chef — Butik Ev Yemekleri
-- Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════

-- Enable UUID extension (already enabled by default in Supabase)
create extension if not exists "pgcrypto";

-- ─── PRODUCTS ───────────────────────────────────────────
create table if not exists products (
  id           uuid primary key default gen_random_uuid(),
  menu_number  text not null,          -- 'soup', '1', '2', ... '24', 'tatli'
  name         text not null,
  includes     text,                   -- 'Pilav • Çorba'
  price        numeric(10,2) not null,
  category     text not null,          -- 'et-tandir' | 'tavuk' | 'ev-yemekleri' | 'corba-tatli'
  image_url    text,
  stock        integer not null default 50,
  min_stock    integer not null default 5,
  active       boolean not null default true,
  featured     boolean not null default false,
  created_at   timestamptz not null default now()
);

-- ─── ORDERS ─────────────────────────────────────────────
create table if not exists orders (
  id               uuid primary key default gen_random_uuid(),
  order_number     bigserial,
  customer_name    text not null,
  customer_phone   text not null,
  customer_address text,
  notes            text,
  total            numeric(10,2) not null,
  status           text not null default 'bekliyor',
  delivery_type    text not null default 'delivery',
  created_at       timestamptz not null default now()
);

-- ─── ORDER ITEMS ────────────────────────────────────────
create table if not exists order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders(id) on delete cascade,
  product_id   uuid references products(id) on delete set null,
  quantity     integer not null check (quantity > 0),
  unit_price   numeric(10,2) not null,
  product_name text not null   -- snapshot at time of order
);

-- ─── INDEXES ────────────────────────────────────────────
create index if not exists idx_orders_created_at on orders(created_at desc);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_products_category on products(category);

-- ─── STORED PROCEDURE: decrement_stock ──────────────────
-- Called after each order to reduce stock
create or replace function decrement_stock(product_id uuid, amount integer)
returns void
language plpgsql
as $$
begin
  update products
  set stock = greatest(0, stock - amount)
  where id = product_id;
end;
$$;

-- ─── ROW LEVEL SECURITY ─────────────────────────────────
-- Products: public can read, only service role can write
alter table products enable row level security;
create policy "Public can read active products"
  on products for select
  using (active = true);

-- Orders: public can insert, only service role can read/update
alter table orders enable row level security;
create policy "Public can create orders"
  on orders for insert
  with check (true);

-- Order items: public can insert
alter table order_items enable row level security;
create policy "Public can create order items"
  on order_items for insert
  with check (true);

-- ─── NOTES ──────────────────────────────────────────────
-- The service role key (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS.
-- All admin API routes use createServiceClient() which uses this key.
-- The anon key is only used on the client side to read products.
