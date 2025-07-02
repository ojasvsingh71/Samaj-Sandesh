import express from "express"
import announcement from "../controller/announcement.control.js"
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get("/all", announcement.getAnnouncement);
router.post("/add", verifyToken, isAdmin, announcement.createAnnouncement);

export default router;
