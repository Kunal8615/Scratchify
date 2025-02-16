import { Router } from "express";
import { RegisterUser, loginUser, getUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import multer from "multer";

const upload = multer();
const router = Router();

// ✅ Public Routes (No Authentication Required)
router.route("/register").post(upload.none(), RegisterUser);
router.route("/login").post(upload.none(), loginUser);

// ✅ Protected Routes (JWT Required)
router.route("/getUser").get(verifyJWT, getUser);

export default router;
