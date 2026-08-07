import { Request, Response } from "express";
import * as ProjectService from "../service/ProjectService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import cloudinary from "../config/cloudinary";

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  
  if (typeof data.amenities === "string") {
    data.amenities = JSON.parse(data.amenities);
  }
  if (typeof data.configurations === "string") {
    data.configurations = JSON.parse(data.configurations);
  }
  
  // Featured boolean handling
  if (data.featured === "true") data.featured = true;
  if (data.featured === "false") data.featured = false;

  const project = await ProjectService.createProject(data);
  res.status(201).json(new ApiResponse(201, project, "Project created successfully"));
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = { ...req.body };

  if (typeof data.amenities === "string") {
    data.amenities = JSON.parse(data.amenities);
  }
  if (typeof data.configurations === "string") {
    data.configurations = JSON.parse(data.configurations);
  }

  if (data.featured === "true") data.featured = true;
  if (data.featured === "false") data.featured = false;

  const project = await ProjectService.updateProject(id, data);
  res.status(200).json(new ApiResponse(200, project, "Project updated successfully"));
});

export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Try treating id as slug first for public routes, then as ID
  let project;
  try {
    project = await ProjectService.getProjectBySlug(id as string);
  } catch (e) {
    project = await ProjectService.getProjectById(id as string);
  }

  res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
});

export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const filters = {
    search: req.query.search as string,
    type: (req.query.type || req.query.propertyType) as any,
    status: req.query.status as any,
    townshipId: req.query.townshipId as string,
    bhk: req.query.bhk as any,
    maxPrice: req.query.maxPrice as any,
    featured: req.query.featured as any,
    constructionStatus: req.query.constructionStatus as any,
  };

  const result = await ProjectService.getAllProjects(filters, page, limit);
  res.status(200).json(new ApiResponse(200, result, "Projects fetched successfully"));
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await ProjectService.deleteProject(id);
  res.status(200).json(new ApiResponse(200, null, "Project deleted successfully"));
});

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // With Cloudinary, multer sets file.path to the full secure Cloudinary URL.
  const uploadedMedia: any[] = [];

  // 1. Cover Image
  if (files["coverImage"]?.length > 0) {
    const url = files["coverImage"][0].path;
    const media = await ProjectService.addProjectMedia(id as string, url, "IMAGE", undefined, true);
    uploadedMedia.push(media);
  }

  // 2. Gallery Images
  for (const file of files["images"] ?? []) {
    const media = await ProjectService.addProjectMedia(id as string, file.path, "IMAGE");
    uploadedMedia.push(media);
  }

  // 3. Flat Images
  for (const file of files["flatImages"] ?? []) {
    const media = await ProjectService.addProjectMedia(id as string, file.path, "IMAGE");
    uploadedMedia.push(media);
  }

  // 4. Amenity Images
  for (const file of files["amenityImages"] ?? []) {
    const media = await ProjectService.addProjectMedia(id as string, file.path, "IMAGE");
    uploadedMedia.push(media);
  }

  // 5. Brochure (PDF)
  if (files["brochure"]?.length > 0) {
    const media = await ProjectService.addProjectMedia(id as string, files["brochure"][0].path, "BROCHURE");
    uploadedMedia.push(media);
  }

  // 6. Floor Plans
  if (files["floorPlans"]?.length > 0) {
    let configIds: string[] = [];
    if (req.body.floorPlanConfigIds) {
      configIds = typeof req.body.floorPlanConfigIds === "string"
        ? JSON.parse(req.body.floorPlanConfigIds)
        : req.body.floorPlanConfigIds;
    }
    for (let i = 0; i < files["floorPlans"].length; i++) {
      const media = await ProjectService.addProjectMedia(
        id as string, files["floorPlans"][i].path, "FLOOR_PLAN", configIds[i]
      );
      uploadedMedia.push(media);
    }
  }

  // 7. RERA QR Code
  if (files["reraQrCode"]?.length > 0) {
    const url = files["reraQrCode"][0].path;
    await ProjectService.updateProject(id as string, { reraQrCode: url });
    uploadedMedia.push({ id: "reraQrCode", url, type: "RERA_QR_CODE" });
  }

  res.status(201).json(new ApiResponse(201, uploadedMedia, "Media uploaded successfully"));
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const mediaId = req.params.mediaId as string;

  const deleted = await ProjectService.removeProjectMedia(mediaId);

  // Delete from Cloudinary using the public_id extracted from the URL
  try {
    if (deleted.url && deleted.url.includes("res.cloudinary.com")) {
      // Extract public_id: everything between /upload/ and the file extension
      const match = deleted.url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i);
      if (match?.[1]) {
        const resourceType = deleted.type === "BROCHURE" ? "raw" : "image";
        await cloudinary.uploader.destroy(match[1], { resource_type: resourceType });
      }
    }
  } catch (error) {
    console.warn("Could not delete file from Cloudinary", error);
  }

  res.status(200).json(new ApiResponse(200, null, "Media deleted successfully"));
});
