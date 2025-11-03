// src/components/SkeletonCard.jsx
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="rounded-2xl bg-gray-800 animate-pulse h-48 flex items-center justify-center">
      {/* subtle placeholder */}
      <div className="w-24 h-6 bg-gray-700 rounded" />
    </div>
  );
};

export default SkeletonCard;
