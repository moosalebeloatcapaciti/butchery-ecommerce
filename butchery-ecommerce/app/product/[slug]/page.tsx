import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="section-pad py-10">
      <Link href="/products" className="text-sm text-gold hover:underline">
        ← Back to menu
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-contain p-4"
            priority
          />
        </div>

        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}
