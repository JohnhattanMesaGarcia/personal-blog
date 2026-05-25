import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deletePost } from "../actions/posts";

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-black font-bold">Entradas Recientes</h2>
        <Link href="/admin/new" className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors">
          + Nueva Entrada
        </Link>
      </div>

      <div className="bg-transparent border text-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b text-black uppercase tracking-widest text-xs">
              <th className="p-3 font-bold">Título</th>
              <th className="p-3 font-bold">Estado</th>
              <th className="p-3 font-bold">Fecha</th>
              <th className="p-3 font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-3 font-bold text-black">{post.title}</td>
                <td className="p-3">
                  {post.published ? (
                    <span className="text-green-600">Publicado</span>
                  ) : (
                    <span className="text-yellow-600">Borrador</span>
                  )}
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <div className="flex gap-4 items-center">
                    <Link href={`/admin/edit/${post.id}`} className="text-blue-500 hover:text-blue-700 underline font-bold">
                      Editar
                    </Link>
                    <form action={deletePost.bind(null, post.id)}>
                      <button type="submit" className="text-red-500 hover:text-red-700 underline font-bold">Eliminar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
