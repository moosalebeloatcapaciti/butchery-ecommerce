"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { BUSINESS } from "@/lib/business";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-char/90 backdrop-blur">
      <div className="section-pad flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gold/40">
            <Image
              src="/images/business-logo/official-business-logo.jpg"
              alt={`${BUSINESS.name} logo`}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <span className="brand-heading text-lg text-smoke">{BUSINESS.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold uppercase tracking-wide text-smoke/80 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            aria-label="View cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-smoke transition-colors hover:border-gold hover:text-gold"
          >
            <ShoppingCart size={19} />
            {mounted && totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1 text-[11px] font-bold text-smoke">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-smoke md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/5 bg-char px-5 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide text-smoke/85 hover:bg-white/5 hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
