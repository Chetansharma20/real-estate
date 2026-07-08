import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

/**
 * Add a new image to a property
 */
export const create = async (data: Prisma.PropertyImageCreateInput) => {
  return prisma.propertyImage.create({
    data,
  });
};

/**
 * Find a property image by its ID
 */
export const findById = async (id: string) => {
  return prisma.propertyImage.findUnique({
    where: { id },
  });
};

/**
 * Find all images associated with a property ID
 */
export const findByPropertyId = async (propertyId: string) => {
  return prisma.propertyImage.findMany({
    where: { propertyId },
    orderBy: { order: "asc" },
  });
};

/**
 * Delete a property image by its ID
 */
export const deleteImage = async (id: string) => {
  return prisma.propertyImage.delete({
    where: { id },
  });
};

/**
 * Update the order of a specific image
 */
export const updateOrder = async (id: string, order: number) => {
  return prisma.propertyImage.update({
    where: { id },
    data: { order },
  });
};
