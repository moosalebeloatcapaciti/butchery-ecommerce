import Link from "next/link";
import Image from "next/image";

const STORE_CATEGORIES = [
  {
    href: "/products",
    label: "Products",
    description: "Browse fresh meat, butcher's cuts and pantry favourites.",
    icon: "/images/web-icons/beef-icon.jpg",
  },
  {
    href: "/services",
    label: "Services",
    description: "Pay for Electricity or Water.",
    icon: "/images/web-icons/electricity-icon.jpg",
  },
  {
    href: "/airtime",
    label: "Airtime",
    description: "Top up with your preferred mobile network.",
    icon: "/images/web-icons/airtime-icon.jpg",
  },
  {
    href: "/voucher",
    label: "Voucher",
    description: "Choose a voucher and a fixed available amount.",
    icon: "/images/web-icons/voucher-icon.jpg",
  },
];

export default function CategoryStrip() {
  return (
    <section className="section-pad py-12">
      <h2 className="brand-heading text-2xl text-smoke sm:text-3xl">Explore our storefront</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STORE_CATEGORIES.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="card-panel group flex flex-col items-center gap-3 px-4 py-6 text-center transition-transform hover:-translate-y-1"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gold/30">
              <Image src={category.icon} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <span className="text-sm font-semibold text-smoke group-hover:text-gold">
              {category.label}
            </span>
            <span className="text-xs text-smoke/60">{category.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
