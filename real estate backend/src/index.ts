import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { prisma } from "./config/prisma";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ PostgreSQL Connected");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    const gracefulShutdown = async (signal: string) => {
      console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
      server.close(async () => {
        console.log("HTTP server closed.");
        try {
          await prisma.$disconnect();
          console.log("Prisma Client disconnected.");
          process.exit(0);
        } catch (err) {
          console.error("Error disconnecting Prisma Client:", err);
          process.exit(1);
        }
      });

      // Force close after 5s timeout
      setTimeout(() => {
        console.error("Graceful shutdown timed out, forcefully shutting down");
        process.exit(1);
      }, 5000);
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

startServer();