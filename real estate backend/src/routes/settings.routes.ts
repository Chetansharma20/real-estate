import { Router } from "express";
import { SiteSettingsController } from "../controller/SiteSettingsController";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware";

const router = Router();
const controller = new SiteSettingsController();

router.get("/", controller.getSettings);
router.put("/", verifyJWT, verifyAdmin, controller.updateSettings);

export default router;
