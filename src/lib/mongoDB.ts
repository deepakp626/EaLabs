import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.NODE_ENV === "development" ? (process.env.MONGO_URI_DEVELOPMENT as string) : (process.env.MONGO_URI_PRODUCTION as string);

// console.log("MONGODB_URI", MONGODB_URI);
// console.log("MONGO_URI_DEVELOPMENT", process.env.MONGO_URI_DEVELOPMENT);
// console.log("MONGO_URI_PRODUCTION", process.env.MONGO_URI_PRODUCTION);


if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Global variable to cache the connection
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn; // <-- If already connected, skip creating again
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connection successful!');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      throw error;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export default dbConnect;