import { Router } from "express";
import { submitLead } from "../controller/LeadController";

const router = Router();

// POST /api/leads — Submit a new inquiry (public)
router.post("/", submitLead);

export default router;
