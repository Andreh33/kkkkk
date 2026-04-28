"use client";

import { Check, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface MessageActionsProps {
  id: string;
  read: boolean;
}

export function MessageActions({ id, read }: MessageActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggleRead() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/mensajes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      });
      if (!res.ok) throw new Error();
      toast.success(read ? "Marcado como no leído" : "Marcado como leído");
      router.refresh();
    } catch {
      toast.error("Error al actualizar");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar este mensaje?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/mensajes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Mensaje eliminado");
      router.refresh();
    } catch {
      toast.error("Error al eliminar");
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Button onClick={toggleRead} disabled={busy} size="sm" variant="outline">
        <Check className="h-3.5 w-3.5 mr-1" /> {read ? "Marcar como no leído" : "Marcar leído"}
      </Button>
      <Button onClick={handleDelete} disabled={busy} size="sm" variant="ghost" className="text-[var(--danger)]">
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
