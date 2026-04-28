"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { extractError } from "@/lib/api-error";

interface ServiceOption {
  id: string;
  name: string;
  durationMin: number;
}

interface AppointmentDetail {
  id: string;
  status: string;
  adminNotes?: string;
  userName: string;
  serviceName: string;
  start: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#C99B5C",
  CONFIRMED: "#7B8F6B",
  COMPLETED: "#4F6342",
  CANCELLED: "#B0594B",
  NO_SHOW: "#A89D8C",
};

const STATUSES = ["PENDING", "CONFIRMED", "COMPLETED", "NO_SHOW", "CANCELLED"] as const;

function isoLocal(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function AdminCalendar() {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const calendarRef = useRef<FullCalendar | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [startsAt, setStartsAt] = useState(isoLocal(new Date()));
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [status, setStatus] = useState<typeof STATUSES[number]>("CONFIRMED");
  const [saving, setSaving] = useState(false);

  const [detail, setDetail] = useState<AppointmentDetail | null>(null);

  useEffect(() => {
    fetch("/api/admin/appointments/services")
      .then((r) => r.json())
      .then((d) => {
        const list: ServiceOption[] = d.services ?? [];
        setServices(list);
      })
      .catch(() => {});
  }, []);

  function refresh() {
    calendarRef.current?.getApi().refetchEvents();
  }

  function resetCreateForm(prefillStart?: Date) {
    setServiceId(services[0]?.id ?? "");
    setStartsAt(isoLocal(prefillStart ?? new Date()));
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setAdminNotes("");
    setStatus("CONFIRMED");
  }

  function openCreate(prefillStart?: Date) {
    resetCreateForm(prefillStart);
    setCreateOpen(true);
  }

  async function createAppointment() {
    if (!serviceId) {
      toast.error("Selecciona un servicio");
      return;
    }
    if (!guestName || !guestEmail) {
      toast.error("Indica nombre y email del cliente");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          guestEmail,
          guestPhone: guestPhone || undefined,
          serviceId,
          startsAt: new Date(startsAt).toISOString(),
          status,
          adminNotes: adminNotes || undefined,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(extractError(payload, "Error al crear la cita"));
      }
      toast.success("Cita creada");
      setCreateOpen(false);

      // Navegar a la fecha de la cita y forzar recarga
      const apptDate = new Date(startsAt);
      const api = calendarRef.current?.getApi();
      if (api) {
        api.gotoDate(apptDate);
        api.refetchEvents();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al crear");
    } finally {
      setSaving(false);
    }
  }

  async function deleteAppointment(id: string) {
    if (!confirm("¿Eliminar esta cita? El crédito del cliente (si existe) volverá a estar disponible.")) {
      return;
    }
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractError(payload, "Error al eliminar"));
      toast.success("Cita eliminada");
      setDetail(null);
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al eliminar");
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractError(payload, "Error al actualizar"));
      toast.success("Estado actualizado");
      setDetail(null);
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al actualizar");
    }
  }

  async function handleEventDrop(info: {
    event: { id: string; startStr: string; endStr: string };
    revert: () => void;
  }) {
    const res = await fetch(`/api/appointments/${info.event.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startsAt: info.event.startStr, endsAt: info.event.endStr }),
    });
    if (!res.ok) {
      info.revert();
      const payload = await res.json().catch(() => ({}));
      toast.error(extractError(payload, "No se pudo mover la cita"));
    } else {
      toast.success("Cita movida correctamente.");
      refresh();
    }
  }

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Button onClick={() => openCreate()} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Nueva cita
        </Button>
      </div>

      <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-4">
        <FullCalendar
          ref={calendarRef as never}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locale={esLocale}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={async (info, success, failure) => {
            try {
              const res = await fetch(`/api/appointments?start=${info.startStr}&end=${info.endStr}`);
              const data = await res.json();
              const mapped = (data.appointments ?? []).map((a: {
                id: string;
                user: { name: string };
                service: { name: string };
                startsAt: string;
                endsAt: string;
                status: string;
                adminNotes?: string;
              }) => ({
                id: a.id,
                title: `${a.user.name} — ${a.service.name}`,
                start: a.startsAt,
                end: a.endsAt,
                backgroundColor: STATUS_COLORS[a.status] ?? "#B89968",
                borderColor: STATUS_COLORS[a.status] ?? "#B89968",
                extendedProps: {
                  status: a.status,
                  adminNotes: a.adminNotes,
                  userName: a.user.name,
                  serviceName: a.service.name,
                },
              }));
              success(mapped);
            } catch (e) {
              failure(e as Error);
            }
          }}
          editable
          selectable
          eventDrop={handleEventDrop}
          select={(info) => openCreate(info.start)}
          height="auto"
          slotMinTime="09:00:00"
          slotMaxTime="21:00:00"
          allDaySlot={false}
          eventClick={(info) => {
            setDetail({
              id: info.event.id,
              status: info.event.extendedProps.status,
              adminNotes: info.event.extendedProps.adminNotes,
              userName: info.event.extendedProps.userName,
              serviceName: info.event.extendedProps.serviceName,
              start: info.event.startStr,
            });
          }}
        />
      </div>

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nueva cita</DialogTitle>
            <DialogDescription>
              Cita manual sin pasar por checkout. Si el cliente no tiene cuenta, se crea automáticamente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ap-service">Servicio</Label>
              <select
                id="ap-service"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="mt-1 w-full rounded-md border border-[var(--line)] bg-[var(--bg-white)] px-3 py-2 text-sm"
              >
                <option value="">— Selecciona —</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.durationMin} min)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="ap-start">Fecha y hora de inicio</Label>
              <Input
                id="ap-start"
                type="datetime-local"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="ap-name">Nombre cliente</Label>
                <Input id="ap-name" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="ap-email">Email cliente</Label>
                <Input id="ap-email" type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="ap-phone">Teléfono (opcional)</Label>
              <Input id="ap-phone" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="ap-status">Estado inicial</Label>
              <select
                id="ap-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof STATUSES[number])}
                className="mt-1 w-full rounded-md border border-[var(--line)] bg-[var(--bg-white)] px-3 py-2 text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="ap-notes">Notas internas (opcional)</Label>
              <Textarea
                id="ap-notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={createAppointment} disabled={saving}>
              {saving ? "Creando…" : "Crear cita"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail dialog */}
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent>
          {detail && (
            <>
              <DialogHeader>
                <DialogTitle>{detail.serviceName}</DialogTitle>
                <DialogDescription>
                  {detail.userName} · {new Date(detail.start).toLocaleString("es-ES")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Estado</Label>
                  <select
                    value={detail.status}
                    onChange={(e) => updateStatus(detail.id, e.target.value)}
                    className="mt-1 w-full rounded-md border border-[var(--line)] bg-[var(--bg-white)] px-3 py-2 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                {detail.adminNotes && (
                  <div>
                    <Label>Notas internas</Label>
                    <p className="text-sm text-[var(--text-soft)] mt-1 whitespace-pre-wrap">
                      {detail.adminNotes}
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => deleteAppointment(detail.id)}
                  className="mr-auto"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                </Button>
                <Button variant="ghost" onClick={() => setDetail(null)}>
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
