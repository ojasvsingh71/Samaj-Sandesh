import express from "express";
import weatherController from "../controller/weather.control.js";

const router = express.Router();

router.get("/current", weatherController.getWeather);

export default router;