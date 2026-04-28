export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Consejos de Belleza y Bienestar",
  description:
    "Artículos sobre cuidado de la piel, masajes, medicina estética y bienestar del equipo de Forma y Línea Ciudad Real.",
};

export const revalidate = 60;

async function getPosts() {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="pt-20">
      <section className="bg-[var(--bg-deep)] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Editorial
          </p>
          <h1 className="font-display text-display-lg text-[var(--text-strong)]">Blog</h1>
          <p className="text-body text-[var(--text-soft)] mt-4">
            Consejos, curiosidades y novedades del mundo de la belleza y el bienestar.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-mute)]">Próximamente nuevos artículos.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  {post.coverImage && (
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-[var(--bg-deep)]">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[var(--text-mute)] mb-2">
                      {post.publishedAt ? formatDate(post.publishedAt) : ""} · {post.author}
                    </p>
                    <h2 className="font-display text-2xl text-[var(--text-strong)] mb-2 group-hover:text-[var(--gold-700)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-body-sm text-[var(--text-soft)] leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="inline-block mt-3 text-sm text-[var(--gold-700)] font-medium">
                      Leer artículo →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
