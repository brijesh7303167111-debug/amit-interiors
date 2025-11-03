// src/components/ImageCard.jsx
import React from "react";

const ImageCard = ({ image }) => {
  // small animation: scale on hover, soft shadow
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-900 transform transition-transform duration-300 hover:scale-[1.02]">
      <img
        src={image.url}
        alt={image.categories?.join(", ") || "Interior"}
        className="w-full h-48 object-contain rounded-2xl"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="text-xs text-gray-200 truncate">
          {image.categories && image.categories.length ? image.categories.join(" • ") : "Uncategorized"}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
