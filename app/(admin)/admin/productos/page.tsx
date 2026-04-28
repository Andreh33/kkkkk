export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Productos — Admin" };

export default async function AdminProductosPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-[var(--text-strong)]">Productos</h1>
        <Button asChild size="sm">
          <Link href="/admin/productos/nuevo">Nuevo producto</Link>
        </Button>
      </div>
      <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--line)] bg-[var(--bg-cream)]">
              <tr>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Nombre</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Precio</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Stock</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--bg-cream)] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/productos/${p.id}`} className="font-medium text-[var(--text-base)] hover:text-[var(--gold-700)] transition-colors">
                      {p.name}
                    </Link>
                    {p.featured && <span className="ml-2 text-xs text-[var(--gold-500)]">★ Destacado</span>}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-strong)] font-semibold">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={p.stock <= 5 ? "text-[var(--danger)] font-medium" : "text-[var(--text-soft)]"}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={p.active ? "success" : "secondary"}>
                      {p.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[var(--text-mute)]">
                    No hay productos. Crea el primero.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
