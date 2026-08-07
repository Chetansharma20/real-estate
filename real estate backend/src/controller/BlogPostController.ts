import { Request, Response } from "express";
import * as blogPostService from "../service/BlogPostService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomRequest } from "../middleware/auth.middleware";

/**
 * GET /api/blog — List all published blog posts (public)
 */
export const getAllBlogPosts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const posts = await blogPostService.getAllBlogPosts(req.query, page, limit, true);

  res.status(200).json(
    new ApiResponse(200, posts, "Blog posts fetched successfully")
  );
});

export const getAllBlogPostsAdmin = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const posts = await blogPostService.getAllBlogPosts(req.query, page, limit, false);

  res.status(200).json(
    new ApiResponse(200, posts, "Blog posts fetched successfully")
  );
});

/**
 * GET /api/blog/:slug — Get single blog post by slug (public)
 */
export const getBlogPostBySlug = asyncHandler(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;

  const post = await blogPostService.getBlogPostBySlug(slug);

  res.status(200).json(
    new ApiResponse(200, post, "Blog post fetched successfully")
  );
});

/**
 * POST /api/admin/blog — Create a new blog post (admin)
 */
export const createBlogPost = asyncHandler(async (req: CustomRequest, res: Response) => {
  const authorId = req.user?.id!;
  const coverImage = req.file
    ? req.file.path  // Cloudinary URL
    : req.body.coverImage;

  const published = req.body.published !== undefined
    ? req.body.published === "true" || req.body.published === true
    : undefined;

  const post = await blogPostService.createBlogPost({ 
    ...req.body, 
    published,
    coverImage, 
    authorId 
  });

  res.status(201).json(
    new ApiResponse(201, post, "Blog post created successfully")
  );
});

/**
 * PATCH /api/admin/blog/:id — Update a blog post (admin)
 */
export const updateBlogPost = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const coverImage = req.file
    ? req.file.path  // Cloudinary URL
    : undefined;

  const published = req.body.published !== undefined
    ? req.body.published === "true" || req.body.published === true
    : undefined;

  const post = await blogPostService.updateBlogPost(id, { 
    ...req.body, 
    ...(published !== undefined ? { published } : {}),
    ...(coverImage ? { coverImage } : {}) 
  });

  res.status(200).json(
    new ApiResponse(200, post, "Blog post updated successfully")
  );
});

/**
 * DELETE /api/admin/blog/:id — Delete a blog post (admin)
 */
export const deleteBlogPost = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await blogPostService.deleteBlogPost(id);

  res.status(200).json(
    new ApiResponse(200, {}, "Blog post deleted successfully")
  );
});
