import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Sidebar() {
  const recentPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-8 lg:pl-8 border-t lg:border-t-0 pt-8 lg:pt-0 lg:border-l border-gray-200">
      {/* Widget Sobre mí */}
      <div className="p-6 mb-8 rounded-2xl bg-[#fafafa] shadow-[6px_6px_10px_#e6e6e6,-6px_-6px_10px_#ffffff] border border-white">
        <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-center text-gray-600">El Autor</h3>
        <p className="text-sm text-gray-500 leading-relaxed text-center">
          Bienvenido a mi espacio. Escribo historias y reflexiones en monospaced para enfocarme en los conceptos, sin distracciones visuales.
        </p>
        <div className="flex justify-center mt-6">
          <Link href="/about" className="text-gray-500 hover:text-black px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all inline-block rounded-xl bg-[#fafafa] shadow-[4px_4px_8px_#e6e6e6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#e6e6e6,inset_-4px_-4px_8px_#ffffff]">
            LEER MÁS
          </Link>
        </div>
      </div>

      {/* Widget Entradas Recientes */}
      <div className="p-6 mb-8 rounded-2xl bg-[#fafafa] shadow-[6px_6px_10px_#e6e6e6,-6px_-6px_10px_#ffffff] border border-white">
        <h3 className="font-bold text-sm mb-5 uppercase tracking-widest text-center text-gray-600">Recientes</h3>
        <ul className="flex flex-col gap-6">
          {recentPosts.map((post) => (
            <li key={post.id} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <h4 className="font-bold text-gray-700 group-hover:text-black transition-colors text-sm leading-snug mb-2">
                  {post.title}
                </h4>
                <time className="text-xs text-gray-400 block uppercase tracking-widest">
                  {post.createdAt.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Widget Buscar */}
      <div className="p-6 flex flex-col items-center mt-8 lg:mt-0 rounded-2xl bg-[#fafafa] shadow-[6px_6px_10px_#e6e6e6,-6px_-6px_10px_#ffffff] border border-white">
        <h3 className="font-bold text-sm mb-2 uppercase tracking-widest text-center text-gray-600 border-none">Buscador</h3>
        <p className="text-xs text-gray-400 mb-4 text-center">Encuentra reflexiones pasadas.</p>
        <Link href="/search" className="text-gray-500 hover:text-black px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all w-full text-center rounded-xl bg-[#fafafa] shadow-[4px_4px_8px_#e6e6e6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#e6e6e6,inset_-4px_-4px_8px_#ffffff]">
          Ir al buscador
        </Link>
      </div>
    </aside>
  );
}
