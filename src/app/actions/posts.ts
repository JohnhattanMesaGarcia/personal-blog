"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("No autorizado");
  }

  const title = formData.get("title") as string;
  let slug = (formData.get("slug") as string)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  let imageUrl = formData.get("imageUrl") as string | null;
  const published = formData.get("published") === "on";

  const imageFile = formData.get("imageFile") as File | null;
  
  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const blob = await put(fileName, imageFile, { access: 'public' });
    imageUrl = blob.url;
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      imageUrl: imageUrl || null,
      published,
      // @ts-ignore
      authorId: session.user.id,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updatePost(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("No autorizado");
  }

  const title = formData.get("title") as string;
  let slug = (formData.get("slug") as string)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  let imageUrl = formData.get("imageUrl") as string | null;
  const published = formData.get("published") === "on";

  const imageFile = formData.get("imageFile") as File | null;
  
  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const blob = await put(fileName, imageFile, { access: 'public' });
    imageUrl = blob.url;
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      excerpt,
      imageUrl: imageUrl || null,
      published,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deletePost(id: string) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("No autorizado");
  }

  await prisma.post.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}
