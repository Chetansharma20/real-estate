import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./config/prisma";
import authRoutes from "./routes/auth.routes";
import propertyRoutes from "./routes/property.routes";
import amenityRoutes from "./routes/amenity.routes";
import adminRoutes from "./routes/admin.routes";
import leadRoutes from "./routes/lead.routes";
import blogRoutes from "./routes/blog.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

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
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Real Estate API is running 🚀",
  });
});

// Global error handler — must be registered last
app.use(errorHandler);

export default app;