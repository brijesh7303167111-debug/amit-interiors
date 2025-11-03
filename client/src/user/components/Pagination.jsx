// src/components/Pagination.jsx
import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const neighbors = 1; // number of page buttons around current page
  const start = Math.max(1, page - neighbors);
  const end = Math.min(totalPages, page + neighbors);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`px-3 py-1 rounded ${page === 1 ? "bg-gray-800 text-gray-400" : "bg-yellow-400 text-black font-semibold"}`}
      >
        Prev
      </button>

      {/* first page + ellipsis if needed */}
      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1 rounded bg-gray-900">
            1
          </button>
          {start > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${p === page ? "bg-yellow-400 text-black font-semibold" : "bg-gray-900 text-gray-200"}`}
        >
          {p}
        </button>
      ))}

      {/* last page + ellipsis */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 rounded bg-gray-900">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded ${page === totalPages ? "bg-gray-800 text-gray-400" : "bg-yellow-400 text-black font-semibold"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
