"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/stores/cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@prisma/client";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart() {
    addItem({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      productId: product.id,
      slug: product.slug,
    });
    toast.success(`${product.name} añadido al carrito`);
  }

  const image = product.images[0] ?? null;
  const hasDiscount = product.compareAt && product.compareAt > product.price;

  return (
    <div className="group bg-[var(--bg-white)] rounded-xl border border-[var(--line)] overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link href={`/tienda/${product.slug}`} className="block">
        <div className="relative aspect-square bg-[var(--bg-deep)] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-[var(--text-mute)]" />
            </div>
          )}
          {product.featured && (
            <Badge className="absolute top-3 left-3">Destacado</Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive" className="absolute top-3 right-3">
              Oferta
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-sm font-medium text-[var(--text-soft)]">Agotado</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/tienda/${product.slug}`}>
          <h3 className="font-medium text-[var(--text-base)] mb-1 hover:text-[var(--gold-700)] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        {product.shortDesc && (
          <p className="text-xs text-[var(--text-mute)] mb-3 line-clamp-2">{product.shortDesc}</p>
        )}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-[var(--text-strong)]">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-[var(--text-mute)] line-through">
                {formatPrice(product.compareAt!)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
