import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("MongoDB connected from config"));
  await mongoose.connect(`${process.env.MONGODB_URI}/pictura-ai`);
};

export default connectDB;
