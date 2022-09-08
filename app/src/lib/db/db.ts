import { PrismaClient } from "@prisma/client";

// declare global {
//   var __globalDb: PrismaClient | undefined
// }

// const db = global.__globalDb || new PrismaClient()
// if(process.env.NODE_ENV !== 'production') global.__globalDb = db

let db: PrismaClient = new PrismaClient()

// if (process.env.NODE_ENV === 'production') {
//   db = new PrismaClient()
// } else {
//   if (!global.prisma) {
//     global.__globalDb = new PrismaClient()
//   }
//   db = global.__globalDb
// }

export {db};