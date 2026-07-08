import * as AmenityRepository from "../repositories/AmenityRepository";
import { ApiError } from "../utils/ApiError";

/**
 * Fetch all available amenities
 */
export const getAllAmenities = async () => {
  return AmenityRepository.findAll();
};

/**
 * Create a new amenity
 */
export const createAmenity = async (name: string) => {
  if (!name) {
    throw new ApiError(400, "Amenity name is required");
  }

  // Check if amenity with the same name already exists
  const amenities = await AmenityRepository.findAll();
  const exists = amenities.some(
    (a) => a.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    throw new ApiError(400, "Amenity already exists");
  }

  return AmenityRepository.create({ name });
};

/**
 * Delete an amenity by ID
 */
export const deleteAmenity = async (id: string) => {
  const amenity = await AmenityRepository.findById(id);
  if (!amenity) {
    throw new ApiError(404, "Amenity not found");
  }

  return AmenityRepository.deleteAmenity(id);
};
