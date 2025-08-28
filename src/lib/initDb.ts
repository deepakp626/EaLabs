// src/lib/initMongo.ts
import dbConnect from "./mongoDB";

(async () => {
  try {
    await dbConnect();
    console.log("✅ MongoDB connected at startup");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
})();

export default dbConnect;