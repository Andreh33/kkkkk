"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

interface BlogEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export function BlogEditor({ value, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener", target: "_blank" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-6" } }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] focus:outline-none prose-headings:font-display prose-headings:text-[var(--text-strong)] prose-p:text-[var(--text-base)] prose-p:leading-[1.8] prose-a:text-[var(--gold-700)] prose-strong:text-[var(--text-strong)]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) {
    return (
      <div className="border border-[var(--line)] rounded-lg p-6 text-sm text-[var(--text-mute)]">
        Cargando editor…
      </div>
    );
  }

  const Btn = ({
    onClick,
    active,
    children,
    label,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    label: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "p-2 rounded hover:bg-[var(--bg-cream)] transition-colors",
        active && "bg-[var(--gold-100,var(--bg-cream))] text-[var(--gold-700)]"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-[var(--line)] rounded-lg overflow-hidden bg-[var(--bg-white)]">
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--line)] p-2 bg-[var(--bg-cream)]">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Negrita">
          <Bold className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Cursiva">
          <Italic className="h-4 w-4" />
        </Btn>
        <span className="w-px h-6 bg-[var(--line)] mx-1" />
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="Título H2"
        >
          <Heading2 className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          label="Título H3"
        >
          <Heading3 className="h-4 w-4" />
        </Btn>
        <span className="w-px h-6 bg-[var(--line)] mx-1" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Lista">
          <List className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Lista numerada">
          <ListOrdered className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Cita">
          <Quote className="h-4 w-4" />
        </Btn>
        <span className="w-px h-6 bg-[var(--line)] mx-1" />
        <Btn
          onClick={() => {
            const url = window.prompt("URL del enlace:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
          label="Enlace"
        >
          <LinkIcon className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => {
            const url = window.prompt("URL de la imagen:");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          label="Imagen"
        >
          <ImageIcon className="h-4 w-4" />
        </Btn>
      </div>
      <div className="p-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
