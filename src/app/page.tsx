import { prisma } from "@/lib/prisma";
import PostCard from "@/components/blog/PostCard";
import Sidebar from "@/components/layout/Sidebar";

export default async function Home() {
  // Fetch only published posts, ordered by newest first
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full">
      <div className="flex-1">
        <section className="mb-12">
          <p className="text-lg italic text-gray-700 border-l-4 border-black pl-4 my-8">
            "Un diario personal, reflexiones y anotaciones sobre el mundo."
          </p>
        </section>

        <section>
          <h2 className="text-xl text-black uppercase tracking-widest font-bold mb-8 pb-2 border-b border-gray-200">
            Últimas Historias
          </h2>

          {posts.length > 0 ? (
            <div className="flex flex-col">
              {posts.map((post: any) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  createdAt={post.createdAt}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p>Todavía no hay historias publicadas.</p>
              <p className="text-sm mt-2">Vuelve pronto para leer nuevas reflexiones.</p>
            </div>
          )}
        </section>
      </div>

      <Sidebar />
    </div>
  );
}
