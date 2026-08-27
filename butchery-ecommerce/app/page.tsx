import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />

      <section className="section-pad py-16">
        <div className="card-panel grid gap-6 overflow-hidden p-6 sm:p-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="brand-heading text-2xl text-gold sm:text-3xl">
              Order in two minutes flat
            </h2>
            <p className="mt-3 max-w-md text-sm text-smoke/70">
              Build your basket, choose pickup or delivery, and send it
              straight to our WhatsApp — we'll confirm your order and have
              it ready.
            </p>
            <Link href="/products" className="btn-ember mt-6">
              Start your order
            </Link>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src="/images/business-past-menus/past-specials-promos3.jpg"
              alt="Past specials and promotions"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <WhatsAppFloatButton />
    </>
  );
}
