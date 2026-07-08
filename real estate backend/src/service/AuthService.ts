import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as UserRepository from "../repositories/UserRepository";
import { ApiError } from "../utils/ApiError";

/**
 * Log in a user using email and password
 */
export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user by email
  const user = await UserRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Your account has been blocked");
  }

  if (!user.password) {
    throw new ApiError(400, "Password not set for this account");
  }

  // Check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET || "default_secret",
    {
      expiresIn: "7d",
    }
  );

  // Exclude password from the returned user object
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

/**
 * Update profile/details of a user
 */
export const updateProfile = async (
  userId: string,
  updateData: { name?: string; email?: string; phone?: string; password?: string }
) => {
  const user = await UserRepository.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const dataToUpdate: any = {};
  if (updateData.name !== undefined) dataToUpdate.name = updateData.name;

  if (updateData.email !== undefined) {
    if (updateData.email !== user.email) {
      const existingEmail = await UserRepository.findByEmail(updateData.email);
      if (existingEmail) {
        throw new ApiError(400, "Email is already in use");
      }
    }
    dataToUpdate.email = updateData.email;
  }

  if (updateData.phone !== undefined) {
    if (updateData.phone !== user.phone) {
      const existingPhone = await UserRepository.findByPhone(updateData.phone);
      if (existingPhone) {
        throw new ApiError(400, "Phone number is already in use");
      }
    }
    dataToUpdate.phone = updateData.phone;
  }

  if (updateData.password) {
    dataToUpdate.password = await bcrypt.hash(updateData.password, 10);
  }

  const updatedUser = await UserRepository.update(userId, dataToUpdate);

  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};
