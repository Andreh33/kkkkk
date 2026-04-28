export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";

import { ServiceForm } from "@/components/admin/ServiceForm";
import { prisma } from "@/lib/db";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditServicioPage({ params }: Props) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/servicios" className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-700)]">
          ← Volver al listado
        </Link>
        <h1 className="font-display text-3xl text-[var(--text-strong)] mt-2">
          Editar servicio
        </h1>
      </div>
      <ServiceForm
        service={{
          id: service.id,
          slug: service.slug,
          name: service.name,
          description: service.description,
          shortDesc: service.shortDesc,
          category: service.category as "MASAJE" | "MEDICINA_ESTETICA" | "TRATAMIENTO_FACIAL" | "TRATAMIENTO_CORPORAL",
          priceMin: service.priceMin,
          priceMax: service.priceMax,
          durationMin: service.durationMin,
          images: service.images,
          bookable: service.bookable,
          active: service.active,
        }}
      />
    </div>
  );
}
