import * as TownshipRepository from "../repositories/TownshipRepository";
import { ApiError } from "../utils/ApiError";
import { Prisma } from "@prisma/client";
import { generateSlug } from "../utils/slugify";
import { prisma } from "../config/prisma";

export const createTownship = async (data: {
  name: string;
  description?: string;
  locality: string;
  city?: string;
  address: string;
  googleMapUrl?: string;
  latitude?: number;
  longitude?: number;
}) => {
  let slug = generateSlug(data.name);

  // Ensure unique slug for township
  let counter = 1;
  while (await prisma.township.findUnique({ where: { slug } })) {
    counter++;
    slug = `${generateSlug(data.name)}-${counter}`;
  }

  const createData: Prisma.TownshipCreateInput = {
    ...data,
    slug,
  };

  return TownshipRepository.create(createData);
};

export const updateTownship = async (
  id: string,
  data: Partial<{
    name: string;
    description: string;
    locality: string;
    city: string;
    address: string;
    googleMapUrl: string;
    latitude: number;
    longitude: number;
  }>
) => {
  const township = await TownshipRepository.findById(id);
  if (!township) {
    throw new ApiError(404, "Township not found");
  }

  return TownshipRepository.update(id, data);
};

export const getTownshipById = async (id: string) => {
  const township = await TownshipRepository.findById(id);
  if (!township) {
    throw new ApiError(404, "Township not found");
  }
  return township;
};

export const getAllTownships = async (
  filters: any,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;
  const whereClause: Prisma.TownshipWhereInput = {};

  if (filters.search) {
    whereClause.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { locality: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  if (filters.city) whereClause.city = filters.city;

  const [townships, totalItems] = await Promise.all([
    TownshipRepository.findMany(whereClause, {
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    TownshipRepository.count(whereClause),
  ]);

  return {
    townships,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      limit,
    },
  };
};

export const deleteTownship = async (id: string) => {
  const township = await TownshipRepository.findById(id);
  if (!township) {
    throw new ApiError(404, "Township not found");
  }

  return TownshipRepository.deleteTownship(id);
};
