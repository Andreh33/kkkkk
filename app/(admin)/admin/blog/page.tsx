export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Blog — Admin" };

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-[var(--text-strong)]">Blog</h1>
        <Button asChild size="sm">
          <Link href="/admin/blog/nuevo">Nuevo artículo</Link>
        </Button>
      </div>

      <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] overflow-hidden">
        <div className="divide-y divide-[var(--line)]">
          {posts.map((post) => (
            <div key={post.id} className="p-4 flex items-center justify-between hover:bg-[var(--bg-cream)] transition-colors">
              <div>
                <Link href={`/admin/blog/${post.id}`} className="font-medium text-[var(--text-base)] hover:text-[var(--gold-700)] transition-colors">
                  {post.title}
                </Link>
                <p className="text-xs text-[var(--text-mute)] mt-0.5">
                  {post.publishedAt ? formatDate(post.publishedAt) : "Sin publicar"} · {post.author}
                </p>
              </div>
              <Badge variant={post.status === "PUBLISHED" ? "success" : "secondary"}>
                {post.status === "PUBLISHED" ? "Publicado" : "Borrador"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
