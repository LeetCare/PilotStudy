import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
}

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
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

