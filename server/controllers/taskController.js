import db from "../db/db.js";

export const getTasks = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks WHERE user_id = $1", [
      req.user.id,
    ]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, is_complete } = req.body;

  try {
    const result = await db.query(
      "UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, description, is_complete, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
