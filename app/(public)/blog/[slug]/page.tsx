export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LineDivider } from "@/components/decor/LineDivider";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="pt-20">
      {/* Hero */}
      {post.coverImage && (
        <div className="relative h-64 sm:h-96 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <article className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Navegación" className="mb-8">
            <Link
              href="/blog"
              className="text-sm text-[var(--gold-700)] hover:text-[var(--gold-500)] transition-colors"
            >
              ← Volver al blog
            </Link>
          </nav>

          <header className="mb-10">
            <p className="text-xs text-[var(--text-mute)] mb-3">
              {post.publishedAt ? formatDate(post.publishedAt) : ""} · {post.author}
            </p>
            <h1 className="font-display text-display-md text-[var(--text-strong)] mb-4">
              {post.title}
            </h1>
            <p className="text-body-lg text-[var(--text-soft)]">{post.excerpt}</p>
          </header>

          <LineDivider color="gold" className="mb-10" />

          {/* Contenido */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-[var(--text-strong)]
              prose-p:text-[var(--text-soft)] prose-p:leading-relaxed
              prose-a:text-[var(--gold-700)] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[var(--text-base)]
              prose-ul:text-[var(--text-soft)] prose-li:marker:text-[var(--gold-500)]"
            dangerouslySetInnerHTML={{ __html: post.contentMdx }}
          />
        </div>
      </article>
    </div>
  );
}
