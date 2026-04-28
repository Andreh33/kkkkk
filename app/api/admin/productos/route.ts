import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  shortDesc: z.string().nullable().optional(),
  description: z.string().min(10),
  price: z.number().int().positive(),
  compareAt: z.number().int().positive().nullable().optional(),
  stock: z.number().int().min(0),
  images: z.array(z.string().url()),
  category: z.string().nullable().optional(),
  tags: z.array(z.string()),
  featured: z.boolean(),
  active: z.boolean(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const slug = data.slug ?? slugify(data.name);
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: { ...data, slug },
  });
  return NextResponse.json({ product });
}
