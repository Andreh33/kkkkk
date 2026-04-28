import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  shortDesc: z.string().nullable().optional(),
  description: z.string().min(10).optional(),
  category: z.enum(["MASAJE", "MEDICINA_ESTETICA", "TRATAMIENTO_FACIAL", "TRATAMIENTO_CORPORAL"]).optional(),
  priceMin: z.number().int().positive().optional(),
  priceMax: z.number().int().positive().nullable().optional(),
  durationMin: z.number().int().positive().optional(),
  images: z.array(z.string().url()).optional(),
  bookable: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const service = await prisma.service.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ service });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  try {
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No se puede eliminar: el servicio tiene citas o pedidos asociados. Márcalo como inactivo en su lugar." },
      { status: 400 }
    );
  }
}
