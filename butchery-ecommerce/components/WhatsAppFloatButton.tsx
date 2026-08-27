"use client";

import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function WhatsAppFloatButton() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.primaryWhatsapp}?text=${encodeURIComponent(
        `Hi ${BUSINESS.name}! I have a question about your products.`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
