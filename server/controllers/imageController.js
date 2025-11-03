import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";

export const uploadImages = async (req, res) => {
  try {
    const categories = req.body.categories; // array of selected categories
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    // Ensure categories is an array
    const categoryList = Array.isArray(categories) ? categories : [categories];
    

    const uploadResults = [];

    for (const file of files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64, {
        folder: "interiorDesignDB",
      });

      // Save image in DB
      const savedImage = await Image.create({
        url: result.secure_url,
        categories: categoryList,
      });

      uploadResults.push(savedImage);
    }

    res.status(200).json({
      message: "Images uploaded successfully",
      uploaded: uploadResults,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
};



export const getImages = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit) || 12)); // max 50 per page
    const category = req.query.category && req.query.category !== "All" ? req.query.category : null;
    const q = req.query.q ? req.query.q.trim() : null;

    // Build filter
    const filter = {};

    if (category) {
      // match any image that has the category in its categories array
      filter.categories = category;
    }

    if (q) {
      // simple search: check categories that contain q OR maybe other fields if needed
      filter.$or = [
        { categories: { $regex: q, $options: "i" } },
        // add other searchable fields if present, e.g., title, description
      ];
    }

    // Count documents for pagination meta
    const total = await Image.countDocuments(filter);

    // Calculate skip
    const skip = (page - 1) * limit;

    // Query images sorted by newest first
    const images = await Image.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages,
      images,
    });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
