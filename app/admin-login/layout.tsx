import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Forma y Línea",
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
