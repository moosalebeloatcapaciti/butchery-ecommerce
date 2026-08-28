"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import { formatZAR } from "@/lib/business";
import { buildWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";

const DELIVERY_FEE = 60;
const FREE_DELIVERY_THRESHOLD = 1000;

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    deliveryOrPickup: "Pickup" as "Pickup" | "Delivery",
    preferredDatetime: "",
    notes: "",
  });

  const deliveryFee = form.deliveryOrPickup === "Delivery" && totalPrice < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  const finalTotal = totalPrice + deliveryFee;
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);

  if (mounted && items.length === 0) {
    return (
      <div className="section-pad flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="brand-heading text-2xl text-smoke">Nothing to check out yet</h1>
        <Link href="/products" className="btn-ember">
          Browse the menu
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.customerName || !form.customerPhone || !form.preferredDatetime) {
      setError("Please fill in your name, phone number and preferred time.");
      return;
    }

    setSubmitting(true);
    try {
      // Log the order to Supabase (non-blocking for the WhatsApp handoff —
      // if it fails, the customer can still complete the order on WhatsApp).
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total: totalPrice, ...form }),
      }).catch(() => null);

      const message = buildWhatsAppMessage(items, form);
      const link = buildWhatsAppLink(message);
      clearCart();
      window.location.href = link;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="section-pad py-10">
      <h1 className="brand-heading text-3xl text-smoke">Checkout</h1>
      <p className="mt-2 text-sm text-smoke/60">
        We'll open WhatsApp with your order pre-filled — just hit send.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="card-panel flex flex-col gap-4 p-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-smoke/60">
              Full name
            </label>
            <input
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-char-light px-4 py-2.5 text-smoke focus:border-gold focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-smoke/60">
              Phone number
            </label>
            <input
              value={form.customerPhone}
              onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-char-light px-4 py-2.5 text-smoke focus:border-gold focus:outline-none"
              placeholder="e.g. 073 123 4567"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-smoke/60">
              Pickup or delivery
            </label>
            <div className="mt-1 flex gap-2">
              {(["Pickup", "Delivery"] as const).map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setForm({ ...form, deliveryOrPickup: opt })}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    form.deliveryOrPickup === opt
                      ? "bg-ember text-smoke"
                      : "border border-white/10 text-smoke/70"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-smoke/60">
              Preferred date &amp; time
            </label>
            <input
              value={form.preferredDatetime}
              onChange={(e) => setForm({ ...form, preferredDatetime: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-char-light px-4 py-2.5 text-smoke focus:border-gold focus:outline-none"
              placeholder="e.g. Saturday 10:00"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-smoke/60">
              Notes (optional)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="mt-1 w-full rounded-lg border border-white/10 bg-char-light px-4 py-2.5 text-smoke focus:border-gold focus:outline-none"
              placeholder="Anything we should know?"
            />
          </div>

          {error && <p className="text-sm text-ember-light">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-ember mt-2 disabled:opacity-60">
            {submitting ? "Preparing your order…" : "Send order via WhatsApp"}
          </button>
        </form>

        <div className="card-panel h-fit p-6">
          <h2 className="font-semibold text-smoke">Order summary</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-smoke/80">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatZAR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-smoke/80">
              <span>Subtotal</span>
              <span>{formatZAR(totalPrice)}</span>
            </div>
            {form.deliveryOrPickup === "Delivery" && (
              <div className="flex justify-between text-smoke/80">
                <span className="flex items-center gap-1">
                  Delivery fee
                  {totalPrice >= FREE_DELIVERY_THRESHOLD && (
                    <span className="text-xs text-gold">(FREE)</span>
                  )}
                </span>
                <span>{formatZAR(deliveryFee)}</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between border-t border-white/10 pt-4 font-bold text-gold">
            <span>Total</span>
            <span>{formatZAR(finalTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
