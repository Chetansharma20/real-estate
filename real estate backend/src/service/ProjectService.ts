import * as ProjectRepository from "../repositories/ProjectRepository";
import { ApiError } from "../utils/ApiError";
import { Prisma, PropertyType, ConstructionStatus, PropertyView, ProjectStatus } from "@prisma/client";
import { generateSlug } from "../utils/slugify";
import { prisma } from "../config/prisma";

export const createProject = async (data: {
  title: string;
  propertyType: PropertyType;
  constructionStatus?: ConstructionStatus;
  propertyView?: PropertyView;
  description?: string;
  videoUrl?: string;
  featured?: boolean;
  status?: ProjectStatus;
  townshipId?: string | null;
  amenities?: string[];
  configurations?: any[];
  address?: string;
  googleMapUrl?: string;
}) => {
  let slug = generateSlug(data.title);
  
  // Ensure unique slug
  let counter = 1;
  while (await ProjectRepository.findBySlug(slug)) {
    counter++;
    slug = `${generateSlug(data.title)}-${counter}`;
  }

  const createData: Prisma.ProjectCreateInput = {
    title: data.title,
    slug,
    propertyType: data.propertyType,
    constructionStatus: data.constructionStatus || "NONE",
    propertyView: data.propertyView || "NONE",
    description: data.description,
    videoUrl: data.videoUrl,
    featured: data.featured || false,
    status: data.status || "ACTIVE",
    latitude: (data as any).latitude ? parseFloat((data as any).latitude) : undefined,
    longitude: (data as any).longitude ? parseFloat((data as any).longitude) : undefined,
    address: data.address,
    googleMapUrl: data.googleMapUrl,
    reraId: (data as any).reraId,
  };

  if (data.townshipId && data.townshipId !== "null") {
    createData.township = { connect: { id: data.townshipId } };
  }

  if (data.amenities && data.amenities.length > 0) {
    createData.amenities = {
      create: data.amenities.map((id) => ({
        amenity: { connect: { id } },
      })),
    };
  }

  if (data.configurations && data.configurations.length > 0) {
    createData.configurations = {
      create: data.configurations.map((c) => ({
        bhk: parseInt(c.bhk),
        carpetArea: parseFloat(c.carpetArea),
        builtUpArea: c.builtUpArea ? parseFloat(c.builtUpArea) : undefined,
        superBuiltUpArea: c.superBuiltUpArea ? parseFloat(c.superBuiltUpArea) : undefined,
        pricePerSqft: parseFloat(c.pricePerSqft),
        totalPrice: parseFloat(c.totalPrice),
        label: c.label,
        availableUnits: c.availableUnits ? parseInt(c.availableUnits) : undefined,
        isAvailable: c.isAvailable !== undefined ? Boolean(c.isAvailable) : true,
      })),
    };
  }

  return ProjectRepository.create(createData);
};

