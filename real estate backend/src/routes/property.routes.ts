import { Router } from "express";
import {
  createProperty,
  getPropertyById,
  getAllProperties,
  updateProperty,
  deleteProperty,
} from "../controller/PropertyController";
import { getPropertyAmenities } from "../controller/PropertyAmenityController";
import { verifyJWT } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const router = Router();

// Public routes
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.get("/:id/amenities", getPropertyAmenities);

// Admin-only protected routes
router.post("/", verifyJWT, upload.array("images", 10), createProperty);
router.patch("/:id", verifyJWT, upload.array("images", 10), updateProperty);
router.delete("/:id", verifyJWT, deleteProperty);

export default router;
