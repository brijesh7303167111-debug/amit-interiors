import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    categories: { type: [String], required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Image", imageSchema);
