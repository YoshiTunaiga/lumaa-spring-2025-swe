import React, { useState } from "react";
import { Auth } from "./components/Auth";
import { auth } from "./utils/auth";
import "./App.css";
import { TaskList } from "./components/TaskList";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    auth.isAuthenticated()
  );

  const handleLogin = (token: string) => {
    auth.setToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    auth.removeToken();
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        {isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      <main className="app-main">
        {isAuthenticated ? (
          <TaskList isAuthenticated={isAuthenticated} />
        ) : (
          <Auth onAuth={handleLogin} />
        )}
      </main>

      <footer className="app-footer">
        <p>Task Management App © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
