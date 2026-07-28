import * as LeadRepository from "../repositories/LeadRepository";
import { ApiError } from "../utils/ApiError";
import { LeadStatus, LeadType } from "@prisma/client";

/**
 * Submit a new lead/inquiry (public)
 */
export const submitLead = async (data: {
  name: string;
  phone: string;
  type: string;
  projectId?: string;
  userId?: string;
  message?: string;
  preferredDate?: string;
  preferredSlot?: string;
}) => {
  if (!data.name || !data.phone || !data.type) {
    throw new ApiError(400, "Name, phone and type are required");
  }

  if (!Object.values(LeadType).includes(data.type as any)) {
    throw new ApiError(400, `Invalid lead type: '${data.type}'. Allowed values: ${Object.values(LeadType).join(", ")}`);
  }

  return LeadRepository.create({
    name: data.name,
    phone: data.phone,
    type: data.type as any,
    message: data.message,
    preferredDate: data.preferredDate ? new Date(data.preferredDate) : undefined,
    preferredSlot: data.preferredSlot,
    project: data.projectId ? { connect: { id: data.projectId } } : undefined,
    user: data.userId ? { connect: { id: data.userId } } : undefined,
  });
};

/**
 * Get all leads with optional filters and pagination (admin)
 */
export const getAllLeads = async (
  filters: any,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;
  const whereClause: any = {};

  if (filters.status) whereClause.status = filters.status;
  if (filters.type) whereClause.type = filters.type;
  if (filters.projectId) whereClause.projectId = filters.projectId;

  const [leads, totalItems] = await Promise.all([
    LeadRepository.findMany(whereClause, {
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    LeadRepository.count(whereClause),
  ]);

  return {
    leads,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      limit,
    }
  };
};

/**
 * Get a single lead by ID (admin)
 */
export const getLeadById = async (id: string) => {
  const lead = await LeadRepository.findById(id);
  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }
  return lead;
};

/**
 * Update lead status (admin)
 */
export const updateLeadStatus = async (id: string, status: LeadStatus) => {
  const lead = await LeadRepository.findById(id);
  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }

  return LeadRepository.update(id, { status });
};

/**
 * Delete a lead (admin)
 */
export const deleteLead = async (id: string) => {
  const lead = await LeadRepository.findById(id);
  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }

  return LeadRepository.deleteLead(id);
};
