import express from "express";
import mongoose, { connect } from "mongoose";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import admin from "./routes/adminroutes.js";
import client from "./routes/clientroutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/admin", admin);
app.use("/client",client );




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
