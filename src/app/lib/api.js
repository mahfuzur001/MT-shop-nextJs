"use client";
import axios from "axios";

function getApiBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    const localHosts = ["localhost", "127.0.0.1", "::1"];

    if (!localHosts.includes(hostname)) {
      return `http://${hostname}:8000`;
    }
  }

  return "http://127.0.0.1:8000";
}

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const PUBLIC_GET_PATHS = [
  "/api/products/",
  "/api/reviews/",
];

function isPublicGetRequest(config) {
  const method = (config?.method || "get").toLowerCase();
  const url = config?.url || "";

  return (
    method === "get" &&
    PUBLIC_GET_PATHS.some((path) => url === path || url.startsWith(path))
  );
}

function clearStoredAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("tokens");
  localStorage.removeItem("user");
}

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const tokens = localStorage.getItem("tokens");
      if (tokens) {
        try {
          const { access } = JSON.parse(tokens);
          if (access) {
            config.headers.Authorization = `Bearer ${access}`;
          }
        } catch {
          clearStoredAuth();
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const isInvalidToken =
      error.response?.status === 401 ||
      (error.response?.status === 403 &&
        error.response?.data?.code === "token_not_valid");

    if (isInvalidToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
        if (tokens.refresh) {
          const res = await axios.post(`${API_BASE_URL}/users/token/refresh/`, {
            refresh: tokens.refresh,
          });

          const newTokens = {
            access: res.data.access,
            refresh: tokens.refresh,
          };
          localStorage.setItem("tokens", JSON.stringify(newTokens));

          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        clearStoredAuth();
        if (isPublicGetRequest(originalRequest)) {
          delete originalRequest.headers?.Authorization;
          return api(originalRequest);
        }
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }

      clearStoredAuth();
      if (isPublicGetRequest(originalRequest)) {
        delete originalRequest.headers?.Authorization;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
