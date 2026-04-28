export const dynamic = "force-dynamic";

import type { Metadata } from "next";

import { prisma } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Pedidos — Admin" };

const STATUS_VARIANT: Record<string, "default" | "success" | "destructive" | "warning" | "secondary"> = {
  PENDING: "warning",
  PAID: "success",
  FAILED: "destructive",
  REFUNDED: "secondary",
  CANCELLED: "destructive",
};

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--text-strong)] mb-6">Pedidos</h1>
      <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--line)] bg-[var(--bg-cream)]">
              <tr>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">ID</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Cliente</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Total</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Estado</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--bg-cream)] transition-colors">
                  <td className="px-4 py-3 text-[var(--text-mute)] font-mono text-xs">
                    {order.id.slice(-8)}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-base)]">{order.user.name}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-strong)]">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANT[order.status] ?? "secondary"}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-soft)]">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
