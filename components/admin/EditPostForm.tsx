"use client";

import { updatePost } from "@/app/actions/posts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";

export default function EditPostForm({ post }: { post: any }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(post.imageUrl || null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (file) {
      formData.set("imageFile", file);
    }
    await updatePost(post.id, formData);
    router.push("/admin");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-black underline">&larr; Volver al Panel</Link>
        <h2 className="text-2xl font-bold text-black mt-4 border-b pb-2">Editar Entrada</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-black">Título</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={post.title}
            required
            className="w-full border border-gray-300 p-3 text-black focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-black">Slug (URL)</label>
          <input 
            type="text" 
            name="slug" 
            defaultValue={post.slug}
            required
            className="w-full border border-gray-300 p-3 text-black focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-black">Extracto (Resumen)</label>
          <textarea 
            name="excerpt" 
            defaultValue={post.excerpt}
            rows={2}
            className="w-full border border-gray-300 p-3 text-black focus:outline-none focus:border-black transition-colors"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-black">Imagen Principal</label>
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
              isDragOver ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {preview ? (
              <div className="relative w-full h-48">
                <Image src={preview} alt="Preview" fill className="object-contain" unoptimized />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <span className="text-4xl">📸</span>
                <p className="text-sm text-gray-600 font-bold">Resube la imagen para reemplazarla o haz clic</p>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center uppercase tracking-widest">— O ajusta la URL externa manualmente (Opcional) —</p>
          <input 
            type="url" 
            name="imageUrl" 
            defaultValue={post.imageUrl || ""}
            className="w-full border border-gray-300 p-3 text-black focus:outline-none focus:border-black transition-colors mt-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-black">Contenido Principal</label>
          <textarea 
            name="content" 
            defaultValue={post.content}
            rows={10}
            required
            className="w-full border border-gray-300 p-3 text-black focus:outline-none focus:border-black transition-colors font-mono text-sm"
          ></textarea>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" name="published" defaultChecked={post.published} id="published" className="w-4 h-4 cursor-pointer" />
          <label htmlFor="published" className="text-sm font-bold text-black border-none cursor-pointer">Publicado visiblemente</label>
        </div>

        <button 
          type="submit" 
          className="bg-black text-white px-6 py-3 mt-4 hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm font-bold w-full"
        >
          Salvar Cambios
        </button>
      </form>
    </div>
  );
}
