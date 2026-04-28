"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/stores/cart";
import { formatPrice, calcCartTotal } from "@/lib/utils";
import { SHIPPING } from "@/lib/constants";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = calcCartTotal(items.map((i) => ({ price: i.price, quantity: i.quantity })));
  const hasPhysical = items.some((i) => i.type === "product");
  const shipping = hasPhysical && subtotal < SHIPPING.free ? SHIPPING.standard : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--bg-cream)]">
        <ShoppingBag className="h-16 w-16 text-[var(--text-mute)] mb-6" />
        <h1 className="font-display text-3xl text-[var(--text-strong)] mb-3">
          Tu carrito está vacío
        </h1>
        <p className="text-[var(--text-soft)] mb-8 text-center">
          Descubre nuestros productos y servicios.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/tienda">Ver tienda</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/servicios/masajes">Ver masajes</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-cream)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display text-3xl text-[var(--text-strong)] mb-10">
          Tu carrito ({items.length} {items.length === 1 ? "producto" : "productos"})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.variant}`}
                className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-4 flex gap-4"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[var(--bg-deep)] flex-shrink-0">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-[var(--text-mute)]" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text-base)] truncate">{item.name}</p>
                  {item.variant && (
                    <p className="text-xs text-[var(--text-mute)] mt-0.5">{item.variant}</p>
                  )}
                  <p className="text-sm text-[var(--text-soft)] mt-0.5 capitalize">{item.type === "service" ? "Servicio" : "Producto"}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Reducir cantidad"
                        className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center hover:border-[var(--gold-500)] transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                        className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center hover:border-[var(--gold-500)] transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-[var(--text-strong)]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                        className="p-1.5 text-[var(--text-mute)] hover:text-[var(--danger)] transition-colors rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-6 sticky top-24">
              <h2 className="font-display text-xl text-[var(--text-strong)] mb-5">
                Resumen del pedido
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[var(--text-soft)]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {hasPhysical && (
                  <div className="flex justify-between text-[var(--text-soft)]">
                    <span>Envío</span>
                    <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
                  </div>
                )}
                {hasPhysical && subtotal < SHIPPING.free && (
                  <p className="text-xs text-[var(--text-mute)]">
                    Añade {formatPrice(SHIPPING.free - subtotal)} más para envío gratis.
                  </p>
                )}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold text-[var(--text-strong)] mb-6">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Tramitar pedido</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full mt-3" size="sm">
                <Link href="/tienda">Seguir comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
