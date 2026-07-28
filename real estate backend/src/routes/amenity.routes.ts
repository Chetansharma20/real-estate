import { Router } from "express";
import { getAllAmenities, createAmenity, deleteAmenity } from "../controller/AmenityController";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware";

const router = Router();

// GET /api/amenities — List all amenities (public, for filter checkboxes + property form)
router.get("/", getAllAmenities);

// Admin routes
router.post("/", verifyJWT, verifyAdmin, createAmenity);
router.delete("/:id", verifyJWT, verifyAdmin, deleteAmenity);

export default router;
