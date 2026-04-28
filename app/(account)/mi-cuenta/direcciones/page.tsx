export const dynamic = "force-dynamic";

import { MapPin, Plus } from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function DireccionesPage() {
  const session = await auth();
  const addresses = await prisma.address.findMany({
    where: { userId: session!.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-[var(--text-strong)]">Mis direcciones</h1>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Añadir dirección
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-8 text-center">
          <MapPin className="h-10 w-10 text-[var(--text-mute)] mx-auto mb-3" />
          <p className="text-[var(--text-soft)]">No tienes direcciones guardadas.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-[var(--text-base)]">{addr.fullName}</p>
                  {addr.isDefault && <Badge variant="sage">Predeterminada</Badge>}
                </div>
                <p className="text-sm text-[var(--text-soft)]">{addr.street}</p>
                <p className="text-sm text-[var(--text-soft)]">
                  {addr.postalCode} {addr.city}, {addr.province}
                </p>
                <p className="text-sm text-[var(--text-soft)]">{addr.phone}</p>
              </div>
              <Button variant="ghost" size="sm">Editar</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
