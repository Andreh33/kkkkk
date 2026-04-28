"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { BlogEditor } from "@/components/admin/BlogEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";

interface BlogPostFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string | null;
    contentMdx: string;
    author: string;
    status: "DRAFT" | "PUBLISHED";
  };
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const isEdit = !!post;
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [author, setAuthor] = useState(post?.author ?? "Forma y Línea");
  const [content, setContent] = useState(post?.contentMdx ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(post?.status ?? "DRAFT");
  const [saving, setSaving] = useState(false);

  function autoSlug(value: string) {
    setTitle(value);
    if (!isEdit) setSlug(slugify(value));
  }

  async function save(publish: boolean) {
    if (!title || !excerpt || !content) {
      toast.error("Título, extracto y contenido son obligatorios");
      return;
    }
    setSaving(true);
    try {
      const body = {
        title,
        slug: slug || slugify(title),
        excerpt,
        coverImage: coverImage || null,
        author,
        contentMdx: content,
        status: publish ? "PUBLISHED" : status,
      };
      const url = isEdit ? `/api/admin/blog/${post!.id}` : "/api/admin/blog";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Error al guardar");
      }
      toast.success(isEdit ? "Artículo actualizado" : "Artículo creado");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit) return;
    if (!confirm("¿Eliminar este artículo? Esta acción no se puede deshacer.")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${post!.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      toast.success("Artículo eliminado");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al eliminar");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => autoSlug(e.target.value)}
              placeholder="Título del artículo"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="cuidado-de-la-piel"
              className="mt-1 font-mono text-sm"
            />
            <p className="text-xs text-[var(--text-mute)] mt-1">
              URL pública: /blog/{slug || "slug-automatico"}
            </p>
          </div>
          <div>
            <Label htmlFor="excerpt">Extracto *</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Breve resumen del artículo (1-2 líneas)"
              rows={2}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Contenido *</Label>
            <div className="mt-1">
              <BlogEditor value={content} onChange={setContent} />
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
            <h3 className="font-medium text-[var(--text-strong)] mb-4">Publicación</h3>
            <div className="space-y-3 text-sm">
              <div>
                <Label htmlFor="status">Estado</Label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
                  className="mt-1 w-full rounded-md border border-[var(--line)] bg-[var(--bg-white)] px-3 py-2 text-sm"
                >
                  <option value="DRAFT">Borrador</option>
                  <option value="PUBLISHED">Publicado</option>
                </select>
              </div>
              <div>
                <Label htmlFor="author">Autor</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1" />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <Button onClick={() => save(false)} disabled={saving} className="w-full">
                {saving ? "Guardando…" : "Guardar"}
              </Button>
              {status !== "PUBLISHED" && (
                <Button
                  onClick={() => save(true)}
                  disabled={saving}
                  variant="sage"
                  className="w-full"
                >
                  Guardar y publicar
                </Button>
              )}
              {isEdit && (
                <Button
                  onClick={handleDelete}
                  disabled={saving}
                  variant="destructive"
                  className="w-full"
                >
                  Eliminar
                </Button>
              )}
            </div>
          </div>

          <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
            <h3 className="font-medium text-[var(--text-strong)] mb-3">Imagen de portada</h3>
            <ImageUpload
              images={coverImage ? [coverImage] : []}
              onChange={(imgs) => setCoverImage(imgs[0] ?? "")}
              multiple={false}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
