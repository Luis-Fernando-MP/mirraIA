import { DB_URL } from '@/shared/lib/constants'
import mongoose, { Mongoose } from 'mongoose'

interface IConnection {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

let cached: IConnection = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null
  }
}

const db = async () => {
  if (cached.conn) return cached.conn
  if (!DB_URL) throw new Error('Missing db url')

  cached.promise ??= mongoose.connect(DB_URL, {
    dbName: 'ju-images',
    bufferCommands: false
  })

  cached.conn = await cached.promise
  return cached.conn
}

export default db
