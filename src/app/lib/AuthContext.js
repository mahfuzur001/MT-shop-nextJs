"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTokens = localStorage.getItem("tokens");
    if (storedUser && storedTokens) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("tokens");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/users/login/", {
      username: username.trim(),
      password,
    });
    const tokens = { access: res.data.access, refresh: res.data.refresh };
    localStorage.setItem("tokens", JSON.stringify(tokens));

    // Fetch user profile
    const profileRes = await api.get("/users/profile/");
    const userData = profileRes.data;
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  const register = async (username, email, password, password2) => {
    const res = await api.post("/users/register/", {
      username: username.trim(),
      email: email.trim(),
      password,
      password2,
    });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
