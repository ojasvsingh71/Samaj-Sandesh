import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/connectDB.js";

dotenv.config();

const app = express();

connectDB();

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.listen(process.env.PORT, () => {
    console.log(`\nServer is running on http://localhost:${process.env.PORT}\n`);
})