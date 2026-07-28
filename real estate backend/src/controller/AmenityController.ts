import { Request, Response } from "express";
import * as amenityService from "../service/AmenityService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * Fetch all available amenities
 */
export const getAllAmenities = asyncHandler(async (req: Request, res: Response) => {
  const amenities = await amenityService.getAllAmenities();

  res.status(200).json(
    new ApiResponse(200, amenities, "Amenities fetched successfully")
  );
});

/**
 * Create a new amenity
 */
export const createAmenity = asyncHandler(async (req: Request, res: Response) => {
  const { name, category } = req.body;

  const newAmenity = await amenityService.createAmenity(name, category);

  res.status(201).json(
    new ApiResponse(201, newAmenity, "Amenity created successfully")
  );
});

/**
 * Delete an amenity by ID
 */
export const deleteAmenity = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await amenityService.deleteAmenity(id);

  res.status(200).json(
    new ApiResponse(200, {}, "Amenity deleted successfully")
  );
});
