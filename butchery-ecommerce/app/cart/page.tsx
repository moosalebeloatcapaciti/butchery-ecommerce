"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { formatZAR } from "@/lib/business";

const DELIVERY_FEE = 60;
const FREE_DELIVERY_THRESHOLD = 1000;

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="section-pad flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="brand-heading text-2xl text-smoke">Your cart is empty</h1>
        <p className="text-sm text-smoke/60">
          Add some fresh cuts from the menu to get started.
        </p>
        <Link href="/products" className="btn-ember">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="section-pad py-10">
      <h1 className="brand-heading text-3xl text-smoke">Your Cart</h1>

      <div className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="card-panel flex items-center gap-4 p-4"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-smoke">{item.name}</h3>
              <p className="text-xs text-smoke/50">
                {formatZAR(item.price)} / {item.unit}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center rounded-full border border-white/10">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center text-smoke hover:text-gold"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center text-smoke hover:text-gold"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-smoke/40 hover:text-ember"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="font-bold text-gold">
              {formatZAR(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="card-panel mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-smoke/60">Order total</p>
          <p className="brand-heading text-2xl text-gold">{formatZAR(totalPrice)}</p>
          <p className="mt-2 text-xs text-smoke/50">
            {totalPrice < FREE_DELIVERY_THRESHOLD 
              ? `Delivery fee (R${DELIVERY_FEE}) will be added if you choose delivery at checkout`
              : "Free delivery available"}
          </p>
        </div>
        <Link href="/checkout" className="btn-ember">
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
