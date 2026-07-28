import { Router } from "express";
import * as projectController from "../controller/ProjectController";
import { uploadProjectMedia } from "../middleware/multer.middleware";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public routes — no auth required
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById); // supports id or slug

// Admin-only protected routes
router.post("/", verifyJWT, verifyAdmin, projectController.createProject);
router.patch("/:id", verifyJWT, verifyAdmin, projectController.updateProject);
router.delete("/:id", verifyJWT, verifyAdmin, projectController.deleteProject);

// Media upload routes
router.post("/:id/media", verifyJWT, verifyAdmin, uploadProjectMedia, projectController.uploadMedia);
router.delete("/:id/media/:mediaId", verifyJWT, verifyAdmin, projectController.deleteMedia);

export default router;
