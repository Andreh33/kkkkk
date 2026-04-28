export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductoPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/productos" className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-700)]">
          ← Volver al listado
        </Link>
        <h1 className="font-display text-3xl text-[var(--text-strong)] mt-2">
          Editar producto
        </h1>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
