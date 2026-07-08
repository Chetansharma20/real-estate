import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

/**
 * Create a new customer lead/inquiry
 */
export const create = async (data: Prisma.LeadCreateInput) => {
  return prisma.lead.create({
    data,
  });
};

/**
 * Find a lead by its ID
 */
export const findById = async (id: string) => {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      property: true,
      user: true,
    },
  });
};

/**
 * Find multiple leads with optional filters and pagination
 */
export const findMany = async (
  whereClause?: Prisma.LeadWhereInput,
  options?: { skip?: number; take?: number; orderBy?: Prisma.LeadOrderByWithRelationInput }
) => {
  return prisma.lead.findMany({
    where: whereClause,
    include: {
      property: true,
    },
    ...options,
  });
};

/**
 * Count leads matching a criteria
 */
export const count = async (whereClause?: Prisma.LeadWhereInput) => {
  return prisma.lead.count({
    where: whereClause,
  });
};

/**
 * Update lead details (e.g., status from NEW to CONTACTED)
 */
export const update = async (id: string, data: Prisma.LeadUpdateInput) => {
  return prisma.lead.update({
    where: { id },
    data,
  });
};

/**
 * Delete a lead
 */
export const deleteLead = async (id: string) => {
  return prisma.lead.delete({
    where: { id },
  });
};
