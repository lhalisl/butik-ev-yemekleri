-- ═══════════════════════════════════════════════════════
-- Hazal Chef — Migration: payment + order source
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- Safe to run multiple times (idempotent).
-- ═══════════════════════════════════════════════════════

-- How the customer pays:
--   'online'      → paid online by card (iyzico)
--   'nakit'       → cash on delivery / at door
--   'kapida_kart' → card at the door (POS device)
alter table orders
  add column if not exists payment_method text not null default 'nakit';

-- Lifecycle of that payment:
--   'pending' → not yet collected (cash/door, or online not completed)
--   'paid'    → money received (online success, or staff marked collected)
--   'failed'  → online attempt failed
--   'refunded'→ refunded after the fact
alter table orders
  add column if not exists payment_status text not null default 'pending';

-- Where the order came from, so the panel can distinguish channels:
--   'web' → customer placed it on the online store
--   'pos' → staff entered it in the operations panel (phone / walk-in)
alter table orders
  add column if not exists source text not null default 'web';

-- Optional gateway reference (iyzico paymentId / conversationId), filled on success.
alter table orders
  add column if not exists payment_ref text;

-- Operational channel as the panel sees it (preserves the POS channel choice):
--   'phone' | 'walkin' | 'delivery' | 'table'
-- Web orders leave this null and the panel derives it from delivery_type
-- (delivery→delivery, pickup→walkin, dine-in→table).
alter table orders
  add column if not exists channel text;

create index if not exists idx_orders_payment_status on orders(payment_status);
