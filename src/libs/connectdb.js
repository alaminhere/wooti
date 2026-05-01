import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local',
  );
}

let cached = global.mongooseConn;
if (!cached) {
  cached = global.mongooseConn = { connection: null, promise: null };
}

const connectdb = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }

  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.connection = null;
    throw e;
  }
  return cached.connection;
};

export default connectdb;
