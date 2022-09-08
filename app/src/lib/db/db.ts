import { PrismaClient } from "@prisma/client";

declare global {
  var __globalDb: PrismaClient | undefined
}

const db = global.__globalDb || new PrismaClient()
if(process.env.NODE_ENV !== 'production') global.__globalDb = db

export {db};