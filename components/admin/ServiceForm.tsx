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

const CATEGORIES = [
  { value: "MASAJE", label: "Masaje" },
  { value: "MEDICINA_ESTETICA", label: "Medicina Estética" },
  { value: "TRATAMIENTO_FACIAL", label: "Tratamiento Facial" },
  { value: "TRATAMIENTO_CORPORAL", label: "Tratamiento Corporal" },
] as const;

type Category = (typeof CATEGORIES)[number]["value"];

interface ServiceFormProps {
  service?: {
    id: string;
    slug: string;
    name: string;
    description: string;
    shortDesc: string | null;
    category: Category;
    priceMin: number;
    priceMax: number | null;
    durationMin: number;
    images: string[];
    bookable: boolean;
    active: boolean;
  };
}

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const isEdit = !!service;

  const [name, setName] = useState(service?.name ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [shortDesc, setShortDesc] = useState(service?.shortDesc ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [category, setCategory] = useState<Category>(service?.category ?? "MASAJE");
  const [priceMinEur, setPriceMinEur] = useState(service ? (service.priceMin / 100).toFixed(2) : "");
  const [priceMaxEur, setPriceMaxEur] = useState(
    service?.priceMax ? (service.priceMax / 100).toFixed(2) : ""
  );
  const [durationMin, setDurationMin] = useState(String(service?.durationMin ?? 60));
  const [images, setImages] = useState<string[]>(service?.images ?? []);
  const [imageInput, setImageInput] = useState("");
  const [bookable, setBookable] = useState(service?.bookable ?? true);
  const [active, setActive] = useState(service?.active ?? true);
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

  async function save() {
    if (!name || !description || !priceMinEur) {
      toast.error("Nombre, descripción y precio son obligatorios");
      return;
    }
    const priceMin = Math.round(parseFloat(priceMinEur.replace(",", ".")) * 100);
    const priceMax = priceMaxEur ? Math.round(parseFloat(priceMaxEur.replace(",", ".")) * 100) : null;
    setSaving(true);
    try {
      const body = {
        name,
        slug: slug || slugify(name),
        shortDesc: shortDesc || null,
        description,
        category,
        priceMin,
        priceMax,
        durationMin: parseInt(durationMin, 10) || 60,
        images,
        bookable,
        active,
      };
      const url = isEdit ? `/api/admin/servicios/${service!.id}` : "/api/admin/servicios";
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
      toast.success(isEdit ? "Servicio actualizado" : "Servicio creado");
      router.push("/admin/servicios");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit) return;
    if (!confirm("¿Eliminar este servicio? Esta acción no se puede deshacer.")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/servicios/${service!.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      toast.success("Servicio eliminado");
      router.push("/admin/servicios");
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
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 font-mono text-sm" />
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="mt-1 w-full rounded-md border border-[var(--line)] bg-[var(--bg-white)] px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="shortDesc">Descripción corta</Label>
            <Input id="shortDesc" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="mt-1" />
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
              <Label htmlFor="priceMin">Precio mín. (€) *</Label>
              <Input id="priceMin" value={priceMinEur} onChange={(e) => setPriceMinEur(e.target.value)} placeholder="60,00" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="priceMax">Precio máx. (€)</Label>
              <Input id="priceMax" value={priceMaxEur} onChange={(e) => setPriceMaxEur(e.target.value)} placeholder="90,00" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="durationMin">Duración (min)</Label>
              <Input id="durationMin" type="number" value={durationMin} onChange={(e) => setDurationMin(e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-xl p-5">
          <h3 className="font-medium text-[var(--text-strong)] mb-3">Imágenes</h3>
          <div className="flex gap-2">
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="URL de la imagen"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImage();
                }
              }}
            />
            <Button type="button" onClick={addImage} variant="outline">
              Añadir
            </Button>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {images.map((url, idx) => (
                <div key={idx} className="relative group rounded-md overflow-hidden bg-[var(--bg-deep)] aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Eliminar"
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
          <label className="flex items-center gap-2 mb-3 text-sm cursor-pointer">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4 accent-[var(--gold-500)]" />
            Activo
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={bookable} onChange={(e) => setBookable(e.target.checked)} className="h-4 w-4 accent-[var(--gold-500)]" />
            Reservable online (genera ServiceCredit)
          </label>
          <div className="mt-5 space-y-2">
            <Button onClick={save} disabled={saving} className="w-full">
              {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear servicio"}
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
