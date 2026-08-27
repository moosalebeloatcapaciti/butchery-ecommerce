import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter((p) => p.featured);
  return (
    <section className="section-pad py-4">
      <div className="flex items-end justify-between">
        <h2 className="brand-heading text-2xl text-smoke sm:text-3xl">Braai favourites</h2>
        <a href="/products" className="text-sm font-semibold text-gold hover:underline">
          View all →
        </a>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
