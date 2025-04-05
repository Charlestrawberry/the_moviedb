import React from 'react';

export default function Pagination({ currentPage, totalResults, onPageChange }) {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="flex justify-center mt-6 gap-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Prev
        </button>
      )}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Next
        </button>
      )}
    </div>
  );
}