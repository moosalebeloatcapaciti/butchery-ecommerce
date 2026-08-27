import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-char-light">
      <div className="section-pad grid gap-10 py-14 md:grid-cols-3">
        <div>
          <h3 className="brand-heading text-xl text-gold">{BUSINESS.name}</h3>
          <p className="mt-2 max-w-xs text-sm text-smoke/70">{BUSINESS.tagline}</p>
          <div className="mt-4 flex gap-2 text-xs uppercase tracking-wide text-ash">
            <span>Beef</span>·<span>Pork</span>·<span>Boerewors</span>·<span>Biltong</span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-smoke/80">
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
            <a
              href={BUSINESS.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              {BUSINESS.address}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="shrink-0 text-gold" />
            <a href={`https://wa.me/${BUSINESS.primaryWhatsapp}`} className="hover:text-gold">
              {BUSINESS.whatsappNumbers.join(" / ")}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} className="shrink-0 text-gold" />
            Mon–Sat 07:00–18:00, Sun 08:00–14:00
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Business location map"
            src={BUSINESS.mapEmbedUrl}
            width="100%"
            height="180"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="section-pad flex flex-col gap-2 border-t border-white/5 py-5 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        <p>
          <Link href="/about" className="hover:text-gold">
            About the business
          </Link>
        </p>
      </div>
    </footer>
  );
}
