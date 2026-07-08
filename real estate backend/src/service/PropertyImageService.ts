import * as PropertyImageRepository from "../repositories/PropertyImageRepository";
import * as PropertyRepository from "../repositories/PropertyRepository";
import { ApiError } from "../utils/ApiError";
import fs from "fs";
import path from "path";

/**
 * Upload multiple images to a property
 */
export const uploadImages = async (propertyId: string, files: Express.Multer.File[]) => {
  const property = await PropertyRepository.findById(propertyId);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (!files || files.length === 0) {
    throw new ApiError(400, "No image files provided");
  }

  // Get current image count to continue ordering
  const existingImages = await PropertyImageRepository.findByPropertyId(propertyId);
  const startOrder = existingImages.length;

  const imagePromises = files.map((file, index) =>
    PropertyImageRepository.create({
      url: `/uploads/${file.filename}`,
      order: startOrder + index,
      property: { connect: { id: propertyId } },
    })
  );

  return Promise.all(imagePromises);
};

/**
 * Delete a specific image from a property
 */
export const deleteImage = async (propertyId: string, imageId: string) => {
  const image = await PropertyImageRepository.findById(imageId);

  if (!image) {
    throw new ApiError(404, "Image not found");
  }

  if (image.propertyId !== propertyId) {
    throw new ApiError(403, "Image does not belong to this property");
  }

  // Delete physical file from disk
  const filePath = path.join(process.cwd(), image.url);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return PropertyImageRepository.deleteImage(imageId);
};
