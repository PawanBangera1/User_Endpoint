import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/user_endpoint";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    return mongoose.connection;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

export default connectDB;
