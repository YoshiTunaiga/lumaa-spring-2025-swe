import express from "express";
import cors from "cors";
import { connectDB } from "./db/db.js"; // Import the database connection function
import dotenv from "dotenv"; // Load environment variables from .env file
dotenv.config({ path: "./.env.local" });

const { BE_PORT } = process.env; // Destructure environment variables

const app = express();
const port = BE_PORT || 8080;

// Middleware
app.use(cors()); // Allow all origins for development
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for server health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
// app.use("/auth", authRoutes);
// app.use("/tasks", taskRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
