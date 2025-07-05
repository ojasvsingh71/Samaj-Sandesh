import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/connectDB.js";
import AuthRouter from "./routes/auth.route.js"
import AnnouncemetRouter from "./routes/announcement.route.js"
import NewsRouter from "./routes/news.route.js"
import cors from "cors"

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://samaj-sandesh.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

connectDB();

app.use("/auth", AuthRouter);
app.use("/announcement", AnnouncemetRouter);
app.use("/news", NewsRouter);

app.get("/", (req, res) => {
    res.send("API is running");
})

app.listen(process.env.PORT, () => {
    console.log(`\nServer is running on http://localhost:${process.env.PORT}\n`);
})