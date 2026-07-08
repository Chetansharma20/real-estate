import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If it's our custom ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  // Multer file size/type errors
  if (err.name === "MulterError" || err.message?.includes("Only images")) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: err.message,
      errors: [],
    });
  }

  // Prisma known request errors (e.g. unique constraint violation)
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: `Duplicate value for field: ${err.meta?.target}`,
      errors: [],
    });
  }

  // Prisma record not found
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Record not found",
      errors: [],
    });
  }

  // Generic fallback
  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal server error",
    errors: [],
  });
};
