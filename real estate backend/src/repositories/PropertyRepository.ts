import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

/**
 * Find a property by ID including its images and amenities
 */
export const findById = async (id: string) => {
  return prisma.property.findUnique({
    where: { id },
    include: {
      images: true,
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });
};

/**
 * Find multiple properties matching a criteria
 */
export const findMany = async (
  whereClause?: Prisma.PropertyWhereInput,
  options?: { skip?: number; take?: number; orderBy?: Prisma.PropertyOrderByWithRelationInput }
) => {
  return prisma.property.findMany({
    where: whereClause,
    include: {
      images: true,
    },
    ...options,
  });
};

/**
 * Count properties matching a criteria
 */
export const count = async (whereClause?: Prisma.PropertyWhereInput) => {
  return prisma.property.count({
    where: whereClause,
  });
};

/**
 * Create a new property
 */
export const create = async (data: Prisma.PropertyCreateInput) => {
  return prisma.property.create({
    data,
  });
};

/**
 * Update an existing property
 */
export const update = async (id: string, data: Prisma.PropertyUpdateInput) => {
  return prisma.property.update({
    where: { id },
    data,
  });
};

/**
 * Delete a property
 */
export const deleteProperty = async (id: string) => {
  return prisma.property.delete({
    where: { id },
  });
};