export const updateProject = async (id: string, data: any) => {
  const existing = await ProjectRepository.findById(id);
  if (!existing) {
    throw new ApiError(404, "Project not found");
  }

  const updateData: Prisma.ProjectUpdateInput = {
    title: data.title,
    propertyType: data.propertyType,
    constructionStatus: data.constructionStatus,
    propertyView: data.propertyView,
    description: data.description,
    videoUrl: data.videoUrl,
    featured: data.featured,
    status: data.status,
    latitude: data.latitude !== undefined ? (data.latitude ? parseFloat(data.latitude) : null) : undefined,
    longitude: data.longitude !== undefined ? (data.longitude ? parseFloat(data.longitude) : null) : undefined,
    address: data.address !== undefined ? data.address : undefined,
    googleMapUrl: data.googleMapUrl !== undefined ? data.googleMapUrl : undefined,
    reraId: data.reraId !== undefined ? data.reraId : undefined,
    reraQrCode: data.reraQrCode !== undefined ? data.reraQrCode : undefined,
  };

  if (data.title && data.title !== existing.title) {
    let slug = generateSlug(data.title);
    let counter = 1;
    while (true) {
      const existingSlug = await ProjectRepository.findBySlug(slug);
      if (!existingSlug || existingSlug.id === id) break;
      counter++;
      slug = `${generateSlug(data.title)}-${counter}`;
    }
    updateData.slug = slug;
  }

  if (data.townshipId !== undefined) {
    if (data.townshipId && data.townshipId !== "null") {
      updateData.township = { connect: { id: data.townshipId } };
    } else {
      updateData.township = { disconnect: true };
    }
  }

  if (data.amenities !== undefined) {
    updateData.amenities = {
      deleteMany: {}, // Clear existing amenities
      create: data.amenities.map((amenityId: string) => ({
        amenity: { connect: { id: amenityId } },
      })),
    };
  }

  // Configurations update is tricky because of relations (ProjectMedia), usually best to handle configurations via separate endpoints or careful replacement.
  // We'll replace all for now, but in reality, doing upserts is safer to preserve floor plans linked by configurationId.
  // Actually, we should just upsert them if ID is provided.
  if (data.configurations !== undefined) {
    updateData.configurations = {
      deleteMany: {
        id: { notIn: data.configurations.map((c: any) => c.id).filter(Boolean) }
      },
      upsert: data.configurations.map((c: any) => ({
        where: { id: c.id || "new" },
        update: {
          bhk: parseInt(c.bhk),
          carpetArea: parseFloat(c.carpetArea),
          builtUpArea: c.builtUpArea ? parseFloat(c.builtUpArea) : null,
          superBuiltUpArea: c.superBuiltUpArea ? parseFloat(c.superBuiltUpArea) : null,
          pricePerSqft: parseFloat(c.pricePerSqft),
          totalPrice: parseFloat(c.totalPrice),
          label: c.label,
          availableUnits: c.availableUnits ? parseInt(c.availableUnits) : null,
          isAvailable: c.isAvailable !== undefined ? Boolean(c.isAvailable) : true,
        },
        create: {
          bhk: parseInt(c.bhk),
          carpetArea: parseFloat(c.carpetArea),
          builtUpArea: c.builtUpArea ? parseFloat(c.builtUpArea) : undefined,
          superBuiltUpArea: c.superBuiltUpArea ? parseFloat(c.superBuiltUpArea) : undefined,
          pricePerSqft: parseFloat(c.pricePerSqft),
          totalPrice: parseFloat(c.totalPrice),
          label: c.label,
          availableUnits: c.availableUnits ? parseInt(c.availableUnits) : undefined,
          isAvailable: c.isAvailable !== undefined ? Boolean(c.isAvailable) : true,
        }
      }))
    };
  }

  return ProjectRepository.update(id, updateData);
};

export const getProjectById = async (id: string) => {
  const project = await ProjectRepository.findById(id);
  if (!project) throw new ApiError(404, "Project not found");
  return project;
};

export const getProjectBySlug = async (slug: string) => {
  const project = await ProjectRepository.findBySlug(slug);
  if (!project) throw new ApiError(404, "Project not found");
  return project;
};

