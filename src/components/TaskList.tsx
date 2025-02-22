import React, { useState, useEffect, useCallback } from "react";
import { Task } from "../types";
import { api } from "../api";
import { auth } from "../utils/auth";

interface TaskListProps {
  isAuthenticated: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ isAuthenticated }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: "20px",
      }}>
      <h2>Tasks</h2>

      <div style={{ marginTop: "20px" }}>
        <h3>Task List</h3>
      </div>
    </div>
  );
};
