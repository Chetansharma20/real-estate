import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const findById = async (id: string) => {
  return prisma.township.findUnique({
    where: { id },
    include: {
      projects: {
        include: {
          media: { orderBy: { sortOrder: 'asc' } },
        }
      }
    },
  });
};

export const findMany = async (
  whereClause?: Prisma.TownshipWhereInput,
  options?: { skip?: number; take?: number; orderBy?: Prisma.TownshipOrderByWithRelationInput }
) => {
  return prisma.township.findMany({
    where: whereClause,
    include: {
      projects: {
        include: {
          media: {
            where: { type: 'IMAGE' },
            take: 5,
            orderBy: [{ isCover: 'desc' }, { sortOrder: 'asc' }]
          }
        }
      }
    },
    ...options,
  });
};

export const count = async (whereClause?: Prisma.TownshipWhereInput) => {
  return prisma.township.count({
    where: whereClause,
  });
};

export const create = async (data: Prisma.TownshipCreateInput) => {
  return prisma.township.create({
    data,
  });
};

export const update = async (id: string, data: Prisma.TownshipUpdateInput) => {
  return prisma.township.update({
    where: { id },
    data,
  });
};

export const deleteTownship = async (id: string) => {
  return prisma.township.delete({
    where: { id },
  });
};
