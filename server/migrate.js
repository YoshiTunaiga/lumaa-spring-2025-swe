import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import db from "./db/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  try {
    const migrationPath = path.join(
      __dirname,
      "../server/migrations/create_taskmanager.sql"
    );
    const sql = fs.readFileSync(migrationPath, "utf8");

    console.log("Running migration...");
    await db.query(sql);
    console.log("Migration successful ✅");
  } catch (err) {
    console.error("Migration failed ❌", err);
  } finally {
    db.end();
  }
}

runMigration();
