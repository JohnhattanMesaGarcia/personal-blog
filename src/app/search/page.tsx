import { prisma } from "@/lib/prisma";
import PostCard from "@/components/blog/PostCard";
import SearchBar from "@/components/blog/SearchBar";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query } },
        { content: { contains: query } },
        { excerpt: { contains: query } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <header className="mb-12 border-b border-gray-200 pb-8 mt-4">
        <h1 className="text-4xl md:text-4xl font-playfair font-bold text-black mb-6">
          Buscar en el Diario
        </h1>
        <SearchBar defaultValue={query} />
      </header>

      {query && (
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-8">
          Resultados para: <span className="text-black font-bold">"{query}"</span> ({posts.length})
        </p>
      )}

      {posts.length > 0 ? (
        <div className="flex flex-col">
          {posts.map((post) => (
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
          <p>No se encontraron historias que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}
