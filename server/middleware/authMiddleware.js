import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./.env.local" }); // Load environment variables from .env file

const { JWT_SECRET } = process.env;

// Authentication middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Missing Token: Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("JWT Verification Error:", err.message); // Log JWT errors
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
