import { config } from "dotenv";
import mongoose from "mongoose";
config()
mongoose.set("strictQuery", false);

const mongoDb = process.env.MONGODB;


export async function dbConnect() {
  await mongoose.connect(mongoDb);
}
