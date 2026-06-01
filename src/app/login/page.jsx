"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../lib/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const getErrorMessage = (err) => {
    const data = err.response?.data;
    if (!data) {
      return "Could not connect to the server. Please check that the backend is running.";
    }
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;
    if (Array.isArray(data.non_field_errors)) return data.non_field_errors[0];

    return "Invalid username or password. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username.trim(), password);
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center page-container py-12 md:py-16 overflow-hidden">
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-[450px] glass-card px-8 py-10 md:px-10 md:py-12 shadow-2xl relative">
        <div className="absolute top-4 right-4 text-xs font-mono text-slate-600">
          SECURE_AUTH
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Sign in to your MT Shop account
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium">
            Warning: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-glass w-full"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass w-full"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center text-sm text-slate-400">
          New to MT Shop?{" "}
          <Link
            href="/register"
            className="text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-4"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
