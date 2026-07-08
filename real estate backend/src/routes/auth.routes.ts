import { Router } from "express";
import { login, logout, updateProfile } from "../controller/AuthController";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.patch("/update-profile", verifyJWT, updateProfile);

export default router;
