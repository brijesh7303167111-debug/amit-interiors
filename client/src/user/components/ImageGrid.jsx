import { useState } from "react";
import { X, Download } from "lucide-react";
import ImageCard from "./ImageCard"; // adjust import as needed

const ImageGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg";
    link.click();
  };

  return (
    <>
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full h-auto">
       
        {images.map((img) => (
          <div key={img._id} onClick={() => setSelectedImage(img)}>
            <ImageCard image={img} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-[90%]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-gray-900/70 text-white p-2 rounded-full hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Download Button */}
            <button
              onClick={() => handleDownload(selectedImage.url)}
              className="absolute top-2 left-2 bg-yellow-400 hover:bg-yellow-900 text-white p-2 rounded-full"
            >
              <Download className="w-5 h-5" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt="Full view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
