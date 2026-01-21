import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    role: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    // Initialize from localStorage on mount
    const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    // Parse user if it's a JSON string
    if (user) {
      try {
        user = JSON.parse(user);
      } catch {
        // If not JSON, keep as string
      }
    }

    if (token) {
      setAuth({
        token,
        user,
        role,
        isAuthenticated: true,
        loading: false,
      });
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = (token, user, role) => {
    localStorage.setItem("token", token);
    // Store user as JSON if it's an object, otherwise as string
    const userToStore = typeof user === "object" ? JSON.stringify(user) : user;
    localStorage.setItem("user", userToStore);
    localStorage.setItem("role", role);
    setAuth({ token, user, role, isAuthenticated: true, loading: false });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({
      token: null,
      user: null,
      role: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
