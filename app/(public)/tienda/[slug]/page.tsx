export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  return prisma.product.findUnique({ where: { slug, active: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.shortDesc ?? product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const hasDiscount = product.compareAt && product.compareAt > product.price;

  return (
    <div className="pt-20 bg-[var(--bg-white)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imágenes */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-deep)]">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="h-24 w-24 text-[var(--text-mute)]" />
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-deep)]">
                    <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-[var(--text-mute)] uppercase tracking-widest mb-2">
              {product.category ?? "Cosmética"}
            </p>
            <h1 className="font-display text-display-md text-[var(--text-strong)] mb-4">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl text-[var(--gold-700)] font-semibold">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-[var(--text-mute)] line-through">
                  {formatPrice(product.compareAt!)}
                </span>
              )}
            </div>
            {product.shortDesc && (
              <p className="text-body text-[var(--text-soft)] mb-6">{product.shortDesc}</p>
            )}
            <div className="space-y-3 mb-8">
              <AddToCartButton product={product} />
            </div>
            <p className="text-xs text-[var(--text-mute)]">
              {product.stock > 0 ? `En stock (${product.stock} disponibles)` : "Agotado"}
            </p>
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-16 border-t border-[var(--line)] pt-12">
          <h2 className="font-display text-2xl text-[var(--text-strong)] mb-6">Descripción</h2>
          <p className="text-body text-[var(--text-soft)] whitespace-pre-line leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
