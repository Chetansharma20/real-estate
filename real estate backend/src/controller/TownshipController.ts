import { Request, Response } from "express";
import * as TownshipService from "../service/TownshipService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const createTownship = asyncHandler(async (req: Request, res: Response) => {
  const township = await TownshipService.createTownship({
    name: req.body.name,
    description: req.body.description,
    locality: req.body.locality,
    city: req.body.city,
    address: req.body.address,
    googleMapUrl: req.body.googleMapUrl,
    latitude: req.body.latitude ? parseFloat(req.body.latitude) : undefined,
    longitude: req.body.longitude ? parseFloat(req.body.longitude) : undefined,
  });

  res.status(201).json(new ApiResponse(201, township, "Township created successfully"));
});

export const updateTownship = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const data: any = { ...req.body };
  if (data.latitude) data.latitude = parseFloat(data.latitude);
  if (data.longitude) data.longitude = parseFloat(data.longitude);

  const township = await TownshipService.updateTownship(id, data);
  res.status(200).json(new ApiResponse(200, township, "Township updated successfully"));
});

export const getTownshipById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const township = await TownshipService.getTownshipById(id);
  res.status(200).json(new ApiResponse(200, township, "Township fetched successfully"));
});

export const getAllTownships = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const filters = {
    search: req.query.search as string,
    city: req.query.city as string,
  };

  const result = await TownshipService.getAllTownships(filters, page, limit);
  res.status(200).json(new ApiResponse(200, result, "Townships fetched successfully"));
});

export const deleteTownship = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await TownshipService.deleteTownship(id);
  res.status(200).json(new ApiResponse(200, null, "Township deleted successfully"));
});
