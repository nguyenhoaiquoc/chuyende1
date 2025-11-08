// src/components/Grid.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import GridHeader from "./GridHeader";
import ProductPopup from "./ProductPopup";

// 👉 Dữ liệu sản phẩm dùng chung
import { products as PRODUCT_DATA } from "../data/products.mock";

export default function Grid({ products: productsProp }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const ITEMS_PER_PAGE = 12;

  // Nếu component cha không truyền prop thì dùng data chung
  const products = productsProp ?? PRODUCT_DATA;
  const TOTAL_PAGES = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Phân trang
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  // Format giá tiền
  const formatPrice = (price) =>
    Number(price).toLocaleString("vi-VN") + " VNĐ";

  // Xử lý xem nhanh
  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  // Chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
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
            {/* Vùng ảnh sản phẩm */}
            <div className="relative group">
              <div className="w-full h-full aspect-square overflow-hidden relative">
                <img
                  src={p.imgHover || p.imgMain}
                  alt={p.name}
                  className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
                />
                <img
                  src={p.imgMain}
                  alt={p.name}
                  className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
                />
              </div>

              {/* --- BADGES --- */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                {/* Giảm giá góc trái */}
                {p.sale && (
<span className="absolute top-2 left-2 bg-purple-700 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                    {p.sale}
                  </span>
                )}

                {/* Hộp quà chính giữa ảnh */}
                {p.gift && (
                  <span className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black text-xs px-3 py-2 rounded-md shadow-md">
                    🎁
                  </span>
                )}

                {/* BEST SELLER góc phải */}
                {p.bestseller && (
                  <span className="absolute top-3 right-[-30px] bg-red-600 text-white text-[10px] font-bold px-6 py-1 rotate-45 shadow-md">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* --- ICONS: Xem nhanh / Xem chi tiết --- */}
              <div className="absolute top-[10%] left-[10px] z-40 flex flex-col items-center">
                {/* Xem nhanh */}
                <div className="relative group/zoom">
                  <button
                    type="button"
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

            {/* --- THÔNG TIN SẢN PHẨM --- */}
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

      {/* --- PHÂN TRANG --- */}
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
    </div>
  );
}