export const dynamic = "force-dynamic";

import type { Metadata } from "next";

import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { MessageActions } from "@/components/admin/MessageActions";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Mensajes — Admin" };

export default async function AdminMensajesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--text-strong)] mb-6">
        Mensajes de contacto
      </h1>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-[var(--text-mute)]">No hay mensajes.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-[var(--bg-white)] rounded-xl border p-5 ${
                msg.read ? "border-[var(--line)]" : "border-[var(--gold-300)]"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-medium text-[var(--text-base)]">{msg.name}</p>
                  <p className="text-sm text-[var(--text-soft)]">
                    {msg.email}
                    {msg.phone && ` · ${msg.phone}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!msg.read && <Badge>Nuevo</Badge>}
                  <span className="text-xs text-[var(--text-mute)]">{formatDate(msg.createdAt)}</span>
                </div>
              </div>
              {msg.subject && (
                <p className="font-medium text-sm text-[var(--text-base)] mb-2">
                  Asunto: {msg.subject}
                </p>
              )}
              <p className="text-sm text-[var(--text-soft)] whitespace-pre-wrap mb-4">{msg.message}</p>
              <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 mt-3">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject ?? "Tu consulta")}`}
                  className="text-xs text-[var(--gold-700)] hover:underline"
                >
                  Responder por email →
                </a>
                <MessageActions id={msg.id} read={msg.read} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
