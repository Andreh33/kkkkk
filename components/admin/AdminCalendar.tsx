"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: {
    status: string;
    notes?: string;
    userId: string;
    serviceId: string;
  };
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#C99B5C",
  CONFIRMED: "#7B8F6B",
  COMPLETED: "#4F6342",
  CANCELLED: "#B0594B",
  NO_SHOW: "#A89D8C",
};

async function fetchAppointments(start: string, end: string): Promise<CalendarEvent[]> {
  const res = await fetch(`/api/appointments?start=${start}&end=${end}`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.appointments ?? []).map((a: {
    id: string;
    user: { name: string };
    service: { name: string };
    startsAt: string;
    endsAt: string;
    status: string;
    notes?: string;
    userId: string;
    serviceId: string;
  }) => ({
    id: a.id,
    title: `${a.user.name} — ${a.service.name}`,
    start: a.startsAt,
    end: a.endsAt,
    backgroundColor: STATUS_COLORS[a.status] ?? "#B89968",
    borderColor: STATUS_COLORS[a.status] ?? "#B89968",
    extendedProps: { status: a.status, notes: a.notes, userId: a.userId, serviceId: a.serviceId },
  }));
}

export function AdminCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  async function loadEvents(info: { startStr: string; endStr: string }) {
    const data = await fetchAppointments(info.startStr, info.endStr);
    setEvents(data);
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
      toast.error("No se pudo mover la cita.");
    } else {
      toast.success("Cita movida correctamente.");
    }
  }

  return (
    <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={esLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        datesSet={loadEvents}
        editable
        eventDrop={handleEventDrop}
        height="auto"
        slotMinTime="09:00:00"
        slotMaxTime="21:00:00"
        allDaySlot={false}
        eventClick={(info) => {
          toast.info(`${info.event.title} — ${info.event.extendedProps.status}`);
        }}
      />
    </div>
  );
}
