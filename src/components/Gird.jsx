<<<<<<< HEAD
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
=======
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Assets
import Ao from "../assets/Aoremove.png";
import sanPham2 from "../assets/sanpham2.jpg";
import sanPham2Load from "../assets/sanpham2Load.jpg";
import mauAnh from "../assets/mauAnh.png";

// Components
import GridHeader from "./GridHeader";
import ProductPopup from "./ProductPopup";

export default function Grid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const ITEMS_PER_PAGE = 12;

  // Dữ liệu sản phẩm
  const products = [
    {
      id: "SP002",
      name: "Áo Khoác Nữ On Running Weather",
      price: 7060000,
      imgMain: sanPham2,
      imgHover: sanPham2Load,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "1ME1031315",
      name: "Áo Khoác Nam On Running Weather Jacket",
      price: 7060000,
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "GIAY-HOKA-002",
      name: "Giày Chạy Trail Hoka Speedgoat 5",
      price: 5100000,
      imgMain: sanPham2,
      imgHover: sanPham2Load,
      sale: "",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "AO-NIKE-003",
      name: "Áo Thun Chạy Bộ Nike Dri-Fit",
      price: 1200000,
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "25%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "GIAY-ADI-003",
      name: "Giày Adidas Adizero Boston 12",
      price: 4200000,
      imgMain: sanPham2Load,
      imgHover: sanPham2,
      sale: "",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "AO-ADIDAS-004",
      name: "Áo Ba Lỗ Adidas Running",
      price: 950000,
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "QUAN-ON-001",
      name: "Quần Đùi Chạy Bộ On Running 5 Inch",
      price: 2300000,
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "SP003",
      name: "Giày Chạy Bộ Siêu Bền",
      price: 4500000,
      imgMain: mauAnh,
      imgHover: Ao,
      sale: "10%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "GIAY-BROOKS-005",
      name: "Giày Brooks Ghost 15",
      price: 3900000,
      imgMain: sanPham2,
      imgHover: mauAnh,
      sale: "10%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "AO-SALOMON-006",
      name: "Áo Thun Dài Tay Salomon",
      price: 1800000,
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "15%",
      sizes: ["S", "M", "L", "XL"],
    },
  ];

  const TOTAL_PAGES = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Phân trang
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  // Format giá
  const formatPrice = (price) =>
    price.toLocaleString("vi-VN") + " VNĐ";

  // Xem nhanh
  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  // Chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
>>>>>>> origin
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="container mx-auto py-5">
      <GridHeader totalProducts={products.length} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {paginatedProducts.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            state={{ product: p }}
            className="group relative block rounded-lg overflow-hidden text-center bg-white transform transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative group">
              <div className="w-full h-full aspect-square overflow-hidden relative">
                <img
                  src={p.imgHover}
                  alt={p.name}
                  className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
                />
                <img
                  src={p.imgMain}
                  alt={p.name}
                  className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
                />
              </div>

              {/* Icon xem nhanh và chi tiết */}
              <div className="absolute top-[10%] left-[10px] z-30 flex flex-col items-center">
                {/* Xem nhanh */}
                <div className="relative group/zoom">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuickView(p);
                    }}
                    className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity"
                    />
                  </button>
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-40">
                    Xem nhanh
                  </span>
                </div>

                {/* Xem chi tiết */}
                <div className="relative group/eye">
                  <Link
                    to={`/product/${p.id}`}
                    state={{ product: p }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300"
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity"
                    />
                  </Link>
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/eye:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-40">
                    Xem chi tiết
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="mt-2 p-3 text-center">
              <div className="font-medium text-[14px] md:text-lg">{p.name}</div>
              <div className="flex flex-col items-center mt-1">
                <div className="text-red-600 font-bold text-base">
                  {formatPrice(p.price)}
                </div>
                {p.oldPrice && (
                  <div className="text-gray-500 text-sm line-through mt-0.5">
                    {formatPrice(p.oldPrice)}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-1.5 border rounded-md text-sm font-medium ${
              currentPage === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Popup xem nhanh */}
      {quickViewProduct && (
        <ProductPopup product={quickViewProduct} onClose={handleCloseQuickView} />
      )}
>>>>>>> origin
    </div>
  );
}
