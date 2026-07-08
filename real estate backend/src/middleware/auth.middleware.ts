import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { CustomRequest } from "../types";

export { CustomRequest };

export const verifyJWT = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as {
      id: string;
      email: string | null;
      phone: string | null;
      role: string;
    };

    req.user = decodedToken;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});
