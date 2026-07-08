import { Request, Response } from "express";
import * as propertyService from "../service/PropertyService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const parsePropertyData = (body: any) => {
  const parsed: any = { ...body };
  if (parsed.bhk !== undefined && parsed.bhk !== "") {
    parsed.bhk = parseInt(parsed.bhk, 10);
  }
  if (parsed.carpetArea !== undefined && parsed.carpetArea !== "") {
    parsed.carpetArea = parseFloat(parsed.carpetArea);
  }
  if (parsed.builtUpArea !== undefined && parsed.builtUpArea !== "" && parsed.builtUpArea !== "null") {
    parsed.builtUpArea = parseFloat(parsed.builtUpArea);
  } else if (parsed.builtUpArea === "" || parsed.builtUpArea === "null") {
    parsed.builtUpArea = null;
  }
  if (parsed.superBuiltUpArea !== undefined && parsed.superBuiltUpArea !== "" && parsed.superBuiltUpArea !== "null") {
    parsed.superBuiltUpArea = parseFloat(parsed.superBuiltUpArea);
  } else if (parsed.superBuiltUpArea === "" || parsed.superBuiltUpArea === "null") {
    parsed.superBuiltUpArea = null;
  }
  if (parsed.basePrice !== undefined && parsed.basePrice !== "") {
    parsed.basePrice = parseFloat(parsed.basePrice);
  }
  if (parsed.lat !== undefined && parsed.lat !== "" && parsed.lat !== "null") {
    parsed.lat = parseFloat(parsed.lat);
  } else if (parsed.lat === "" || parsed.lat === "null") {
    parsed.lat = null;
  }
  if (parsed.lng !== undefined && parsed.lng !== "" && parsed.lng !== "null") {
    parsed.lng = parseFloat(parsed.lng);
  } else if (parsed.lng === "" || parsed.lng === "null") {
    parsed.lng = null;
  }
  
  if (parsed.gst !== undefined && parsed.gst !== "" && parsed.gst !== "null") {
    parsed.gst = parseFloat(parsed.gst);
  } else if (parsed.gst === "" || parsed.gst === "null") {
    parsed.gst = null;
  }
  if (parsed.stampDuty !== undefined && parsed.stampDuty !== "" && parsed.stampDuty !== "null") {
    parsed.stampDuty = parseFloat(parsed.stampDuty);
  } else if (parsed.stampDuty === "" || parsed.stampDuty === "null") {
    parsed.stampDuty = null;
  }
  if (parsed.registrationCharges !== undefined && parsed.registrationCharges !== "" && parsed.registrationCharges !== "null") {
    parsed.registrationCharges = parseFloat(parsed.registrationCharges);
  } else if (parsed.registrationCharges === "" || parsed.registrationCharges === "null") {
    parsed.registrationCharges = null;
  }
  if (parsed.otherCharges !== undefined && parsed.otherCharges !== "" && parsed.otherCharges !== "null") {
    parsed.otherCharges = parseFloat(parsed.otherCharges);
  } else if (parsed.otherCharges === "" || parsed.otherCharges === "null") {
    parsed.otherCharges = null;
  }

  if (parsed.isFeatured !== undefined) {
    parsed.isFeatured = parsed.isFeatured === "true" || parsed.isFeatured === true;
  }
  return parsed;
};

/**
 * Handler to create a new property
 */
export const createProperty = asyncHandler(async (req: Request, res: Response) => {
  const { amenities, ...propertyData } = req.body;
  const parsedData = parsePropertyData(propertyData);

  // Build image URLs from uploaded files (multer puts them in req.files)
  const uploadedFiles = req.files as Express.Multer.File[];
  const imageUrls = uploadedFiles?.map(
    (file) => `${process.env.BASE_URL || "http://localhost:5000"}/uploads/${file.filename}`
  );

  // amenities comes as a JSON string from multipart/form-data
  const amenityIds: string[] = amenities
    ? (typeof amenities === "string" ? JSON.parse(amenities) : amenities)
    : [];

  const newProperty = await propertyService.createProperty(
    parsedData,
    imageUrls,
    amenityIds
  );

  res.status(201).json(
    new ApiResponse(201, newProperty, "Property created successfully")
  );
});

/**
 * Handler to retrieve details of a single property
 */
export const getPropertyById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const property = await propertyService.getPropertyById(id);

  res.status(200).json(
    new ApiResponse(200, property, "Property fetched successfully")
  );
});

/**
 * Handler to list properties with filters and pagination
 */
export const getAllProperties = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const properties = await propertyService.getAllProperties(req.query, page, limit);

  res.status(200).json(
    new ApiResponse(200, properties, "Properties fetched successfully")
  );
});

/**
 * Handler to update details of an existing property
 */
export const updateProperty = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { amenities, ...updateData } = req.body;
  const parsedData = parsePropertyData(updateData);

  // Build image URLs from uploaded files if any were sent
  const uploadedFiles = req.files as Express.Multer.File[];
  const imageUrls = uploadedFiles?.length
    ? uploadedFiles.map(
        (file) => `${process.env.BASE_URL || "http://localhost:5000"}/uploads/${file.filename}`
      )
    : undefined;

  const amenityIds: string[] | undefined = amenities
    ? (typeof amenities === "string" ? JSON.parse(amenities) : amenities)
    : undefined;

  const updatedProperty = await propertyService.updateProperty(
    id,
    parsedData,
    imageUrls,
    amenityIds
  );

  res.status(200).json(
    new ApiResponse(200, updatedProperty, "Property updated successfully")
  );
});

/**
 * Handler to delete a property
 */
export const deleteProperty = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await propertyService.deleteProperty(id);

  res.status(200).json(
    new ApiResponse(200, {}, "Property deleted successfully")
  );
});
