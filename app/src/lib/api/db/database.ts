// /lib/dbConnect.js
import mongoose, { Connection } from 'mongoose'

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

type CacheType = {
  connection: Connection | null,
  promise: Promise<any> | null
}

// TODO: figure out how to type global.db and remove @ts-ignores 
//@ts-ignore
let cached: CacheType = global.db

if (!cached) {
  //@ts-ignore
  cached = global.db = { connection: null, promise: null }
}

// TODO: type this
export async function dbConnect() {
  // use cached connection if available
  if (cached.connection) {
    return cached.connection
  }

  // create new connection
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // disable mongoose buffering
      maxIdleTimeMS: 10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 20000
    }
    console.log('connect to mongoose')
    cached.promise = mongoose.connect(process.env.DB_URI!, opts).then(mongoose => {
      return mongoose
    })
  }

  // cache and return
  cached.connection = await cached.promise
  console.log('connected!')
  return cached.connection
}
