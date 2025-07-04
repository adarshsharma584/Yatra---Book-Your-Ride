import {Router} from "express";
import {registerDriver} from "../controllers/driver.controller.js";
import {roleMiddleware} from "../middlewares/role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register-driver",authMiddleware,roleMiddleware("driver"),registerDriver);

export default router