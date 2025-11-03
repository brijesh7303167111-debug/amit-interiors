// routes/imageRoutes.js
import express from "express";
import { getImages } from "../controllers/imageController.js";

const client = express.Router();

client.get("/images", getImages); // GET /api/images

export default client;
