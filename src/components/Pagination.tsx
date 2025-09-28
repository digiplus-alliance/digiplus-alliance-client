import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

import React from 'react';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createRange = (start: number, end: number) => {
    const r: number[] = [];
    for (let i = start; i <= end; i++) r.push(i);
    return r;
  };

  const start = Math.max(1, currentPage - siblingCount);
  const end = Math.min(totalPages, currentPage + siblingCount);
  const pages = createRange(start, end);

  return (
    <nav className="flex items-center justify-center space-x-2 mt-3">
      <button
        className="px-3 py-2 rounded-md border border-[#EBFBFF] text-sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <FaChevronLeft className="text-[#706C6C]" />
      </button>

      {start > 1 && (
        <>
          <button className="px-3 py-1 rounded-md text-sm" onClick={() => onPageChange(1)}>
            1
          </button>
          {start > 2 && <span className="px-2">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-md text-sm ${p === currentPage ? 'bg-[#008080] text-white' : 'bg-white text-gray-700 border'}`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2">…</span>}
          <button className="px-3 py-1 rounded-md text-sm" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        className="px-3 py-2 rounded-md border border-[#EBFBFF] text-sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight className="text-[#706C6C]" />
      </button>
    </nav>
  );
}
