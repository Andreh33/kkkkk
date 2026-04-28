export const dynamic = "force-dynamic";

import type { Metadata } from "next";

import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Servicios — Admin" };

const CATEGORY_LABELS: Record<string, string> = {
  MASAJE: "Masaje",
  MEDICINA_ESTETICA: "Medicina Estética",
  TRATAMIENTO_FACIAL: "Facial",
  TRATAMIENTO_CORPORAL: "Corporal",
};

export default async function AdminServiciosPage() {
  const services = await prisma.service.findMany({ orderBy: { category: "asc" } });

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--text-strong)] mb-6">Servicios</h1>
      <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--line)] bg-[var(--bg-cream)]">
              <tr>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Nombre</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Categoría</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Precio</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Duración</th>
                <th className="text-left px-4 py-3 text-[var(--text-soft)] font-medium">Reservable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-[var(--bg-cream)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-base)]">{s.name}</td>
                  <td className="px-4 py-3 text-[var(--text-soft)]">{CATEGORY_LABELS[s.category] ?? s.category}</td>
                  <td className="px-4 py-3 text-[var(--text-strong)] font-semibold">{formatPrice(s.priceMin)}</td>
                  <td className="px-4 py-3 text-[var(--text-soft)]">{s.durationMin} min</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.bookable ? "sage" : "secondary"}>
                      {s.bookable ? "Sí" : "No"}
                    </Badge>
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
