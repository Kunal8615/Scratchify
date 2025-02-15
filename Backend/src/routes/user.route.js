import { Router } from "express";
import { RegisterUser, loginUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { app } from "../app.js";
import multer from "multer"
const upload = multer()
const router = Router();
//router.use(verifyJWT)
// middleware to verify JWT token
router.route( "/register").post(upload.none() ,RegisterUser)
router.route("/login").post(upload.none(),loginUser);

export default router;