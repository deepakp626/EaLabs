import dbConnect from "./mongoDB";

dbConnect()
  .then(() => console.log("✅ MongoDB connected at startup"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
