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
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative">

  {/* WhatsApp Floating Button */}
  <a
    href="https://wa.me/+919878808321?text=Hi%20I%20want%20to%20know%20more%20about%20your%20services!"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 border-3 border-white bg-green-400 text-black p-3 rounded-full shadow-lg hover:shadow-amber-500/60 transition-transform transform hover:scale-110"
  >
    <FaWhatsapp className="w-8 text-white h-8" />
  </a>

  <div className="max-w-7xl mx-auto">

    {/* Top Bar: Title + Admin Button */}
    <div className="flex items-center justify-between mb-8 px-4 py-2 border-b border-amber-500/40">
      <h1 onClick={() => navigate("/")}  className="text-2xl md:text-3xl font-bold text-amber-500 tracking-wide">
        Amit Kumar Interiors
      </h1>

      <button
        onClick={() => navigate("/admin")}
        className="bg-amber-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-amber-500/50 transition-transform hover:scale-105"
      >
        Admin
      </button>
    </div>

    {/* Category Dropdown */}
    <div className="w-full flex justify-center mb-8">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-900 text-amber-500 border border-amber-500/40 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c} className="bg-black text-amber-500">
            {c}
          </option>
        ))}
      </select>
    </div>

    {/* Gallery Section */}
    {loading ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    ) : imagesData.images.length === 0 ? (
      <div className="text-center py-20 text-gray-500 italic">
        No images found.
      </div>
    ) : (
      <>
        <ImageGrid images={imagesData.images} />
        <div className="mt-8 flex justify-center">
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
