import mongoose from "mongoose";

export const connectMongoose = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB CONNECTED`);
    return;
  } catch (error) {
    console.error(`DB CONNECTION ERROR: ${error.message}`);
    // 4. Kill the process if the DB is missing
    process.exit(1);
  }
};
