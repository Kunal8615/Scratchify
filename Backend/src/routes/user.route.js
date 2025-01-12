import { Router } from "express";
//import verifyJWT from "../middlewares/auth.middleware.js";
import { RegisterUser, loginUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(RegisterUser)
router.route("/login").post(loginUser);

export default router;