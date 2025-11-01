import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// Giả định bạn đã có các assets này
import Ao from "../assets/Aoremove.png";
import sanPham2 from "../assets/sanpham2.jpg";
import GridHeader from "./GridHeader";
// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Sử dụng faXmark (icon X) thay vì faTimes (đã cũ)
import { faEye, faMagnifyingGlass, faGift, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

// ✅ BƯỚC 1: IMPORT COMPONENT POPUP CỦA BẠN
// (Sửa tên thành ProductPopup (số ít) để khớp với file của bạn)
import ProductPopup from './ProductPopup';

// =========================================================================
// 1. PRODUCT CARD (Giữ nguyên logic Link)
// =========================================================================

const ProductCard = ({ product, onQuickView }) => {
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const formatPrice = (price, includeCurrency = true) => {
    const formatted = price.toLocaleString('vi-VN');
    return includeCurrency ? formatted + ' VNĐ' : formatted;
  };

  return (
    <Link
      to="/Detail"
      state={{ product: product }}
      className="group relative block rounded-lg overflow-hidden text-center bg-white transform transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative group">

        <div className="w-full h-full aspect-square overflow-hidden relative">
          <img
            src={product.imgHover}
            alt={product.name}
            className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
          />
          <img
            src={product.imgMain}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
          />
        </div>

        <div className="absolute top-[10%] left-[10px] z-30 flex flex-col items-center">

          {product.oldPrice && product.oldPrice > product.price && (
            <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
              -{discountPercent}%
            </div>
          )}
          {product.isGift && (
            <div className="flex items-center justify-center bg-yellow-400 text-white w-[35px] h-[35px] rounded-full shadow-md">
              <FontAwesomeIcon icon={faGift} className="text-red-600 text-lg" />
            </div>
          )}

          {product.isBestseller && (
            <div className="absolute top-[12px] left-[105px] z-20 w-[150px] text-center 
                  bg-red-600 text-white text-[11px] font-bold uppercase 
                  py-[3px] rotate-45 shadow-lg">
              Best Seller
            </div>
          )}

          {/* Link Xem nhanh (Kính lúp) */}
          <div className="relative group/zoom">
            {/* Link Xem nhanh (Kính lúp) */}
            <Link
              onClick={(e) => {
                e.stopPropagation(); // Ngăn cả thẻ Link cha
                e.preventDefault();
                onQuickView(product); // Gọi hàm onQuickView
              }}
              className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
            </Link>
            {/* Tooltip "Xem nhanh" */}
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-40">
              Xem nhanh
            </span>
          </div>
          {/* Link Xem chi tiết (Mắt) */}
          <div className="relative group/eye">
            {/* Link Xem chi tiết (Mắt) */}
            <Link
              to="/Detail"
              state={{ product: product }}
              onClick={(e) => e.stopPropagation()} // Ngăn thẻ Link cha
              className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faEye} className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
            </Link>
            {/* Tooltip "Xem chi tiết" */}
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/eye:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-40">
              Xem chi tiết
            </span>
          </div>
        </div>
      </div>
      {/* Thông tin sản phẩm */}
      <div className="mt-2 p-3 text-center">
        <div className="font-medium text-[14px] md:text-lg">
          {product.name}
        </div>
        <div className="flex flex-col items-center mt-1">
          <div className="text-red-600 font-bold text-base">
            {formatPrice(product.price)}
          </div>
          {product.oldPrice && product.oldPrice > product.price && (
            <div className="text-gray-500 text-sm line-through mt-0.5">
              {formatPrice(product.oldPrice, true)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};


// =========================================================================
// 2. PHÂN TRANG (Giữ nguyên)
// =========================================================================

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // ... (Logic phân trang giữ nguyên) ...
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
      className="flex flex-wrap justify-center items-center gap-2 mt-6 px-4"
      aria-label="Pagination"
    >
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
          className={`px-4 py-1.5 border rounded-md text-sm font-medium transition-all duration-150 ${page === currentPage
            ? "bg-blue-600 text-white border-blue-600 cursor-not-allowed"
            : "hover:bg-gray-100"
            }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 border rounded-md text-sm font-medium hover:bg-gray-100"
        >
          &gt;
        </button>
      )}

      <input
        type="number"
        value={jumpPageInput}
        onChange={(e) => setJumpPageInput(e.target.value)}
        onKeyDown={handleJumpOnEnter}
        className="w-16 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
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
    </nav>

  );
};

// =========================================================================
// 3. GRID MAIN COMPONENT (Cập nhật logic Popup)
// =========================================================================

export default function Grid() {
  const [currentPage, setCurrentPage] = useState(1);
  // quickViewProduct sẽ lưu trữ sản phẩm cần xem nhanh (hoặc null)
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const TOTAL_PAGES = 10;
  const ITEMS_PER_PAGE = 12;

  // Hàm này được gọi bởi ProductCard
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  // Hàm này sẽ được truyền vào ProductsPopup để đóng
  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  // --- Dữ liệu giả (Mock Data) ---
  const allProducts = useMemo(() => {
    return [...Array(TOTAL_PAGES * ITEMS_PER_PAGE).keys()].map(i => {
      const id = i + 1;
      const price = (Math.floor(Math.random() * 200) + 50) * 1000;
      let oldPrice = null;
      let isGift = id % 5 === 0;
      let isBestseller = id % 7 === 0;

      if (id % 3 === 0) {
        oldPrice = price + (Math.floor(Math.random() * 50) + 10) * 1000;
      }

      return {
        id,
        name: `Sản phẩm Trao Đổi ${id}`,
        price: oldPrice ? price : price,
        oldPrice: oldPrice,
        imgMain: Ao,
        imgHover: sanPham2,
        isGift,
        isBestseller
      };
    });
  }, []);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return allProducts.slice(start, end);
  }, [allProducts, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto py-5">

      <GridHeader totalProducts={allProducts.length} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
        {paginatedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={handleQuickView}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
      />

      {quickViewProduct && (
        <ProductPopup
          product={quickViewProduct}
          onClose={handleCloseQuickView}
        />
      )}

    </div>
  );
}

// Hàm formatPrice (tách ra ngoài nếu cần dùng chung)
const formatPrice = (price, includeCurrency = false) => {
  const formatted = price.toLocaleString('vi-VN');
  return includeCurrency ? formatted + ' VNĐ' : formatted;
};

