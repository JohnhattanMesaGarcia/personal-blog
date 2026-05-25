// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import path from "path";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Garantizamos que Next.js Turbopack siempre encuentre el archivo local
// independientemente de donde lance el servidor.
const dbPath = path.join(process.cwd(), "prisma", "dev.db").replace(/\\/g, "/");

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasourceUrl: `file:${dbPath}`
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
