"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { formatZAR } from "@/lib/business";
import { getDigitalAmounts, type StoreOption } from "@/lib/storefront";

type DigitalOrderFormProps = {
  category: "airtime" | "voucher";
  title: string;
  description: string;
  options: StoreOption[];
};

const AMOUNTS = getDigitalAmounts();

export default function DigitalOrderForm({
  category,
  title,
  description,
  options,
}: DigitalOrderFormProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const option = options.find((item) => item.id === selectedOption);
  const amount = AMOUNTS.find((item) => String(item.value) === selectedAmount);

  function addToCart() {
    if (!option || !amount) return;

    const feeLabel = amount.fee ? ` + ${formatZAR(amount.fee)} service charge` : "";
    addItem({
      id: `${category}-${option.id}-${amount.value}`,
      name: `${option.name} ${category === "airtime" ? "Airtime" : "Voucher"} - ${formatZAR(amount.value)}${feeLabel}`,
      price: amount.total,
      unit: "top-up",
      image: option.image,
      orderType: category,
    });
    setAdded(true);
  }

  return (
    <div className="section-pad py-10">
      <h1 className="brand-heading text-3xl text-smoke sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-smoke/60">{description}</p>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-smoke/80">
          1. Choose {category === "airtime" ? "your provider" : "your voucher"}
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {options.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedOption(item.id);
                setAdded(false);
              }}
              aria-pressed={selectedOption === item.id}
              className={`card-panel flex flex-col items-center gap-3 p-4 text-center transition-colors ${
                selectedOption === item.id ? "border-gold" : "hover:border-gold/50"
              }`}
            >
              <span className="relative h-20 w-full">
                <Image src={item.image} alt="" fill sizes="160px" className="object-contain" />
              </span>
              <span className="text-sm font-semibold text-smoke">{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 max-w-xl">
        <label
          htmlFor={`${category}-amount`}
          className="text-sm font-semibold uppercase tracking-wide text-smoke/80"
        >
          2. Choose amount
        </label>
        <select
          id={`${category}-amount`}
          value={selectedAmount}
          onChange={(event) => {
            setSelectedAmount(event.target.value);
            setAdded(false);
          }}
          disabled={!option}
          className="mt-3 w-full rounded-xl border border-white/10 bg-char-light px-4 py-3 text-smoke focus:border-gold focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select an amount</option>
          {AMOUNTS.map((item) => (
            <option key={item.value} value={item.value}>
              {formatZAR(item.value)}
              {item.fee
                ? ` ${category} + ${formatZAR(item.fee)} service charge`
                : ""}
              {" — total "}
              {formatZAR(item.total)}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-smoke/50">
          Available values: R5, R10, R11, R12, R20, then R25 to R500 in R5 steps.
          A R1 service charge applies to R5 and values from R25 upward.
        </p>
        {amount && (
          <p className="mt-4 text-sm text-smoke">
            Total: <strong className="text-gold">{formatZAR(amount.total)}</strong>
            {amount.fee > 0 && (
              <span className="text-smoke/60">
                {" "}({formatZAR(amount.value)} value + {formatZAR(amount.fee)} service charge)
              </span>
            )}
          </p>
        )}
        <button
          type="button"
          onClick={addToCart}
          disabled={!option || !amount}
          className="btn-ember mt-5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to cart
        </button>
        {added && (
          <p role="status" className="mt-3 text-sm text-gold">
            Added to your cart.
          </p>
        )}
      </section>
    </div>
  );
}
