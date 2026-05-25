import { prisma } from "@/lib/prisma";
import EditPostForm from "@/components/admin/EditPostForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.post.findUnique({
    where: { id: resolvedParams.id }
  });
  
  if (!post) {
    notFound();
  }
  
  return <EditPostForm post={post} />;
}
