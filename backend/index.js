import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/connectDB.js";
import AuthRouter from "./routes/auth.route.js"
import AnnouncemetRouter from "./routes/announcement.route.js"

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", AuthRouter);
app.use("/announcement", AnnouncemetRouter);

app.get("/", (req, res) => {
    res.send("API is running");
})

app.listen(process.env.PORT, () => {
    console.log(`\nServer is running on http://localhost:${process.env.PORT}\n`);
})