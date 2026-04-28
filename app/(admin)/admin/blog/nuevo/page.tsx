import Link from "next/link";

import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const metadata = { title: "Nuevo artículo — Admin" };

export default function NuevoBlogPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/blog" className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-700)]">
          ← Volver al listado
        </Link>
        <h1 className="font-display text-3xl text-[var(--text-strong)] mt-2">
          Nuevo artículo
        </h1>
      </div>
      <BlogPostForm />
    </div>
  );
}
