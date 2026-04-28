"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart";
import { formatPrice, calcCartTotal } from "@/lib/utils";
import { SHIPPING } from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const subtotal = calcCartTotal(items.map((i) => ({ price: i.price, quantity: i.quantity })));
  const hasPhysical = items.some((i) => i.type === "product");
  const shipping = hasPhysical && subtotal < SHIPPING.free ? SHIPPING.standard : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    router.push("/carrito");
    return null;
  }

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (res.status === 401) {
        const callback = encodeURIComponent("/checkout");
        router.push(`/login?callbackUrl=${callback}`);
        return;
      }

      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        toast.error(data.error ?? "Error al procesar el pago.");
      }
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-cream)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-display text-3xl text-[var(--text-strong)] mb-8">
          Resumen del pedido
        </h1>

        <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-6 mb-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.variant}`} className="flex justify-between py-3 border-b border-[var(--line)] last:border-0">
              <div>
                <p className="font-medium text-[var(--text-base)]">{item.name}</p>
                {item.variant && <p className="text-xs text-[var(--text-mute)]">{item.variant}</p>}
                <p className="text-sm text-[var(--text-soft)]">× {item.quantity}</p>
              </div>
              <span className="font-medium text-[var(--text-strong)]">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <div className="mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-[var(--text-soft)]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {hasPhysical && (
              <div className="flex justify-between text-sm text-[var(--text-soft)]">
                <span>Envío</span>
                <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-[var(--text-strong)] pt-2 border-t border-[var(--line)] mt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <Button onClick={handleCheckout} disabled={loading} className="w-full" size="lg">
          {loading ? "Redirigiendo a Stripe..." : `Pagar ${formatPrice(total)}`}
        </Button>

        <p className="text-xs text-[var(--text-mute)] text-center mt-4">
          Pago seguro procesado por Stripe. No almacenamos los datos de tu tarjeta.
        </p>
      </div>
    </div>
  );
}
