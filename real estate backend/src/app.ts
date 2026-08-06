import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { prisma } from "./config/prisma";
import authRoutes from "./routes/auth.routes";
import townshipRoutes from "./routes/township.routes";
import amenityRoutes from "./routes/amenity.routes";
import adminRoutes from "./routes/admin.routes";
import leadRoutes from "./routes/lead.routes";
import blogRoutes from "./routes/blog.routes";
import projectRoutes from "./routes/project.routes";
import settingsRoutes from "./routes/settings.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Trust reverse proxy (Nginx, Cloudflare, etc.) to get correct client IP for rate limiting.
// Default to 1 (trust first proxy hop) to prevent ERR_ERL_PERMISSIVE_TRUST_PROXY error and IP spoofing.
app.set("trust proxy", process.env.TRUST_PROXY ? (isNaN(Number(process.env.TRUST_PROXY)) ? process.env.TRUST_PROXY : Number(process.env.TRUST_PROXY)) : 1);

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    // Allow any trycloudflare.com subdomain automatically
    if (origin.endsWith(".trycloudflare.com")) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(null, false);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable gzip compression for responses
app.use(compression());

// Global Rate Limiting: 1000 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  }
});

// Spam Prevention Rate Limiting: 5 lead submissions per 1 hour per IP
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many lead submissions from this IP, please try again after an hour"
  }
});

// Apply global rate limiter to all API routes
app.use("/api/", globalLimiter);


app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/townships", townshipRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/townships", townshipRoutes);
app.use("/api/admin/projects", projectRoutes);
app.use("/api/projects", projectRoutes); // public alias
app.use("/api/leads", leadLimiter, leadRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Real Estate API is running 🚀",
  });
});

// Global error handler — must be registered last
app.use(errorHandler);

export default app;