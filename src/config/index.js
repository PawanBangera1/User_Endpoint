import mongoose from "mongoose";
impo

const MONGO_URI =
  process.env.MONGO_URI || "";

async function connectDB() {
  await mongoose.connect(MONGO_URI);
}

export default connectDB;
