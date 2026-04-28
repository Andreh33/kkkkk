export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { prisma } from "@/lib/db";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/blog" className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-700)]">
          ← Volver al listado
        </Link>
        <h1 className="font-display text-3xl text-[var(--text-strong)] mt-2">
          Editar artículo
        </h1>
      </div>
      <BlogPostForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          coverImage: post.coverImage,
          contentMdx: post.contentMdx,
          author: post.author,
          status: post.status as "DRAFT" | "PUBLISHED",
        }}
      />
    </div>
  );
}
