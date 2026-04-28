export const dynamic = "force-dynamic";

import Link from "next/link";
import { Package } from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/utils";

const STATUS_LABELS: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "secondary" }> = {
  PENDING: { label: "Pendiente", variant: "warning" },
  PAID: { label: "Pagado", variant: "success" },
  FAILED: { label: "Fallido", variant: "destructive" },
  REFUNDED: { label: "Reembolsado", variant: "secondary" },
  CANCELLED: { label: "Cancelado", variant: "destructive" },
};

export default async function PedidosPage() {
  const session = await auth();
  const orders = await prisma.order.findMany({
    where: { userId: session!.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl text-[var(--text-strong)]">Mis pedidos</h1>
      {orders.length === 0 ? (
        <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-8 text-center">
          <Package className="h-10 w-10 text-[var(--text-mute)] mx-auto mb-3" />
          <p className="text-[var(--text-soft)] mb-4">Aún no has realizado ningún pedido.</p>
          <Button asChild>
            <Link href="/tienda">Ver tienda</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_LABELS[order.status] ?? { label: order.status, variant: "secondary" as const };
            return (
              <div key={order.id} className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-[var(--text-mute)] font-mono mb-1">#{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-[var(--text-soft)]">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <span className="font-semibold text-[var(--text-strong)]">{formatPrice(order.total)}</span>
                  </div>
                </div>
                <div className="border-t border-[var(--line)] pt-3">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-sm text-[var(--text-soft)]">
                      {item.quantity}× {item.name}{item.variant ? ` (${item.variant})` : ""}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
