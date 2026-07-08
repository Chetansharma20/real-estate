import { Request, Response } from "express";
import * as leadService from "../service/LeadService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { LeadStatus } from "@prisma/client";

/**
 * POST /api/leads — Submit a new lead/inquiry (public)
 */
export const submitLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.submitLead(req.body);

  res.status(201).json(
    new ApiResponse(201, lead, "Lead submitted successfully")
  );
});

/**
 * GET /api/admin/leads — Get all leads (admin)
 */
export const getAllLeads = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const leads = await leadService.getAllLeads(req.query, page, limit);

  res.status(200).json(
    new ApiResponse(200, leads, "Leads fetched successfully")
  );
});

/**
 * GET /api/admin/leads/:id — Get single lead (admin)
 */
export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const lead = await leadService.getLeadById(id);

  res.status(200).json(
    new ApiResponse(200, lead, "Lead fetched successfully")
  );
});

/**
 * PATCH /api/admin/leads/:id/status — Update lead status (admin)
 */
export const updateLeadStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { status } = req.body;

  const lead = await leadService.updateLeadStatus(id, status as LeadStatus);

  res.status(200).json(
    new ApiResponse(200, lead, "Lead status updated successfully")
  );
});

/**
 * DELETE /api/admin/leads/:id — Delete a lead (admin)
 */
export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await leadService.deleteLead(id);

  res.status(200).json(
    new ApiResponse(200, {}, "Lead deleted successfully")
  );
});
