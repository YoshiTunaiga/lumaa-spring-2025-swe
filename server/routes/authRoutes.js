import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /auth/register
// @desc    Register/create a new user & get token
router.post("/register", register);

// @route   POST /auth/login
// @desc    Authenticate user & get token
router.post("/login", login);

export default router;
