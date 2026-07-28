import { Router } from "express";
import * as townshipController from "../controller/TownshipController";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", townshipController.getAllTownships);
router.get("/:id", townshipController.getTownshipById);

// Admin-only routes
router.post("/", verifyJWT, verifyAdmin, townshipController.createTownship);
router.patch("/:id", verifyJWT, verifyAdmin, townshipController.updateTownship);
router.delete("/:id", verifyJWT, verifyAdmin, townshipController.deleteTownship);

export default router;
