export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";

import { OrderStatusForm } from "@/components/admin/OrderStatusForm";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { formatDate, formatDateTime, formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

const STATUS_VARIANT: Record<string, "default" | "success" | "destructive" | "warning" | "secondary"> = {
  PENDING: "warning",
  PAID: "success",
  FAILED: "destructive",
  REFUNDED: "secondary",
  CANCELLED: "destructive",
};

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { user: true, items: { include: { product: true, service: true } } },
  });
  if (!order) notFound();

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/pedidos" className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-700)]">
          ← Volver al listado
        </Link>
        <div className="flex items-center justify-between mt-2 gap-4 flex-wrap">
          <h1 className="font-display text-3xl text-[var(--text-strong)]">
            Pedido #{order.id.slice(-8)}
          </h1>
          <Badge variant={STATUS_VARIANT[order.status] ?? "secondary"}>{order.status}</Badge>
        </div>
        <p className="text-sm text-[var(--text-mute)] mt-1">{formatDateTime(order.createdAt)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
            <h2 className="font-medium text-[var(--text-strong)] mb-4">Artículos</h2>
            <div className="divide-y divide-[var(--line)]">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-[var(--text-base)]">{item.name}</p>
                    {item.variant && (
                      <p className="text-xs text-[var(--text-mute)]">{item.variant}</p>
                    )}
                    <p className="text-xs text-[var(--text-mute)] mt-1">
                      {item.serviceId ? "Servicio" : "Producto"} · {item.quantity} × {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <p className="font-semibold text-[var(--text-strong)] whitespace-nowrap">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--line)] mt-4 pt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-soft)]">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-soft)]">Envío</span>
                <span>{formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-[var(--line)] mt-2">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {order.shippingAddress && (
            <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
              <h2 className="font-medium text-[var(--text-strong)] mb-3">Dirección de envío</h2>
              <pre className="text-xs text-[var(--text-soft)] whitespace-pre-wrap font-body">
                {JSON.stringify(order.shippingAddress, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
            <h2 className="font-medium text-[var(--text-strong)] mb-3">Cliente</h2>
            <p className="font-medium">{order.user.name}</p>
            <a href={`mailto:${order.user.email}`} className="text-sm text-[var(--gold-700)] hover:underline">
              {order.user.email}
            </a>
            {order.user.phone && (
              <p className="text-sm text-[var(--text-soft)] mt-1">{order.user.phone}</p>
            )}
          </div>

          <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
            <h2 className="font-medium text-[var(--text-strong)] mb-3">Estado</h2>
            <OrderStatusForm id={order.id} status={order.status} />
            {order.stripePaymentId && (
              <p className="text-xs text-[var(--text-mute)] mt-3 break-all">
                Stripe PI: <span className="font-mono">{order.stripePaymentId}</span>
              </p>
            )}
            <p className="text-xs text-[var(--text-mute)] mt-1">
              Última actualización: {formatDate(order.updatedAt)}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
