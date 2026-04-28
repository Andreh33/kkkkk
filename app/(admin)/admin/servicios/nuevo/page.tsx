import Link from "next/link";

import { ServiceForm } from "@/components/admin/ServiceForm";

export const metadata = { title: "Nuevo servicio — Admin" };

export default function NuevoServicioPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/servicios" className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-700)]">
          ← Volver al listado
        </Link>
        <h1 className="font-display text-3xl text-[var(--text-strong)] mt-2">
          Nuevo servicio
        </h1>
      </div>
      <ServiceForm />
    </div>
  );
}
