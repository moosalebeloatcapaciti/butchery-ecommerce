"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatZAR } from "@/lib/business";
import { useCartStore } from "@/lib/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="card-panel group flex flex-col overflow-hidden">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-char/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold">
          {product.categoryLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold leading-snug text-smoke hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-xs text-smoke/60">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold text-gold">
            {formatZAR(product.price)}
            <span className="ml-1 text-xs font-normal text-smoke/50">/{product.unit}</span>
          </span>
          <button
            onClick={() => addItem(product, 1)}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ember text-smoke transition-colors hover:bg-ember-light active:scale-95"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
