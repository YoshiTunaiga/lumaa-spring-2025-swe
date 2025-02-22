import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks for the authenticated user
router.get("/", authenticateToken, getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
router.post("/", authenticateToken, createTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put("/:id", authenticateToken, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete("/:id", authenticateToken, deleteTask);

export default router;
