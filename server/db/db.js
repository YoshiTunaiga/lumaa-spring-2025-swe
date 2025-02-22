import pkg from "pg";
import dotenv from "dotenv"; // Load environment variables from .env file
dotenv.config({ path: "./.env.local" });

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env; // Destructure environment variables

// Database connection
const db = new pkg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Test the connection
export const connectDB = async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ PostgreSQL Connected!");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  }
};

export default db;
