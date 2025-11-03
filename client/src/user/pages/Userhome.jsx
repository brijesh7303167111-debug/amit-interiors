// src/pages/GalleryPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // or your router
import ImageGrid from "../components/ImageGrid";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeltonCard";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
// import { Whatsapp } from "lucide-react";

const CATEGORIES = ["All", "Bedroom", "Living Room", "Kitchen", "Mandir"];

const Userhome = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(16);
  const [imagesData, setImagesData] = useState({ images: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
      });
      if (category && category !== "All") params.set("category", category);
      if (query) params.set("q", query);
      
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/client/images?${params.toString()}`);
      console.log(res.data); 
      const data =  res.data;
      if (data.success !== false) {
        setImagesData({
          images: data.images || [],
          total: data.total || 0,
          totalPages: data.totalPages || 1,
        });
      } else {
        setImagesData({ images: [], total: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error("Failed to fetch images:", err);
      setImagesData({ images: [], total: 0, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  }, [category, page, limit, query]);

  // fetch on mount and when dependencies change
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // when category or query changes, reset to page 1
  useEffect(() => {
    setPage(1);
  }, [category, query]);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">

       <a
  href="https://wa.me/919876543210?text=Hi%20I%20want%20to%20know%20more%20about%20your%20services!"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-8 right-5 z-5  bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
>
  <FaWhatsapp className="w-11 h-11" />
</a>

      <div className="max-w-7xl mx-auto">
        {/* Top bar: title + Admin button */}
        <div className="flex items-center justify-between mb-6 p-5 ">
                <div>
                <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">Amit Kumar Interiors </h1>
                </div>
          
            
                <div>
                    <button
                    onClick={() => navigate("/admin")}
                    className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-lg shadow-md hover:shadow-yellow-400/50 transition"
                    >
                    Admin
                    </button>
                </div>
          
        </div>

        <div className="w-full flex mb-8 justify-center " >
             <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-900 items-center text-white px-3 py-2 rounded-md text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
        </div>

        {/* Gallery area */}
        {loading ? (
          // show skeleton grid while loading
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: limit }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : imagesData.images.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No images found.</div>
        ) : (
          <>
            <ImageGrid images={imagesData.images} />
            <div className="mt-6">
              <Pagination
                page={page}
                totalPages={imagesData.totalPages}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Userhome;
