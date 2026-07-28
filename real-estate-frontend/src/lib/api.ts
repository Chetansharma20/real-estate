import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Crucial for sending/receiving the HTTP-only cookie
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 second timeout — never wait forever if backend is down
});

// Redirect to /login if API returns 401 Unauthorized (session expired or invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const getMediaUrl = (url: string) => {
  if (!url) return "";
  
  // If the url is already a remote URL (not localhost), return as is
  if (url.startsWith("http") && !url.includes("localhost:5000") && !url.includes("127.0.0.1:5000")) {
    return url;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const base = apiBaseUrl.replace(/\/api\/?$/, ""); // Remove "/api"
  
  if (url.includes("/uploads/")) {
    const parts = url.split("/uploads/");
    return `${base}/uploads/${parts[1]}`;
  }
  
  return url;
};
