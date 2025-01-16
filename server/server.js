import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

// Configure dotenv at the start
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
await connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Health check route
app.get("/", (req, res) => res.send("Api Working"));

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

console.log("RazorPay secret key: " + process.env.RAZORPAY_SECRET_KEY_ID);
