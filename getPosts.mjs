import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasourceUrl: 'file:./dev.db' });
async function run() {
  const posts = await prisma.post.findMany();
  console.log("POSTS IN DB:");
  posts.forEach(p => console.log(`ID: ${p.id} | Slug: "${p.slug}" | Title: "${p.title}" | Published: ${p.published}`));
}
run().finally(() => prisma.$disconnect());
