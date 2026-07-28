import { prisma } from "../config/prisma";
import { Prisma, MediaType } from "@prisma/client";

export const findById = async (id: string) => {
  return prisma.project.findUnique({
    where: { id },
    include: {
      township: true,
      media: { orderBy: { sortOrder: 'asc' } },
      configurations: {
        include: {
          floorPlans: { orderBy: { sortOrder: 'asc' } }
        },
        orderBy: { bhk: 'asc' }
      },
      amenities: {
        include: { amenity: true },
      },
    },
  });
};

export const findBySlug = async (slug: string) => {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      township: true,
      media: { orderBy: { sortOrder: 'asc' } },
      configurations: {
        include: {
          floorPlans: { orderBy: { sortOrder: 'asc' } }
        },
        orderBy: { bhk: 'asc' }
      },
      amenities: {
        include: { amenity: true },
      },
    },
  });
};

export const findMany = async (
  whereClause?: Prisma.ProjectWhereInput,
  options?: { skip?: number; take?: number; orderBy?: Prisma.ProjectOrderByWithRelationInput }
) => {
  return prisma.project.findMany({
    where: whereClause,
    include: {
      township: true,
      media: {
        where: { type: 'IMAGE', configurationId: null },
        take: 5,
        orderBy: [{ isCover: 'desc' }, { sortOrder: 'asc' }]
      },
      configurations: {
        orderBy: { bhk: 'asc' },
      },
    },
    ...options,
  });
};

export const count = async (whereClause?: Prisma.ProjectWhereInput) => {
  return prisma.project.count({
    where: whereClause,
  });
};

export const create = async (data: Prisma.ProjectCreateInput) => {
  return prisma.project.create({
    data,
  });
};

export const update = async (id: string, data: Prisma.ProjectUpdateInput) => {
  return prisma.project.update({
    where: { id },
    data,
  });
};

export const deleteProject = async (id: string) => {
  return prisma.project.delete({
    where: { id },
  });
};
