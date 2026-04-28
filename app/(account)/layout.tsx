export const dynamic = "force-dynamic";

import Link from "next/link";
import { Calendar, Home, MapPin, Package, User } from "lucide-react";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LogoutButton } from "@/components/layout/LogoutButton";

const NAV = [
  { href: "/mi-cuenta", label: "Dashboard", icon: Home },
  { href: "/mi-cuenta/perfil", label: "Mi perfil", icon: User },
  { href: "/mi-cuenta/direcciones", label: "Direcciones", icon: MapPin },
  { href: "/mi-cuenta/pedidos", label: "Mis pedidos", icon: Package },
  { href: "/mi-cuenta/citas", label: "Mis citas", icon: Calendar },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/mi-cuenta");

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-[var(--bg-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-4">
                <p className="text-xs font-medium text-[var(--text-mute)] uppercase tracking-widest mb-4 px-2">
                  Mi cuenta
                </p>
                <nav className="space-y-1">
                  {NAV.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-base)] hover:bg-[var(--bg-cream)] hover:text-[var(--gold-700)] transition-colors"
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {label}
                    </Link>
                  ))}
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--gold-700)] hover:bg-[var(--bg-cream)] font-medium transition-colors"
                    >
                      <Home className="h-4 w-4 flex-shrink-0" />
                      Panel admin
                    </Link>
                  )}
                </nav>
                <div className="mt-3 pt-3 border-t border-[var(--line)]">
                  <LogoutButton />
                </div>
              </div>
            </aside>
            {/* Main */}
            <main className="lg:col-span-3">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
