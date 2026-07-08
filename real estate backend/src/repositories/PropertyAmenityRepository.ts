import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

/**
 * Link an amenity to a property
 */
export const link = async (propertyId: string, amenityId: string) => {
  return prisma.propertyAmenity.create({
    data: {
      propertyId,
      amenityId,
    },
  });
};

/**
 * Unlink an amenity from a property
 */
export const unlink = async (propertyId: string, amenityId: string) => {
  return prisma.propertyAmenity.delete({
    where: {
      propertyId_amenityId: {
        propertyId,
        amenityId,
      },
    },
  });
};

/**
 * Find all relations for a specific property ID
 */
export const findByPropertyId = async (propertyId: string) => {
  return prisma.propertyAmenity.findMany({
    where: { propertyId },
    include: {
      amenity: true,
    },
  });
};

/**
 * Find all relations for a specific amenity ID
 */
export const findByAmenityId = async (amenityId: string) => {
  return prisma.propertyAmenity.findMany({
    where: { amenityId },
    include: {
      property: true,
    },
  });
};
