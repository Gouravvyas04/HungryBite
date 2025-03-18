import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";  
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import aiRouter from "./routes/aiRoute.js";
import "./models/userModel.js";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/ai", aiRouter); // AI chat functionality
app.use("/images", express.static("uploads"));


// Root Endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server Started at http://localhost:${port}`);
});
