import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).optional(),
  excerpt: z.string().min(10),
  coverImage: z.string().url().nullable().optional(),
  contentMdx: z.string().min(20),
  author: z.string().min(2),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const slug = data.slug ?? slugify(data.title);
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Ya existe un artículo con ese slug" }, { status: 409 });
  }

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      slug,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });
  return NextResponse.json({ post });
}
