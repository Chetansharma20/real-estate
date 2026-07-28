import { Router } from "express";
import { createAmenity, deleteAmenity } from "../controller/AmenityController";

import { getAllLeads, getLeadById, updateLeadStatus, deleteLead } from "../controller/LeadController";
import { createBlogPost, updateBlogPost, deleteBlogPost, getAllBlogPostsAdmin } from "../controller/BlogPostController";
import { getDashboardStats } from "../controller/DashboardController";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const router = Router();

// All routes in this file are admin-only and protected by verifyJWT and verifyAdmin

// GET /api/admin/dashboard/stats — Fetch stats summary for the dashboard
router.get("/dashboard/stats", verifyJWT, verifyAdmin, getDashboardStats);

// POST /api/admin/amenities — Add a new amenity
router.post("/amenities", verifyJWT, verifyAdmin, createAmenity);

// DELETE /api/admin/amenities/:id — Remove an amenity
router.delete("/amenities/:id", verifyJWT, verifyAdmin, deleteAmenity);



// GET /api/admin/leads — List all leads
router.get("/leads", verifyJWT, verifyAdmin, getAllLeads);

// GET /api/admin/leads/:id — Get a single lead
router.get("/leads/:id", verifyJWT, verifyAdmin, getLeadById);

// PATCH /api/admin/leads/:id/status — Update lead status
router.patch("/leads/:id/status", verifyJWT, verifyAdmin, updateLeadStatus);

// DELETE /api/admin/leads/:id — Delete a lead
router.delete("/leads/:id", verifyJWT, verifyAdmin, deleteLead);



// GET /api/admin/blog — List all blog posts (published and drafts)
router.get("/blog", verifyJWT, verifyAdmin, getAllBlogPostsAdmin);

// POST /api/admin/blog — Create a new blog post
router.post("/blog", verifyJWT, verifyAdmin, upload.single("coverImage"), createBlogPost);

// PATCH /api/admin/blog/:id — Update a blog post
router.patch("/blog/:id", verifyJWT, verifyAdmin, upload.single("coverImage"), updateBlogPost);

// DELETE /api/admin/blog/:id — Delete a blog post
router.delete("/blog/:id", verifyJWT, verifyAdmin, deleteBlogPost);

export default router;
