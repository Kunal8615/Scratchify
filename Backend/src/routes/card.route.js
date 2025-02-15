import { Router } from "express";
import { uploadCard ,recentCard,companyCard} from "../controllers/card.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { app } from "../app.js";
import multer from "multer"
const upload = multer()

const router = Router();
router.use(verifyJWT);
router.route("/uploadCard").post(upload.none(),uploadCard);
router.route("/recentCard").get(recentCard);
router.route("/companyCards/:companyName").get(companyCard);

export default router;