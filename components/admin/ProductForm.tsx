"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";

interface ProductFormProps {
  product?: {
    id: string;
    slug: string;
    name: string;
    description: string;
    shortDesc: string | null;
    price: number;
    compareAt: number | null;
    stock: number;
    images: string[];
    category: string | null;
    tags: string[];
    featured: boolean;
    active: boolean;
  };
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [shortDesc, setShortDesc] = useState(product?.shortDesc ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [priceEur, setPriceEur] = useState(product ? (product.price / 100).toFixed(2) : "");
  const [compareAtEur, setCompareAtEur] = useState(
    product?.compareAt ? (product.compareAt / 100).toFixed(2) : ""
  );
  const [stock, setStock] = useState(String(product?.stock ?? 0));
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [imageInput, setImageInput] = useState("");
  const [category, setCategory] = useState(product?.category ?? "");
  const [tagsStr, setTagsStr] = useState((product?.tags ?? []).join(", "));
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [active, setActive] = useState(product?.active ?? true);
  const [saving, setSaving] = useState(false);

  function autoSlug(value: string) {
    setName(value);
    if (!isEdit) setSlug(slugify(value));
  }

  function addImage() {
    const url = imageInput.trim();
    if (!url) return;
    if (!/^https?:\/\//.test(url)) {
      toast.error("La URL debe empezar por http:// o https://");
      return;
    }
    setImages([...images, url]);
    setImageInput("");
  }

  function removeImage(idx: number) {
    setImages(images.filter((_, i) => i !== idx));
  }

  async function save() {
    if (!name || !description || !priceEur) {
      toast.error("Nombre, descripción y precio son obligatorios");
      return;
    }
    const price = Math.round(parseFloat(priceEur.replace(",", ".")) * 100);
    const compareAt = compareAtEur ? Math.round(parseFloat(compareAtEur.replace(",", ".")) * 100) : null;
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Precio inválido");
      return;
    }
    setSaving(true);
    try {
      const body = {
        name,
        slug: slug || slugify(name),
        shortDesc: shortDesc || null,
        description,
        price,
        compareAt,
        stock: parseInt(stock, 10) || 0,
        images,
        category: category || null,
        tags: tagsStr.split(",").map((t) => t.trim()).filter(Boolean),
        featured,
        active,
      };
      const url = isEdit ? `/api/admin/productos/${product!.id}` : "/api/admin/productos";
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
      toast.success(isEdit ? "Producto actualizado" : "Producto creado");
      router.push("/admin/productos");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit) return;
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/productos/${product!.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      toast.success("Producto eliminado");
      router.push("/admin/productos");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al eliminar");
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5 space-y-5">
          <div>
            <Label htmlFor="name">Nombre *</Label>
            <Input id="name" value={name} onChange={(e) => autoSlug(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 font-mono text-sm"
            />
            <p className="text-xs text-[var(--text-mute)] mt-1">
              URL pública: /tienda/{slug || "slug-automatico"}
            </p>
          </div>
          <div>
            <Label htmlFor="shortDesc">Descripción corta</Label>
            <Input
              id="shortDesc"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Línea breve para listados"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Descripción completa *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Precio (€) *</Label>
              <Input id="price" value={priceEur} onChange={(e) => setPriceEur(e.target.value)} placeholder="29,90" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="compareAt">Antes (€)</Label>
              <Input id="compareAt" value={compareAtEur} onChange={(e) => setCompareAtEur(e.target.value)} placeholder="39,90" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Cosmética, Skincare…" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="tags">Etiquetas (separadas por coma)</Label>
            <Input id="tags" value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="hidratante, antiedad" className="mt-1" />
          </div>
        </div>

        <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
          <h3 className="font-medium text-[var(--text-strong)] mb-3">Imágenes</h3>
          <div className="flex gap-2">
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="URL de la imagen (https://...)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImage();
                }
              }}
            />
            <Button type="button" onClick={addImage} variant="outline">Añadir</Button>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {images.map((url, idx) => (
                <div key={idx} className="relative group rounded-md overflow-hidden bg-[var(--bg-deep)] aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Imagen ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Eliminar imagen"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-5">
        <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
          <h3 className="font-medium text-[var(--text-strong)] mb-4">Publicación</h3>
          <label className="flex items-center gap-2 mb-3 text-sm text-[var(--text-base)] cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4 accent-[var(--gold-500)]"
            />
            Activo (visible en la tienda)
          </label>
          <label className="flex items-center gap-2 text-sm text-[var(--text-base)] cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 accent-[var(--gold-500)]"
            />
            Destacado en home
          </label>
          <div className="mt-5 space-y-2">
            <Button onClick={save} disabled={saving} className="w-full">
              {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
            </Button>
            {isEdit && (
              <Button onClick={handleDelete} disabled={saving} variant="destructive" className="w-full">
                Eliminar
              </Button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
