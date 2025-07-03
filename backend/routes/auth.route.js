import Authcontrol from "../controller/auth.control.js"
import express from "express"
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", Authcontrol.login);
router.post("/register", Authcontrol.register);
router.get("/me", verifyToken, Authcontrol.getme);

export default router;