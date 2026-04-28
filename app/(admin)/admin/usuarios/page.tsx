export const dynamic = "force-dynamic";

import type { Metadata } from "next";

import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Usuarios — Admin" };

export default async function AdminUsuariosPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true, appointments: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--text-strong)] mb-6">Usuarios</h1>
      <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--line)] bg-[var(--bg-cream)]">
              <tr>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Nombre</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Email</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Rol</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Pedidos</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Citas</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Alta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--bg-cream)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-base)]">{user.name}</td>
                  <td className="px-4 py-3 text-[var(--text-soft)]">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-soft)]">{user._count.orders}</td>
                  <td className="px-4 py-3 text-[var(--text-soft)]">{user._count.appointments}</td>
                  <td className="px-4 py-3 text-[var(--text-soft)]">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
