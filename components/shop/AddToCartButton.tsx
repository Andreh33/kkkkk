"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart";
import type { Product } from "@prisma/client";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
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

  return (
    <Button
      onClick={handleAdd}
      disabled={product.stock === 0}
      size="lg"
      className="w-full sm:w-auto gap-2"
    >
      <ShoppingBag className="h-5 w-5" />
      {product.stock === 0 ? "Agotado" : "Añadir al carrito"}
    </Button>
  );
}
