import mongoose from "mongoose";

export async function ConnectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("connected TO Database");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}
