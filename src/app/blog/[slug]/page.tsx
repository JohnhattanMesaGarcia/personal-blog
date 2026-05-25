import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Para el metadata dinámico (SEO)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await prisma.post.findUnique({
    where: { slug: decodeURIComponent(resolvedParams.slug) }
  });

  if (!post) {
    return { title: "Post no encontrado" };
  }

  return {
    title: `${post.title} | <JonaScript_ />`,
    description: post.excerpt || `Lee sobre ${post.title}`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);

  const post = await prisma.post.findUnique({
    where: { slug: decodeURIComponent(resolvedParams.slug) },
    include: { author: true }
  });

  // Si no existe, o si no está publicado Y el visitante no es el admin, tiramos error 404
  if (!post || (!post.published && !session?.user)) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full relative">
      <article className="prose prose-lg text-black flex-1">
        {/* Etiqueta de borrador flotante si el admin está viendo algo no publicado */}
        {!post.published && (
          <div className="bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-widest px-4 py-2 mb-8 inline-block">
            Modo Vista Previa (Borrador)
          </div>
        )}
        <header className="mb-12 border-b border-gray-200 pb-8 mt-4 text-center">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-6 inline-block">
            &larr; Volver al Diario
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="text-sm uppercase tracking-widest text-gray-500 flex flex-col items-center gap-2">
            <time dateTime={post.createdAt.toISOString()}>
              {post.createdAt.toLocaleDateString("es-ES", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        {post.imageUrl && (
          <div className="mb-12 relative w-full h-[400px]">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover rounded-sm grayscale"
              priority
            />
          </div>
        )}

        {/* Contenido principal */}
        <div className="text-lg leading-relaxed space-y-6 lg:px-4 whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      <Sidebar />
    </div>
  );
}
