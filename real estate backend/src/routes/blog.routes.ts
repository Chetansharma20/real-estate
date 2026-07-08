import { Router } from "express";
import { getAllBlogPosts, getBlogPostBySlug } from "../controller/BlogPostController";

const router = Router();

// GET /api/blog — List all blog posts (public)
router.get("/", getAllBlogPosts);

// GET /api/blog/:slug — Get single blog post by slug (public)
router.get("/:slug", getBlogPostBySlug);

export default router;
