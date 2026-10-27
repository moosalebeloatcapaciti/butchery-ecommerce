"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useCartStore } from "@/lib/cartStore";
import { formatZAR } from "@/lib/business";
import { SERVICES } from "@/lib/storefront";

export default function ServiceOrderForm() {
  const [selectedService, setSelectedService] = useState("");
  const [amount, setAmount] = useState("");
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const service = SERVICES.find((item) => item.id === selectedService);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const paymentAmount = Number(amount);
    if (!service || !Number.isFinite(paymentAmount) || paymentAmount < 1) return;

    const roundedAmount = Math.round(paymentAmount * 100) / 100;
    addItem({
      id: `service-${service.id}-${roundedAmount.toFixed(2)}`,
      name: `${service.name} payment - ${formatZAR(roundedAmount)}`,
      price: roundedAmount,
      unit: "payment",
      image: service.image,
      orderType: "service",
    });
    setAdded(true);
  }

  return (
    <div className="section-pad py-10">
      <h1 className="brand-heading text-3xl text-smoke sm:text-4xl">Services</h1>
      <p className="mt-2 max-w-2xl text-sm text-smoke/60">
        Choose Electricity or Water, then enter the amount you want to pay.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-3xl">
        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-wide text-smoke/80">
            1. Choose a service
          </legend>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {SERVICES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedService(item.id);
                  setAdded(false);
                }}
                aria-pressed={selectedService === item.id}
                className={`card-panel flex flex-col items-center gap-3 p-5 transition-colors ${
                  selectedService === item.id ? "border-gold" : "hover:border-gold/50"
                }`}
              >
                <span className="relative h-28 w-full">
                  <Image src={item.image} alt="" fill sizes="300px" className="object-contain" />
                </span>
                <span className="font-semibold text-smoke">{item.name}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <label
            htmlFor="service-amount"
            className="text-sm font-semibold uppercase tracking-wide text-smoke/80"
          >
            2. Amount to pay (R)
          </label>
          <input
            id="service-amount"
            type="number"
            min="1"
            step="0.01"
            required
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setAdded(false);
            }}
            disabled={!service}
            placeholder="Enter payment amount"
            className="mt-3 w-full max-w-sm rounded-xl border border-white/10 bg-char-light px-4 py-3 text-smoke placeholder:text-smoke/40 focus:border-gold focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={!service || !amount}
          className="btn-ember mt-5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add service payment to cart
        </button>
        {added && (
          <p role="status" className="mt-3 text-sm text-gold">
            {service?.name} payment of{" "}
            {formatZAR(Math.round(Number(amount) * 100) / 100)} added to your cart.
          </p>
        )}
      </form>
    </div>
  );
}
