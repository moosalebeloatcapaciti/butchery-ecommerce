# The Butchery — E-Commerce Website

A full, mobile-first e-commerce website for a Cape Town butchery, built with
**Next.js 14 + Tailwind CSS**, **Supabase** (order logging / product data),
and **WhatsApp checkout** — deployable straight to **Vercel**.

This project was generated from, and extends, your original
`BUTCHERY-BUSINESS` resource folder (guides, pricing, WhatsApp template and
business details) — that folder ships inside this zip, unchanged in
structure, so it stays your single source of truth for real photos and
copy going forward.

---

## What's inside

```
├── BUTCHERY-BUSINESS/        ← your original resource folder, unchanged in structure
│   ├── about-business-resources/
│   ├── public/                (beef, pork, processed, spice, logo, menus, icons)
│   ├── website-building-guides/
│   └── website-building-skills/
├── app/                       ← Next.js App Router pages
│   ├── page.tsx                 Home
│   ├── products/page.tsx        Shop / menu with category filters + search
│   ├── product/[slug]/          Product detail pages
│   ├── cart/page.tsx            Cart
│   ├── checkout/page.tsx        Checkout → WhatsApp handoff
│   ├── about/page.tsx           About / location / hours
│   └── api/orders/route.ts      Logs each order to Supabase
├── components/                ← Navbar, Footer, ProductCard, Hero, etc.
├── lib/
│   ├── products.ts              Product catalog (source of truth for the UI)
│   ├── business.ts              Address, WhatsApp numbers, map coordinates
│   ├── cartStore.ts             Client-side cart (Zustand, persisted)
│   ├── whatsapp.ts              Builds the order message from your template
│   └── supabaseClient.ts        Supabase client
├── supabase/
│   ├── schema.sql                Run first — creates `products` + `orders` tables
│   └── seed.sql                  Optional — seeds `products` from lib/products.ts
├── scripts/sync-images.mjs     ← copies real photos from BUTCHERY-BUSINESS/ into public/images
├── public/images/               Web-optimized images the site actually renders (placeholders included)
└── .env.example
```

Every image in `public/images/` is currently a **generated placeholder**
(clearly labelled) because no actual photo files were included in the
uploaded resource bundle — only the folder tree and text guides were. The
site is fully functional right now with placeholders; swapping in real
photos takes one step (see below).

---

## 1. Replace placeholder photos with your real photos

1. Open `BUTCHERY-BUSINESS/` in this project — it has the **exact same
   folder structure and filenames** as your original tree
   (`fresh Beef Burgers (raw patties).jpg`, `biltong.png`, etc.).
2. Drop your real photos into those exact paths, overwriting the
   placeholders.
3. Run:
   ```bash
   node scripts/sync-images.mjs
   ```
   This copies each photo into `public/images/...` under the clean,
   web-safe filename the site's code actually references (e.g.
   `beef-burger-patties.jpg`), so you never have to touch app code.
4. Commit and redeploy.

If you'd rather rename files yourself, `public/images/` uses simple
kebab-case names — just replace them directly there instead.

---

## 2. Local development

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key (step 3)
npm run dev
```

Visit `http://localhost:3000`.

---

## 3. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project, go to **SQL Editor → New query**, paste the contents
   of `supabase/schema.sql`, and run it. This creates:
   - `orders` — every checkout is logged here (name, phone, pickup/delivery,
     items, total) in addition to being sent via WhatsApp.
   - `products` — optional, in case you'd rather manage pricing from
     Supabase than from `lib/products.ts`.
3. (Optional) Run `supabase/seed.sql` to populate `products` with the
   current catalog.
4. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Paste both into `.env.local` (local dev) and into your Vercel project's
   environment variables (production — see step 5).

The site works even without Supabase configured — the WhatsApp checkout
flow doesn't depend on it. Supabase just gives you a persistent record of
every order beyond WhatsApp's own chat history.

---

## 4. Push to GitHub

```bash
cd butchery-ecommerce
git init
git add .
git commit -m "Initial commit: The Butchery e-commerce site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

---

## 5. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub
   repo you just pushed.
2. Vercel auto-detects Next.js — no build settings to change.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. You'll get a live `*.vercel.app` URL; add a custom
   domain afterwards under **Project → Settings → Domains** if you have one.

---

## 6. Update prices, products or business details

- **Prices / products** — edit `lib/products.ts` (or the `products` table
  in Supabase if you seeded it and wire the shop page to read from there
  instead — the schema is ready for that upgrade).
- **Address, WhatsApp numbers, map pin, hours** — edit `lib/business.ts`.
- **WhatsApp order message format** — edit `lib/whatsapp.ts`, which mirrors
  `BUTCHERY-BUSINESS/website-building-guides/automated-whatsapp-order-template.md.txt`.

---

## How checkout works

1. Customer browses `/products`, adds items to their cart (stored in the
   browser via `localStorage`, so it survives refreshes).
2. At `/checkout`, they enter their name, phone, pickup/delivery choice,
   preferred time and any notes.
3. On submit, the order is:
   - logged to Supabase `orders` (if configured), and
   - formatted into a WhatsApp message matching your original template,
     then opened via a `wa.me` deep link to your primary WhatsApp number
     (`lib/business.ts → primaryWhatsapp`).
4. The customer taps **send** in WhatsApp to confirm — no payment gateway
   is wired up yet (the original brief listed PayFast/Yoco/Stripe as
   optional); orders are confirmed and paid for via WhatsApp/in-person for
   now, matching how the original WhatsApp-order template was designed.

---

## Notes on pricing

Beef prices come directly from your supplied 2026 ZAR price guide
(`BUTCHERY-BUSINESS/website-building-guides/price-suggestions.md.txt`).
That guide didn't cover pork, processed products (boerewors, biltong,
polony, etc.) or spice blends specifically, so those were estimated at
reasonable mid-market Cape Town rates — treat them as a starting point and
adjust in `lib/products.ts` to match your actual counter prices.
