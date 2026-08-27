"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatZAR } from "@/lib/business";
import { useCartStore } from "@/lib/cartStore";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold uppercase tracking-wide text-gold">
        {product.categoryLabel}
      </span>
      <h1 className="brand-heading mt-2 text-3xl text-smoke sm:text-4xl">
        {product.name}
      </h1>
      <p className="mt-4 text-smoke/70">{product.description}</p>

      <div className="mt-6 text-2xl font-bold text-gold">
        {formatZAR(product.price)}
        <span className="ml-1 text-sm font-normal text-smoke/50">/{product.unit}</span>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center rounded-full border border-white/10">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center text-smoke hover:text-gold"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-11 w-11 items-center justify-center text-smoke hover:text-gold"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        <span className="text-sm text-smoke/60">
          Subtotal: <strong className="text-smoke">{formatZAR(product.price * qty)}</strong>
        </span>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={() => addItem(product, qty)} className="btn-ember">
          Add to cart
        </button>
        <button
          onClick={() => {
            addItem(product, qty);
            router.push("/cart");
          }}
          className="btn-outline"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
