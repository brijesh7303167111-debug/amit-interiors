// src/components/ImageCard.jsx
import React from "react";

const ImageCard = ({ image }) => {
  // small animation: scale on hover, soft shadow
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black transform border-2 border-amber-500 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-yellow-400/40">
  <img
    src={image.url}
    alt={image.categories?.join(", ") || "Interior"}
    className="w-full h-48 object-contain rounded-2xl bg-black"
    loading="lazy"
  />
  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/70 to-transparent">
    <div className="text-xs font-medium text-amber-400 truncate">
      {image.categories && image.categories.length
        ? image.categories.join(" • ")
        : "Uncategorized"}
    </div>
  </div>
</div>

  );
};

export default ImageCard;
