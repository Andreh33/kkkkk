"use client";

import dynamic from "next/dynamic";
import type { Metadata } from "next";

const AdminCalendar = dynamic(
  () => import("@/components/admin/AdminCalendar").then((m) => m.AdminCalendar),
  { ssr: false }
);

export default function AdminCitasPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--text-strong)] mb-6">Gestión de citas</h1>
      <AdminCalendar />
    </div>
  );
}
