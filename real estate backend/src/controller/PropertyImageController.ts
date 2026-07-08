import { Request, Response } from "express";
import * as propertyImageService from "../service/PropertyImageService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * POST /api/admin/properties/:id/images
 * Upload one or multiple images to a property
 */
export const uploadImages = asyncHandler(async (req: Request, res: Response) => {
  const propertyId = req.params.id as string;
  const files = req.files as Express.Multer.File[];

  const images = await propertyImageService.uploadImages(propertyId, files);

  res.status(201).json(
    new ApiResponse(201, images, "Images uploaded successfully")
  );
});

/**
 * DELETE /api/admin/properties/:id/images/:imageId
 * Remove a specific image from a property
 */
export const deleteImage = asyncHandler(async (req: Request, res: Response) => {
  const propertyId = req.params.id as string;
  const imageId = req.params.imageId as string;

  await propertyImageService.deleteImage(propertyId, imageId);

  res.status(200).json(
    new ApiResponse(200, {}, "Image deleted successfully")
  );
});
