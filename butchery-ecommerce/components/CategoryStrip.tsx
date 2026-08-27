import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/products";

export default function CategoryStrip() {
  return (
    <section className="section-pad py-12">
      <h2 className="brand-heading text-2xl text-smoke sm:text-3xl">Shop by category</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            href={`/products?category=${c.key}`}
            className="card-panel group flex flex-col items-center gap-3 px-4 py-6 text-center transition-transform hover:-translate-y-1"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gold/30">
              <Image src={c.icon} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <span className="text-sm font-semibold text-smoke group-hover:text-gold">
              {c.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
