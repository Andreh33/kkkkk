import Link from "next/link";

import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = { title: "Nuevo producto — Admin" };

export default function NuevoProductoPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/productos" className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-700)]">
          ← Volver al listado
        </Link>
        <h1 className="font-display text-3xl text-[var(--text-strong)] mt-2">
          Nuevo producto
        </h1>
      </div>
      <ProductForm />
    </div>
  );
}
