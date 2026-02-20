// src/lib/db.ts
import { PrismaClient } from "@prisma/client"

// avoid multiple prisma instances in dev
// hot reload otherwise creates many connections

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
    log: ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}