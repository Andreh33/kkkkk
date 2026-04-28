import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

const serviceSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  shortDesc: z.string().nullable().optional(),
  description: z.string().min(10),
  category: z.enum(["MASAJE", "MEDICINA_ESTETICA", "TRATAMIENTO_FACIAL", "TRATAMIENTO_CORPORAL"]),
  priceMin: z.number().int().positive(),
  priceMax: z.number().int().positive().nullable().optional(),
  durationMin: z.number().int().positive(),
  images: z.array(z.string().url()),
  bookable: z.boolean(),
  active: z.boolean(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const slug = data.slug ?? slugify(data.name);
  const existing = await prisma.service.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Ya existe un servicio con ese slug" }, { status: 409 });
  }

  const service = await prisma.service.create({ data: { ...data, slug } });
  return NextResponse.json({ service });
}
