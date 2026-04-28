export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";

import { prisma } from "@/lib/db";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;

  const staticPages = [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/quien-soy`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/servicios`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/servicios/masajes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/servicios/medicina-estetica`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/servicios/tratamientos-faciales`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/servicios/tratamientos-corporales`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tienda`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contacto`, changeFrequency: "yearly", priority: 0.6 },
  ] as MetadataRoute.Sitemap;

  const [products, posts] = await Promise.all([
    prisma.product.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/tienda/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...postPages];
}
