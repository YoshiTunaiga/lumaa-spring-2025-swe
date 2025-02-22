export const TOKEN_KEY = "task_app_token";

export const auth = {
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  },
};
