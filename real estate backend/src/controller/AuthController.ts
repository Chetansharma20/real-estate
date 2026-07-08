import { Request, Response } from "express";
import * as authService from "../service/AuthService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomRequest } from "../middleware/auth.middleware";
import { ApiError } from "../utils/ApiError";

/**
 * Handle user login, setting token inside cookie
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { user, token } = await authService.login(email, password);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(200, { user, token }, "Login successful")
    );
});

/**
 * Handle user logout, clearing token cookie
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };

  res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

/**
 * Handle updating profile details of user
 */
export const updateProfile = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  const { name, email, phone, password } = req.body;

  const updatedUser = await authService.updateProfile(userId, {
    name,
    email,
    phone,
    password,
  });

  res.status(200).json(
    new ApiResponse(200, updatedUser, "Profile updated successfully")
  );
});
