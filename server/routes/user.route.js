import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerUser,loginUser,logoutUser } from "../controllers/user.controller.js";

const router= Router();

router.post("/signup",registerUser);
router.post("/login",loginUser);
router.post("/logout",authMiddleware,logoutUser);

export default router;