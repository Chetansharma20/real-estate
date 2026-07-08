import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Crucial for sending/receiving the HTTP-only cookie
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 second timeout — never wait forever if backend is down
});
