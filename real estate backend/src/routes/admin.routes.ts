import { Router } from "express";
import { createAmenity, deleteAmenity } from "../controller/AmenityController";
import { uploadImages, deleteImage } from "../controller/PropertyImageController";
import { linkAmenity, unlinkAmenity } from "../controller/PropertyAmenityController";
import { getAllLeads, getLeadById, updateLeadStatus, deleteLead } from "../controller/LeadController";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "../controller/BlogPostController";
import { getDashboardStats } from "../controller/DashboardController";
import { verifyJWT } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const router = Router();

// All routes in this file are admin-only and protected by verifyJWT

// GET /api/admin/dashboard/stats — Fetch stats summary for the dashboard
router.get("/dashboard/stats", verifyJWT, getDashboardStats);

// POST /api/admin/amenities — Add a new amenity
router.post("/amenities", verifyJWT, createAmenity);

// DELETE /api/admin/amenities/:id — Remove an amenity
router.delete("/amenities/:id", verifyJWT, deleteAmenity);

// POST /api/admin/properties/:id/images — Upload one or more images to a property
router.post("/properties/:id/images", verifyJWT, upload.array("images", 10), uploadImages);

// DELETE /api/admin/properties/:id/images/:imageId — Remove a specific image
router.delete("/properties/:id/images/:imageId", verifyJWT, deleteImage);

// POST /api/admin/properties/:id/amenities — Link an amenity to a property
router.post("/properties/:id/amenities", verifyJWT, linkAmenity);

// DELETE /api/admin/properties/:id/amenities/:amenityId — Unlink an amenity from a property
router.delete("/properties/:id/amenities/:amenityId", verifyJWT, unlinkAmenity);

// GET /api/admin/leads — List all leads
router.get("/leads", verifyJWT, getAllLeads);

// GET /api/admin/leads/:id — Get a single lead
router.get("/leads/:id", verifyJWT, getLeadById);

// PATCH /api/admin/leads/:id/status — Update lead status
router.patch("/leads/:id/status", verifyJWT, updateLeadStatus);

// DELETE /api/admin/leads/:id — Delete a lead
router.delete("/leads/:id", verifyJWT, deleteLead);

import { upload } from "../middleware/multer.middleware";

// POST /api/admin/blog — Create a new blog post
router.post("/blog", verifyJWT, upload.single("coverImage"), createBlogPost);

// PATCH /api/admin/blog/:id — Update a blog post
router.patch("/blog/:id", verifyJWT, upload.single("coverImage"), updateBlogPost);

// DELETE /api/admin/blog/:id — Delete a blog post
router.delete("/blog/:id", verifyJWT, deleteBlogPost);

export default router;
