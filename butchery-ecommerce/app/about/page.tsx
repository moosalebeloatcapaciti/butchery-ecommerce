import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

export default function AboutPage() {
  return (
    <div className="section-pad py-10">
      <h1 className="brand-heading text-3xl text-smoke sm:text-4xl">About {BUSINESS.name}</h1>
      <p className="mt-3 max-w-2xl text-smoke/70">
        {BUSINESS.tagline} We're a proud, family-run butchery in Ravensmead,
        Cape Town, serving fresh beef and pork cuts, in-house boerewors,
        biltong and our own signature spice blends — cut fresh, priced
        fairly, and delivered to your door or ready for pickup.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/images/about-business-resources/business-advertisement-pamphlet.jpg"
            alt="Business advertisement pamphlet"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/images/about-business-resources/promotional-campaign-profile-opening-picture.jpg"
            alt="Grand opening promotional picture"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="card-panel mt-10 grid gap-6 p-6 sm:grid-cols-2">
        <div className="space-y-4 text-sm text-smoke/80">
          <p className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
            <a href={BUSINESS.mapLinkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              {BUSINESS.address}
            </a>
          </p>
          <p className="flex items-center gap-3">
            <Phone size={18} className="shrink-0 text-gold" />
            {BUSINESS.whatsappNumbers.join(" / ")}
          </p>
          <p className="flex items-center gap-3">
            <Clock size={18} className="shrink-0 text-gold" />
            Mon–Sat 07:00–18:00, Sun 08:00–14:00
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Business location map"
            src={BUSINESS.mapEmbedUrl}
            width="100%"
            height="220"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="brand-heading text-2xl text-gold">Past specials</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={`/images/business-past-menus/past-specials-promos${n}.jpg`}
                alt={`Past special or promo ${n}`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <WhatsAppFloatButton />
    </div>
  );
}
