import { Request, Response } from "express";
import * as propertyAmenityService from "../service/PropertyAmenityService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * GET /api/properties/:id/amenities
 * Get all amenities linked to a property
 */
export const getPropertyAmenities = asyncHandler(async (req: Request, res: Response) => {
  const propertyId = req.params.id as string;

  const amenities = await propertyAmenityService.getPropertyAmenities(propertyId);

  res.status(200).json(
    new ApiResponse(200, amenities, "Property amenities fetched successfully")
  );
});

/**
 * POST /api/admin/properties/:id/amenities
 * Link an amenity to a property
 */
export const linkAmenity = asyncHandler(async (req: Request, res: Response) => {
  const propertyId = req.params.id as string;
  const { amenityId } = req.body;

  const result = await propertyAmenityService.linkAmenity(propertyId, amenityId);

  res.status(201).json(
    new ApiResponse(201, result, "Amenity linked to property successfully")
  );
});

/**
 * DELETE /api/admin/properties/:id/amenities/:amenityId
 * Unlink an amenity from a property
 */
export const unlinkAmenity = asyncHandler(async (req: Request, res: Response) => {
  const propertyId = req.params.id as string;
  const amenityId = req.params.amenityId as string;

  await propertyAmenityService.unlinkAmenity(propertyId, amenityId);

  res.status(200).json(
    new ApiResponse(200, {}, "Amenity unlinked from property successfully")
  );
});
