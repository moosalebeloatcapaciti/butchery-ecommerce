-- Run this in the Supabase SQL editor (Project → SQL Editor → New query)
-- after creating your Supabase project. This sets up two tables:
--   products  — optional, if you want to manage the catalog from Supabase
--               instead of (or in addition to) lib/products.ts
--   orders    — every checkout submitted through the website is logged
--               here in addition to being sent via WhatsApp.

create extension if not exists "pgcrypto";

-- ========== PRODUCTS ==========
create table if not exists products (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  category_label text not null,
  description text,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  unit text not null,
  image text,
  featured boolean default false,
  created_at timestamptz default now()
);

alter table products enable row level security;

create policy "Public can read products"
  on products for select
  using (true);

-- ========== ORDERS ==========
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  delivery_or_pickup text not null,
  preferred_datetime text,
  notes text,
  items jsonb not null,
  total numeric(10, 2) not null,
  status text default 'pending', -- pending | confirmed | fulfilled | cancelled
  created_at timestamptz default now()
);

alter table orders enable row level security;

-- Anyone (using the public anon key) can create an order — this is what
-- lets the checkout page log orders without requiring a customer login.
create policy "Anyone can insert an order"
  on orders for insert
  with check (true);

-- Reading orders back should be restricted to authenticated staff.
-- Once you set up Supabase Auth for your admin dashboard, tighten this to:
--   using (auth.role() = 'authenticated')
create policy "Authenticated staff can read orders"
  on orders for select
  using (auth.role() = 'authenticated');

create index if not exists orders_created_at_idx on orders (created_at desc);
