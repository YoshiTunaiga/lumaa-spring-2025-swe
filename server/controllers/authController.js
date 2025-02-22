import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/db.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

const createUser = async (username, hashedPassword) => {
  const result = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    [username, hashedPassword]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser)
      return res.status(400).json({ error: "Username already registered" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await createUser(username, hashedPassword);
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(201).json({ message: "User created", user: newUser, token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
