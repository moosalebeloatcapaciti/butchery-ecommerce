import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      items,
      total,
      customerName,
      customerPhone,
      deliveryOrPickup,
      preferredDatetime,
      notes,
    } = body;

    if (!isSupabaseConfigured) {
      // Supabase isn't set up yet — skip persistence, the WhatsApp handoff
      // on the client still carries the full order.
      return NextResponse.json({ ok: true, persisted: false });
    }

    const { error } = await supabase.from("orders").insert({
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_or_pickup: deliveryOrPickup,
      preferred_datetime: preferredDatetime,
      notes: notes || null,
      items,
      total,
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