export const getAllProjects = async (filters: any, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const whereClause: Prisma.ProjectWhereInput = {};

  if (filters.search) {
    whereClause.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { township: { locality: { contains: filters.search, mode: "insensitive" } } },
      { township: { city: { contains: filters.search, mode: "insensitive" } } },
    ];
  }

  if (filters.type) {
    const types = typeof filters.type === "string" ? filters.type.split(",") : filters.type;
    const validTypes = new Set<string>();
    
    types.forEach((t: string) => {
      const upper = t.toUpperCase();
      if (upper === "FLAT" || upper === "APARTMENT") {
        validTypes.add("FLAT");
        validTypes.add("APARTMENT");
      } else if (["BUNGALOW", "VILLA", "PLOT", "ROW_HOUSE", "COMMERCIAL"].includes(upper)) {
        validTypes.add(upper);
      }
    });

    if (validTypes.size > 0) {
      whereClause.propertyType = { in: Array.from(validTypes) as any };
    }
  }

  if (filters.status) {
    whereClause.status = filters.status;
  }

  if (filters.featured !== undefined) {
    whereClause.featured = filters.featured === "true" || filters.featured === true;
  }

  if (filters.constructionStatus) {
    const statuses = typeof filters.constructionStatus === "string" ? filters.constructionStatus.split(",") : filters.constructionStatus;
    const validStatuses = statuses
      .filter((s: string) => ["UNDER_CONSTRUCTION", "READY_TO_MOVE", "NEW_LAUNCH", "NONE"].includes(s.toUpperCase()))
      .map((s: string) => s.toUpperCase());
    if (validStatuses.length > 0) {
      whereClause.constructionStatus = { in: validStatuses as any };
    }
  }

  if (filters.townshipId) {
    whereClause.townshipId = filters.townshipId;
  }

  // Filter configurations (BHK and Price)
  const configConditions: Prisma.ProjectConfigurationWhereInput = {};

  if (filters.bhk) {
    const bhkVals = typeof filters.bhk === "string" ? filters.bhk.split(",") : filters.bhk;
    const bhkNumbers = bhkVals.map((b: any) => parseInt(b)).filter((b: any) => !isNaN(b));
    if (bhkNumbers.length > 0) {
      const hasFiveOrMore = bhkNumbers.includes(5);
      const specificBhks = bhkNumbers.filter((n: number) => n < 5);

      if (hasFiveOrMore && specificBhks.length > 0) {
        configConditions.OR = [
          { bhk: { in: specificBhks } },
          { bhk: { gte: 5 } }
        ];
      } else if (hasFiveOrMore) {
        configConditions.bhk = { gte: 5 };
      } else {
        configConditions.bhk = { in: specificBhks };
      }
    }
  }

  if (filters.maxPrice) {
    const maxPriceVal = parseFloat(filters.maxPrice);
    if (!isNaN(maxPriceVal)) {
      configConditions.totalPrice = { lte: maxPriceVal };
    }
  }

  if (Object.keys(configConditions).length > 0) {
    whereClause.configurations = {
      some: configConditions
    };
  }

  const [projects, totalItems] = await Promise.all([
    ProjectRepository.findMany(whereClause, {
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    ProjectRepository.count(whereClause),
  ]);

  return {
    projects,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      limit,
    },
  };
};

export const deleteProject = async (id: string) => {
  const existing = await ProjectRepository.findById(id);
  if (!existing) throw new ApiError(404, "Project not found");
  return ProjectRepository.deleteProject(id);
};

export const addProjectMedia = async (projectId: string, url: string, type: "IMAGE" | "BROCHURE" | "FLOOR_PLAN", configurationId?: string, isCover: boolean = false) => {
  // If this is set as cover, unset other covers for this project
  if (isCover && type === "IMAGE") {
    await prisma.projectMedia.updateMany({
      where: { projectId, type: "IMAGE", isCover: true },
      data: { isCover: false },
    });
  }

  // Get max sortOrder to append
  const maxOrderMedia = await prisma.projectMedia.findFirst({
    where: { projectId, type },
    orderBy: { sortOrder: 'desc' }
  });
  const sortOrder = maxOrderMedia ? maxOrderMedia.sortOrder + 1 : 0;

  if (isCover) {
    // Reset other cover images for this project
    await prisma.projectMedia.updateMany({
      where: { projectId, type: "IMAGE", isCover: true },
      data: { isCover: false }
    });
  }

  return prisma.projectMedia.create({
    data: {
      projectId,
      url,
      type,
      configurationId,
      isCover,
      sortOrder
    }
  });
};

export const removeProjectMedia = async (mediaId: string) => {
  return prisma.projectMedia.delete({
    where: { id: mediaId }
  });
};
