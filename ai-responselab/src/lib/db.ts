import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/*export function getDb() {
   if (!globalThis.prisma) {
    globalThis.prisma = 
    new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
   }   
   if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({ //prisma not want to create func
      log: ["error"],
    });
  }
// Try To Create New Prisma Client to Save if Crash occured in Global  
  return globalThis.prisma; // Accept only this Line
}*/

// file just like a global variable we using all around the project

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
})
export const prismaDb = globalForPrisma.prisma ||
  new PrismaClient(
    { adapter }
  );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaDb;