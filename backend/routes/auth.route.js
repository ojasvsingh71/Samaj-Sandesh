import Authcontrol from "../controller/auth.control.js"
import express from "express"

const router = express.Router();

router.post("/login", Authcontrol.login);
router.post("/register", Authcontrol.register);

export default router;