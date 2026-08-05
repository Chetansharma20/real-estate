import { Request, Response } from "express";
import * as ProjectService from "../service/ProjectService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { MediaType } from "@prisma/client";
import fs from "fs";

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
  
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

  const uploadedMedia: any[] = [];

  // 1. Handle Cover Image
  if (files["coverImage"] && files["coverImage"].length > 0) {
    const file = files["coverImage"][0];
    const url = `${BASE_URL}/uploads/${file.filename}`;
    const media = await ProjectService.addProjectMedia(id as string, url, "IMAGE", undefined, true);
    uploadedMedia.push(media);
  }

  // 2. Handle Gallery Images
  if (files["images"] && files["images"].length > 0) {
    for (const file of files["images"]) {
      const url = `${BASE_URL}/uploads/${file.filename}`;
      const media = await ProjectService.addProjectMedia(id as string, url, "IMAGE");
      uploadedMedia.push(media);
    }
  }

  // 3. Handle Flat Images (Rooms)
  if (files["flatImages"] && files["flatImages"].length > 0) {
    for (const file of files["flatImages"]) {
      const url = `${BASE_URL}/uploads/${file.filename}`;
      const media = await ProjectService.addProjectMedia(id as string, url, "IMAGE");
      uploadedMedia.push(media);
    }
  }

  // 4. Handle Amenity Images
  if (files["amenityImages"] && files["amenityImages"].length > 0) {
    for (const file of files["amenityImages"]) {
      const url = `${BASE_URL}/uploads/${file.filename}`;
      const media = await ProjectService.addProjectMedia(id as string, url, "IMAGE");
      uploadedMedia.push(media);
    }
  }

  // 5. Handle Brochure
  if (files["brochure"] && files["brochure"].length > 0) {
    const file = files["brochure"][0];
    const url = `${BASE_URL}/uploads/${file.filename}`;
    const media = await ProjectService.addProjectMedia(id as string, url, "BROCHURE");
    uploadedMedia.push(media);
  }

  // 6. Handle Floor Plans (needs configId matching)
  if (files["floorPlans"] && files["floorPlans"].length > 0) {
    let configIds: string[] = [];
    if (req.body.floorPlanConfigIds) {
      if (typeof req.body.floorPlanConfigIds === "string") {
        configIds = JSON.parse(req.body.floorPlanConfigIds);
      } else {
        configIds = req.body.floorPlanConfigIds;
      }
    }

    for (let i = 0; i < files["floorPlans"].length; i++) {
      const file = files["floorPlans"][i];
      const url = `${BASE_URL}/uploads/${file.filename}`;
      const configId = configIds[i] || undefined;
      const media = await ProjectService.addProjectMedia(id as string, url, "FLOOR_PLAN", configId);
      uploadedMedia.push(media);
    }
  }

  // 7. Handle RERA QR Code
  if (files["reraQrCode"] && files["reraQrCode"].length > 0) {
    const file = files["reraQrCode"][0];
    const url = `${BASE_URL}/uploads/${file.filename}`;
    await ProjectService.updateProject(id as string, { reraQrCode: url });
    uploadedMedia.push({ id: "reraQrCode", url, type: "RERA_QR_CODE" });
  }

  res.status(201).json(new ApiResponse(201, uploadedMedia, "Media uploaded successfully"));
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const mediaId = req.params.mediaId as string;
  
  const deleted = await ProjectService.removeProjectMedia(mediaId);
  
  // Optionally remove file from disk
  try {
    const filename = deleted.url.split("/uploads/")[1];
    if (filename) {
      const decodedFilename = decodeURIComponent(filename);
      const fullPath = `./uploads/${decodedFilename}`;
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
  } catch (error) {
    console.warn("Could not delete file from disk", error);
  }

  res.status(200).json(new ApiResponse(200, null, "Media deleted successfully"));
});
