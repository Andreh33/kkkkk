"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED", "CANCELLED"] as const;
type Status = (typeof STATUSES)[number];

interface OrderStatusFormProps {
  id: string;
  status: string;
}

export function OrderStatusForm({ id, status: initial }: OrderStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initial as Status);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pedidos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      toast.success("Estado actualizado");
      router.refresh();
    } catch {
      toast.error("Error al actualizar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
        className="w-full rounded-md border border-[var(--line)] bg-[var(--bg-white)] px-3 py-2 text-sm"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <Button onClick={save} disabled={saving || status === initial} className="w-full" size="sm">
        {saving ? "Guardando…" : "Actualizar estado"}
      </Button>
    </div>
  );
}
