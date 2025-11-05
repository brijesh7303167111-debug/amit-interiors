// routes/imageRoutes.js
import express from "express";
import { getAllImages, getImages } from "../controllers/imageController.js";

const client = express.Router();

client.get("/images", getImages); // GET /api/images
client.get("/allimages", getAllImages); // GET /api/images

export default client;
