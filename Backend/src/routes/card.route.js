import { Router } from "express";
import { uploadCard ,recentCard,companyCard ,cardUsed} from "../controllers/card.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { app } from "../app.js";
import multer from "multer"
const upload = multer()

const router = Router();
router.use(verifyJWT);
router.route("/uploadCard").post(upload.none(),uploadCard);
router.route("/recentCard").get(recentCard);
router.route("/companyCards/:companyName").get(companyCard);
router.route("/cardUsed/:cardId").delete(cardUsed);
//router.route("/updateCardCount").patch(updateCardCount);

export default router;