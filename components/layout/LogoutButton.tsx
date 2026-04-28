"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-base)] hover:bg-[var(--bg-cream)] hover:text-[var(--danger)] transition-colors text-left"
    >
      <LogOut className="h-4 w-4 flex-shrink-0" />
      Cerrar sesión
    </button>
  );
}
