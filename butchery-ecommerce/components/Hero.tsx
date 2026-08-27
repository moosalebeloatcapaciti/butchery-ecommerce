"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-coal-grain">
      <div className="section-pad grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
            <Flame size={14} /> Ravensmead's own since day one
          </span>
          <h1 className="brand-heading mt-5 text-4xl leading-[1.05] text-smoke sm:text-5xl lg:text-6xl">
            Fresh cuts.
            <br />
            <span className="text-ember">Bold flavour.</span>
            <br />
            No shortcuts.
          </h1>
          <p className="mt-5 max-w-md text-smoke/70">
            {BUSINESS.tagline} Order your beef, pork, boerewors and biltong
            online, then confirm it straight through WhatsApp — no app,
            no fuss.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn-ember">
              Shop the menu
            </Link>
            <Link href="/products?category=combo" className="btn-outline">
              See combo deals
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10"
        >
          <Image
            src="/images/about-business-resources/promotional-campaign-profile-opening-picture.jpg"
            alt={`${BUSINESS.name} storefront`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-char/70 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
