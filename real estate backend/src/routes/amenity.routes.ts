import { Router } from "express";
import { getAllAmenities } from "../controller/AmenityController";

const router = Router();

// GET /api/amenities — List all amenities (public, for filter checkboxes + property form)
router.get("/", getAllAmenities);

export default router;
