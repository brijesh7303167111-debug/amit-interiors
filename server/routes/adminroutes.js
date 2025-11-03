import express from "express";
// import adminController from "../controllers/adminController.js";
import { login } from "../controllers/admincontrollers.js";
import { uploadImages } from "../controllers/imageController.js";
import upload from "../middleware/uploadMiddleware.js";
const admin = express.Router();

admin.post("/login", login);
admin.post("/images", upload.array("images"), uploadImages);
// admin.post("/images", images);



admin.get("/test", (req, res) => res.send("Admin Home"));
export default admin;