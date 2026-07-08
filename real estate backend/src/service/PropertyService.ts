import * as PropertyRepository from "../repositories/PropertyRepository";
import { ApiError } from "../utils/ApiError";
import { Prisma } from "@prisma/client";

/**
 * Create a new property with associated images and amenities
 */
export const createProperty = async (
  data: Omit<Prisma.PropertyCreateInput, "images" | "amenities">,
  images?: string[],
  amenityIds?: string[]
) => {
  const createData: Prisma.PropertyCreateInput = {
    ...data,
    images: images && images.length > 0 ? {
      create: images.map((url, index) => ({ url, order: index }))
    } : undefined,
    amenities: amenityIds && amenityIds.length > 0 ? {
      create: amenityIds.map((id) => ({
        amenity: { connect: { id } }
      }))
    } : undefined
  };

  return PropertyRepository.create(createData);
};

/**
 * Fetch a single property details
 */
export const getPropertyById = async (id: string) => {
  const property = await PropertyRepository.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }
  return property;
};

/**
 * Fetch all properties with optional filtering and pagination
 */
export const getAllProperties = async (filters: any, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const take = limit;

  const whereClause: Prisma.PropertyWhereInput = {};

  if (filters.type) {
    if (typeof filters.type === "string" && filters.type.includes(",")) {
      const typeArr = filters.type.split(",") as any[];
      whereClause.type = { in: typeArr };
    } else {
      whereClause.type = filters.type;
    }
  }
  if (filters.priceType) whereClause.priceType = filters.priceType;
  if (filters.city) whereClause.city = { contains: filters.city, mode: "insensitive" };
  if (filters.status) whereClause.status = filters.status;
  if (filters.isFeatured !== undefined) whereClause.isFeatured = filters.isFeatured === "true" || filters.isFeatured === true;
  if (filters.bhk) {
    const bhkStr = String(filters.bhk);
    if (bhkStr.includes(",")) {
      whereClause.bhk = { in: bhkStr.split(",").map((x) => parseInt(x)) };
    } else {
      whereClause.bhk = parseInt(bhkStr);
    }
  }
  if (filters.maxPrice) {
    whereClause.basePrice = { lte: parseFloat(filters.maxPrice) };
  }

  const [properties, totalItems] = await Promise.all([
    PropertyRepository.findMany(whereClause, { skip, take, orderBy: { createdAt: "desc" } }),
    PropertyRepository.count(whereClause),
  ]);

  return {
    properties,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      limit,
    }
  };
};

/**
 * Update a property's details, including updating associated images and amenities
 */
export const updateProperty = async (
  id: string,
  updateData: Omit<Prisma.PropertyUpdateInput, "images" | "amenities">,
  images?: string[],
  amenityIds?: string[]
) => {
  const property = await PropertyRepository.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const dataToUpdate: Prisma.PropertyUpdateInput = {
    ...updateData,
  };

  if (images !== undefined) {
    dataToUpdate.images = {
      deleteMany: {},
      create: images.map((url, index) => ({ url, order: index }))
    };
  }

  if (amenityIds !== undefined) {
    dataToUpdate.amenities = {
      deleteMany: {},
      create: amenityIds.map((id) => ({
        amenity: { connect: { id } }
      }))
    };
  }

  return PropertyRepository.update(id, dataToUpdate);
};

/**
 * Delete a property
 */
export const deleteProperty = async (id: string) => {
  const property = await PropertyRepository.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }
  return PropertyRepository.deleteProperty(id);
};
