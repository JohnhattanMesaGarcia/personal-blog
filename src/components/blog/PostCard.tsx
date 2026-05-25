import Link from "next/link";

interface PostCardProps {
  id: string;
  title: string;
  excerpt?: string | null;
  slug: string;
  createdAt: Date;
}

export default function PostCard({ id, title, excerpt, slug, createdAt }: PostCardProps) {
  return (
    <article className="border-2 border-transparent border-b-gray-200 py-8 mb-4 hover:border-black hover:bg-gray-200 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all px-6 -mx-6">
      <Link href={`/blog/${slug}`} className="block group">
        <h2 className="text-2xl font-bold text-black mb-2 group-hover:underline transition-all">
          {title}
        </h2>
        <span className="text-xs text-gray-500 uppercase tracking-widest mb-4 block">
          {new Date(createdAt).toLocaleDateString("es-ES", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
        <p className="text-gray-800 leading-relaxed">
          {excerpt}
        </p>
      </Link>
    </article>
  );
}
