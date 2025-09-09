import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use MONGODB_URL as the environment variable name
console.log('process.env:', process.env);

const DATABASE_URL = process.env.DATABASE_URL;
console.log('MONGODB_URL:', DATABASE_URL);

declare global {
    var mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
}

if (!DATABASE_URL) {
  throw new Error('Please define the MONGODB_URL environment variable');
}

let cached = global.mongoose; // Use global variable for caching

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

//   if (!cached.promise) {
//     const opts = {
//         bufferCommands: false,
//       };

//     cached.promise = mongoose.connect(MONGODB_URI as string, opts)
//       .then((mongoose) => mongoose);
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
}

export default dbConnect;

