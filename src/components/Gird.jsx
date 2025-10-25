import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Ao from "../assets/Aoremove.png";
import sanPham2 from "../assets/sanpham2.jpg";
import GridHeader from "./GridHeader";

const ProductCard = ({ product }) => {
  return (
    <a href="#" className="group relative block border border-gray-200 rounded-lg overflow-hidden shadow-sm text-left">
      <div className="relative aspect-square">
        {/* Ảnh mặc định */}
        <img
          src={product.img1}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {/* Ảnh hover */}
        <img
          src={product.img2}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
        <p className="mt-1 text-base font-bold text-[#ff8c00]">{product.price}</p>
      </div>
    </a>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [jumpPageInput, setJumpPageInput] = useState("");

  const pageNumbers = useMemo(() => {
    if (totalPages <= 4) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }
    let startPage = 1;
    if (currentPage <= 2) startPage = 1;
    else if (currentPage >= totalPages - 1) startPage = totalPages - 3;
    else startPage = currentPage - 1;
    return [startPage, startPage + 1, startPage + 2, startPage + 3];
  }, [currentPage, totalPages]);

  const handleJumpToPage = () => {
    const page = parseInt(jumpPageInput, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpPageInput("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert(`Vui lòng nhập số trang hợp lệ (1 - ${totalPages})`);
    }
  };

  const handleJumpOnEnter = (e) => {
    if (e.key === "Enter") handleJumpToPage();
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex flex-col sm:flex-row justify-center items-center gap-2 flex-wrap mt-10"
      aria-label="Pagination"
    >
      {/* Ẩn nút trái nếu ở trang đầu */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 border rounded-md text-sm font-medium hover:bg-gray-100"
        >
          &lt;
        </button>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className={`px-4 py-1.5 border rounded-md text-sm font-medium transition-all duration-150 ${
            page === currentPage
              ? "bg-blue-600 text-white border-blue-600 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ẩn nút phải nếu ở trang cuối */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 border rounded-md text-sm font-medium hover:bg-gray-100"
        >
          &gt;
        </button>
      )}

      <div className="flex gap-2 ml-0 sm:ml-4">
        <input
          type="number"
          value={jumpPageInput}
          onChange={(e) => setJumpPageInput(e.target.value)}
          onKeyDown={handleJumpOnEnter}
          className="w-16 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`1-${totalPages}`}
          min="1"
          max={totalPages}
        />
        <button
          onClick={handleJumpToPage}
          className="px-4 py-1.5 border rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200"
        >
          Đi
        </button>
      </div>
    </nav>
  );
};

export default function Grid() {
  const [currentPage, setCurrentPage] = useState(1);
  const TOTAL_PAGES = 10;

  // --- Dữ liệu giả (Mock Data) ---
  const products = useMemo(() => {
    return [...Array(60).keys()].map(i => {
      const id = (currentPage - 1) * 60 + i + 1;
      return {
        id,
        name: `Sản phẩm ${id}`,
        price: `${(Math.floor(Math.random() * 200) + 50) * 1000} đ`,
        img1: sanPham2,
        img2: Ao,
      };
    });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* ✅ Header có tổng số sản phẩm */}
      <GridHeader totalProducts={products.length} />

      {/* ✅ Grid Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ✅ Thanh phân trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
