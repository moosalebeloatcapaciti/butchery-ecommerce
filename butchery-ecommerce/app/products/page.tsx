"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="section-pad py-10">
      <h1 className="brand-heading text-3xl text-smoke sm:text-4xl">The Menu</h1>
      <p className="mt-2 text-sm text-smoke/60">
        Priced per {`{unit}`} unless noted. Add items to your cart, then
        confirm your order on WhatsApp.
      </p>

      <div className="sticky top-16 z-30 -mx-5 mt-6 flex flex-col gap-3 bg-char/95 px-5 py-3 backdrop-blur sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:border sm:border-white/5">
        <input
          type="search"
          placeholder="Search the menu…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-white/10 bg-char-light px-4 py-2 text-sm text-smoke placeholder:text-smoke/40 focus:border-gold focus:outline-none sm:w-64"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
              category === "all"
                ? "bg-ember text-smoke"
                : "border border-white/10 text-smoke/70 hover:border-gold hover:text-gold"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                category === c.key
                  ? "bg-ember text-smoke"
                  : "border border-white/10 text-smoke/70 hover:border-gold hover:text-gold"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-smoke/60">
          Nothing matches that search. Try another cut or clear your filters.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <WhatsAppFloatButton />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="section-pad py-10">Loading menu…</div>}>
      <ProductsContent />
    </Suspense>
  );
}
