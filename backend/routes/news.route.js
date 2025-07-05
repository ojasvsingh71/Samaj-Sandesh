import express from "express"
import news from "../controller/news.control.js";

const router = express.Router();

router.get("/top", news);

export default router;