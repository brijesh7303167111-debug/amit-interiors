import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState(false);


  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const categoryOptions = [ "Bedroom", "Living Room", "Kitchen", "Mandir"];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

 const handleUpload = async (e) => {
  e.preventDefault();

  if (images.length === 0) {
    alert("Please select at least one image!");
    return;
  }
  if (categories.length === 0) {
    alert("Please select at least one category!");
    return;
  }

  const formData = new FormData();

  // Append multiple images
  images.forEach((image) => formData.append("images", image));

  // Append selected categories (as JSON string or multiple values)
  categories.forEach((cat) => formData.append("categories", cat));
  
  setUploading(true);
  try {
    const backendURL =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const res = await axios.post(`${backendURL}/admin/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status === 200) {
      alert("Images uploaded successfully!");
      setImages([]);
      setPreviews([]);
      setCategories([]);
    }
  } catch (err) {
    console.error(err);
    alert("Upload failed! Check console for details.");
  }finally {
      setUploading(false);
    }
};


  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col items-center justify-center bg-black/40 border border-yellow-500/20 rounded-2xl p-6 w-full max-w-md mx-auto sm:max-w-lg"
    >
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
        Upload Images
      </h2>

      {/* Category Dropdown */}
      <div className="relative w-full mb-4">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full bg-neutral-800 text-gray-300 py-2 px-4 rounded-lg flex justify-between items-center hover:bg-neutral-700 transition"
        >
          {categories.length > 0
            ? categories.join(", ")
            : "Select Categories"}
          <span className="ml-2 text-yellow-400">▼</span>
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 w-full bg-neutral-900 border border-yellow-500/20 rounded-lg mt-2 max-h-48 overflow-y-auto">
            {categoryOptions.map((cat) => (
              <label
                key={cat}
                className="flex items-center px-4 py-2 hover:bg-neutral-800 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="mr-2 accent-yellow-400"
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* File Input */}
      <label className="w-full bg-neutral-800 text-gray-300 py-2 px-4 rounded-lg cursor-pointer hover:bg-neutral-700 transition mb-4">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        {images.length > 0
          ? `${images.length} image(s) selected`
          : "Select Images"}
      </label>

      {/* Image Previews */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 w-full">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt="Preview"
            className="rounded-lg shadow-md border border-yellow-500/30 object-cover h-32 w-full"
          />
        ))}
      </div> */}

     <button
      type="submit"
      onClick={handleUpload}
      disabled={uploading}
      className={`bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-yellow-400/50 transition w-full sm:w-auto
        ${uploading ? "opacity-50 cursor-not-allowed hover:bg-yellow-400 hover:shadow-none" : ""}
      `}
    >
      {uploading ? "Uploading..." : "Upload"}
    </button>
    </form>
  );
};

export default ImageUploader;
