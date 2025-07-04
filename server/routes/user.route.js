import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerUser,loginUser,logoutUser,getProfile,updateProfile } from "../controllers/user.controller.js";

const router= Router();

router.post("/signup",registerUser);
router.post("/login",loginUser);
router.post("/logout",authMiddleware,logoutUser);
router.get("/get-profile",authMiddleware,getProfile);
router.post("/update-profile",authMiddleware,updateProfile);

export default router;