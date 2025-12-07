import dotenv from "dotenv";
import mongoose from "mongoose";
import process from "process";
dotenv.config();

let isConnected = false;

const connectAuthDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection.");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is not defined in environment variables"
    );
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("Connected to authDB successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectAuthDB;
