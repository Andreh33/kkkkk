"use client";

import {
  Calendar,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/citas", label: "Citas", icon: Calendar },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/servicios", label: "Servicios", icon: Star },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
  { href: "/admin/mensajes", label: "Mensajes", icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[var(--text-strong)] text-[var(--bg-deep)] min-h-screen p-4 flex-shrink-0">
      <div className="mb-8 px-2 pt-2">
        <Image
          src="/logo/logo-forma-linea-1920x1080-1.png"
          alt="Forma y Línea"
          width={140}
          height={40}
          className="h-9 w-auto object-contain brightness-0 invert"
        />
        <p className="text-[10px] text-[var(--text-mute)] mt-1 tracking-widest uppercase">
          Panel de administración
        </p>
      </div>

      <nav className="space-y-1 flex-1">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-[var(--gold-700)] text-white"
                  : "text-[var(--text-mute)] hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-[var(--text-mute)] hover:text-white transition-colors"
        >
          ← Ver sitio web
        </Link>
      </div>
    </aside>
  );
}
