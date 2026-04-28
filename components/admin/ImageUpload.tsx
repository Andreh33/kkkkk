"use client";

import { Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFiles } from "@/lib/uploadthing";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
}

export function ImageUpload({ images, onChange, multiple = true }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fileArr = Array.from(files);
      const endpoint = multiple ? "galleryUploader" : "imageUploader";
      const res = await uploadFiles(endpoint, { files: fileArr });
      const urls = (res ?? []).map((r) => (r as { url?: string; ufsUrl?: string }).url ?? (r as { ufsUrl?: string }).ufsUrl).filter(Boolean) as string[];
      onChange([...images, ...urls]);
      toast.success(`${urls.length} imagen(es) subida(s)`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al subir");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function addUrl() {
    const url = urlInput.trim();
    if (!url) return;
    if (!/^https?:\/\//.test(url)) {
      toast.error("La URL debe empezar por http:// o https://");
      return;
    }
    onChange([...images, url]);
    setUrlInput("");
  }

  function remove(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="sm:w-auto"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Subiendo…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" /> Subir desde mi PC
            </>
          )}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex gap-2 flex-1">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="…o pega una URL externa"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
            }}
          />
          <Button type="button" onClick={addUrl} variant="ghost">
            Añadir
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {images.map((url, idx) => (
            <div key={idx} className="relative group rounded-md overflow-hidden bg-[var(--bg-deep)] aspect-square border border-[var(--line)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Imagen ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute top-1 right-1 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar imagen"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {idx === 0 && (
                <span className="absolute top-1 left-1 text-[10px] bg-[var(--gold-700)] text-white px-2 py-0.5 rounded-full font-medium">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
