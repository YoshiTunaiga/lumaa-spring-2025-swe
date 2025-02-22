import React, { useState, useEffect, useCallback } from "react";
import { Task } from "../types";
import { api } from "../api";
import { auth } from "../utils/auth";

interface TaskListProps {
  isAuthenticated: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ isAuthenticated }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const token = auth.getToken();
      if (!token) {
        throw new Error("Token is null");
      }
      const tasks = (await api.getTasks(token)) || [];
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated, fetchTasks]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = auth.getToken();
      if (!token) {
        throw new Error("Token is null");
      }
      await api.createTask(token, newTask.title, newTask.description);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      const token = auth.getToken();
      if (!token) {
        throw new Error("Token is null");
      }
      await api.updateTask(token, task.id, task);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const token = auth.getToken();
      if (!token) {
        throw new Error("Token is null");
      }
      await api.deleteTask(token, taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: "20px",
      }}>
      <h2>Tasks</h2>

      <form
        onSubmit={handleCreateTask}
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button type="submit">Add Task</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <h3>Task List</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
          }}>
          {tasks.length
            ? tasks.map((task) => (
                <div
                  key={task.id}
                  style={{ border: "1px solid black", padding: "10px" }}>
                  {editingTask?.id === task.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editingTask.description}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            description: e.target.value,
                          })
                        }
                      />
                      <button onClick={() => handleUpdateTask(editingTask)}>
                        Save
                      </button>
                      <button onClick={() => setEditingTask(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => setEditingTask(task)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)}>
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateTask({
                              ...task,
                              is_complete: !task.is_complete || true,
                            })
                          }>
                          {task.is_complete ? "Completed" : "Pending"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
