import type { CartItem } from "./cartStore";
import { BUSINESS, formatZAR } from "./business";

export type OrderDetails = {
  customerName: string;
  customerPhone: string;
  deliveryOrPickup: "Delivery" | "Pickup";
  preferredDatetime: string;
  notes?: string;
};

const DELIVERY_FEE = 60;
const FREE_DELIVERY_THRESHOLD = 1000;

// Mirrors the structure of automated-whatsapp-order-template.md.txt
export function buildWhatsAppMessage(
  items: CartItem[],
  order: OrderDetails
) {
  const lines: string[] = [];
  lines.push(`Hello ${BUSINESS.name} 🥩🔥`);
  lines.push("");
  lines.push("I'd like to place an order:");
  lines.push("");
  lines.push(`[Customer Name]: ${order.customerName}`);
  lines.push(`[Phone Number]: ${order.customerPhone}`);
  lines.push(`[Delivery / Pickup]: ${order.deliveryOrPickup}`);
  lines.push(`[Preferred Date & Time]: ${order.preferredDatetime}`);
  lines.push("");
  lines.push("🛒 My Order:");
  let total = 0;
  for (const item of items) {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    lines.push(
      `- ${item.name} (${item.quantity} x ${formatZAR(item.price)}/${item.unit}) = ${formatZAR(itemTotal)}`
    );
  }
  lines.push("");
  lines.push(`Subtotal: ${formatZAR(total)}`);
  
  const deliveryFee = order.deliveryOrPickup === "Delivery" && total < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  if (order.deliveryOrPickup === "Delivery") {
    if (deliveryFee > 0) {
      lines.push(`Delivery fee: ${formatZAR(deliveryFee)}`);
      lines.push(`💰 Total: ${formatZAR(total + deliveryFee)}`);
    } else {
      lines.push(`Delivery fee: FREE (Order above R${FREE_DELIVERY_THRESHOLD})`);
      lines.push(`💰 Total: ${formatZAR(total)}`);
    }
  } else {
    lines.push(`💰 Total: ${formatZAR(total)}`);
  }
  lines.push("");
  lines.push(`Notes: ${order.notes || "-"}`);
  lines.push("");
  lines.push("Please confirm my order. Thank you! 🙌");
  return lines.join("\n");
}

export function buildWhatsAppLink(message: string, phone = BUSINESS.primaryWhatsapp) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
