import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const [propertiesCount, leadsCount, blogsCount, aggregateRevenue, recentLeads] = await Promise.all([
    prisma.project.count(),
    prisma.lead.count(),
    prisma.blogPost.count(),
    prisma.projectConfiguration.aggregate({
      _sum: {
        totalPrice: true,
      },
    }),
    prisma.lead.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        project: true,
      },
    }),
  ]);

  const totalRevenue = aggregateRevenue._sum.totalPrice || 0;

  res.status(200).json(
    new ApiResponse(
      200,
      {
        projectsCount: propertiesCount,
        leadsCount,
        blogsCount,
        totalRevenue,
        recentLeads,
      },
      "Dashboard stats fetched successfully"
    )
  );
});
