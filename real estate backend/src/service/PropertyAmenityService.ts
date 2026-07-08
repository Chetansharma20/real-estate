import * as PropertyAmenityRepository from "../repositories/PropertyAmenityRepository";
import * as PropertyRepository from "../repositories/PropertyRepository";
import * as AmenityRepository from "../repositories/AmenityRepository";
import { ApiError } from "../utils/ApiError";

/**
 * Get all amenities linked to a property
 */
export const getPropertyAmenities = async (propertyId: string) => {
  const property = await PropertyRepository.findById(propertyId);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  return PropertyAmenityRepository.findByPropertyId(propertyId);
};

/**
 * Link an amenity to a property
 */
export const linkAmenity = async (propertyId: string, amenityId: string) => {
  const property = await PropertyRepository.findById(propertyId);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const amenity = await AmenityRepository.findById(amenityId);
  if (!amenity) {
    throw new ApiError(404, "Amenity not found");
  }

  // Check if already linked
  const existing = await PropertyAmenityRepository.findByPropertyId(propertyId);
  const alreadyLinked = existing.some((pa) => pa.amenityId === amenityId);
  if (alreadyLinked) {
    throw new ApiError(400, "Amenity is already linked to this property");
  }

  return PropertyAmenityRepository.link(propertyId, amenityId);
};

/**
 * Unlink an amenity from a property
 */
export const unlinkAmenity = async (propertyId: string, amenityId: string) => {
  const existing = await PropertyAmenityRepository.findByPropertyId(propertyId);
  const isLinked = existing.some((pa) => pa.amenityId === amenityId);

  if (!isLinked) {
    throw new ApiError(404, "Amenity is not linked to this property");
  }

  return PropertyAmenityRepository.unlink(propertyId, amenityId);
};
