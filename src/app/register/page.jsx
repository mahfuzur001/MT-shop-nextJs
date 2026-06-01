"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../lib/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const getErrorMessage = (err) => {
    const data = err.response?.data;
    if (!data) {
      return "Could not connect to the server. Please check that the backend is running.";
    }
    if (typeof data === "string") return data;

    return Object.entries(data)
      .map(([field, errors]) => {
        const message = Array.isArray(errors) ? errors.join(" ") : errors;
        return `${field}: ${message}`;
      })
      .join(" | ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const cleanUsername = username.trim();
    const cleanEmail = email.trim();

    if (!cleanUsername || !cleanEmail) {
      setError("Username and email are required.");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register(cleanUsername, cleanEmail, password, password2);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center page-container py-12 md:py-16 overflow-hidden">
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-[450px] glass-card p-8 md:p-10 shadow-2xl relative animate-fadeInUp">
        <div className="absolute top-4 right-4 text-xs font-mono text-slate-600">
          SECURE_AUTH
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Get Started
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Create your new MT Shop account
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
            Warning: {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            Registration successful. Redirecting to login page...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              placeholder="johndoe"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-glass"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="Use at least 8 characters"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass"
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Repeat your password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="input-glass"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full btn-primary py-4 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
