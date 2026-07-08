import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

/**
 * Fetch all amenities sorted by name
 */
export const findAll = async () => {
  return prisma.amenity.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

/**
 * Find an amenity by ID
 */
export const findById = async (id: string) => {
  return prisma.amenity.findUnique({
    where: { id },
  });
};

/**
 * Create a new amenity
 */
export const create = async (data: Prisma.AmenityCreateInput) => {
  return prisma.amenity.create({
    data,
  });
};

/**
 * Delete an amenity by ID
 */
export const deleteAmenity = async (id: string) => {
  return prisma.amenity.delete({
    where: { id },
  });
};
