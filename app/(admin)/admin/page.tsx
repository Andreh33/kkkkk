export const dynamic = "force-dynamic";

import { Calendar, MessageSquare, Package, ShoppingBag, TrendingUp } from "lucide-react";

import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

async function getDashboardKPIs() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    monthRevenue,
    pendingOrders,
    todayAppointments,
    weekAppointments,
    lowStockProducts,
    unreadMessages,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { status: "PAID", createdAt: { gte: startOfMonth } },
      _sum: { total: true },
    }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.appointment.count({
      where: {
        startsAt: {
          gte: new Date(now.setHours(0, 0, 0, 0)),
          lt: new Date(now.setHours(23, 59, 59, 999)),
        },
        status: { notIn: ["CANCELLED"] },
      },
    }),
    prisma.appointment.count({
      where: {
        startsAt: { gte: new Date(), lt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        status: { notIn: ["CANCELLED"] },
      },
    }),
    prisma.product.count({ where: { stock: { lte: 5 }, active: true } }),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  return {
    monthRevenue: monthRevenue._sum.total ?? 0,
    pendingOrders,
    todayAppointments,
    weekAppointments,
    lowStockProducts,
    unreadMessages,
  };
}

const KPIS = [
  { key: "monthRevenue", label: "Ingresos este mes", icon: TrendingUp, color: "gold", format: "price" },
  { key: "pendingOrders", label: "Pedidos pendientes", icon: ShoppingBag, color: "warning", format: "number" },
  { key: "todayAppointments", label: "Citas hoy", icon: Calendar, color: "sage", format: "number" },
  { key: "weekAppointments", label: "Citas esta semana", icon: Calendar, color: "sage", format: "number" },
  { key: "lowStockProducts", label: "Productos con stock bajo", icon: Package, color: "danger", format: "number" },
  { key: "unreadMessages", label: "Mensajes sin leer", icon: MessageSquare, color: "warning", format: "number" },
] as const;

export default async function AdminDashboard() {
  const kpis = await getDashboardKPIs();

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--text-strong)] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {KPIS.map((kpi) => {
          const Icon = kpi.icon;
          const value = kpis[kpi.key as keyof typeof kpis];
          const displayValue =
            kpi.format === "price" ? formatPrice(value as number) : String(value);

          return (
            <div
              key={kpi.key}
              className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--text-soft)] mb-1">{kpi.label}</p>
                  <p className="font-display text-3xl text-[var(--text-strong)]">{displayValue}</p>
                </div>
                <div className="p-2.5 bg-[var(--bg-cream)] rounded-lg">
                  <Icon className="h-5 w-5 text-[var(--gold-500)]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas citas */}
        <RecentAppointments />
        {/* Últimos pedidos */}
        <RecentOrders />
      </div>
    </div>
  );
}

async function RecentAppointments() {
  const appointments = await prisma.appointment.findMany({
    where: { startsAt: { gte: new Date() }, status: { notIn: ["CANCELLED"] } },
    include: { user: true, service: true },
    orderBy: { startsAt: "asc" },
    take: 5,
  });

  return (
    <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-5">
      <h2 className="font-semibold text-[var(--text-base)] mb-4">Próximas citas</h2>
      {appointments.length === 0 ? (
        <p className="text-sm text-[var(--text-mute)]">No hay citas próximas.</p>
      ) : (
        <div className="space-y-3">
          {appointments.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-2 border-b border-[var(--line)] last:border-0">
              <div>
                <p className="text-sm font-medium text-[var(--text-base)]">{a.user.name}</p>
                <p className="text-xs text-[var(--text-mute)]">{a.service.name}</p>
              </div>
              <p className="text-xs text-[var(--text-soft)]">
                {new Date(a.startsAt).toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function RecentOrders() {
  const orders = await prisma.order.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-5">
      <h2 className="font-semibold text-[var(--text-base)] mb-4">Últimos pedidos</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-[var(--text-mute)]">No hay pedidos.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between py-2 border-b border-[var(--line)] last:border-0">
              <div>
                <p className="text-sm font-medium text-[var(--text-base)]">{o.user.name}</p>
                <p className="text-xs text-[var(--text-mute)] capitalize">{o.status.toLowerCase()}</p>
              </div>
              <p className="text-sm font-semibold text-[var(--text-strong)]">
                {formatPrice(o.total)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
