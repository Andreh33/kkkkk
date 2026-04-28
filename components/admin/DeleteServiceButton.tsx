"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { extractError } from "@/lib/api-error";

interface DeleteServiceButtonProps {
  id: string;
  name: string;
}

export function DeleteServiceButton({ id, name }: DeleteServiceButtonProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/servicios/${id}`, { method: "DELETE" });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(extractError(payload, "No se pudo eliminar"));
      }
      toast.success(payload.softDeleted ? "Servicio desactivado (tiene citas asociadas)" : "Servicio eliminado");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al eliminar");
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      aria-label={`Eliminar ${name}`}
      title="Eliminar"
      className="p-1.5 rounded text-[var(--text-mute)] hover:text-[var(--danger)] hover:bg-[var(--bg-cream)] transition-colors disabled:opacity-40"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
