import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";
import sanPham2 from "../assets/sanpham2.jpg";
import Ao from "../assets/Aoremove.png";
import ProductPopup from "./ProductPopup";

const ProductCard = ({ product, onQuickView }) => {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden shadow-sm text-center hover:shadow-lg transition duration-300">
      {/* Hình ảnh sản phẩm */}
      
        <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
          <Link to="/Detail">
          <img
            src={product.imgMain}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-110"
          />
          <img
            src={product.imgHover}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
          />

          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-purple-700 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              -{discountPercent}%
            </div>
          )}

          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2421/2421699.png"
              alt="gift"
              className="w-5 h-5"
            />
          </div>

          </Link>
          <div className="absolute top-2 right-2 bg-[#f47435] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md uppercase">
            Bestseller
          </div>
        </div>
      {/* Icons hover */}
      <div className="absolute top-12 left-3 flex flex-col gap-3 z-20">
        <div className="relative group/icon">
          <button
            onClick={() => onQuickView(product)}
            className="flex flex-col items-center bg-white text-gray-700 hover:bg-purple-800 hover:text-white p-2 rounded-md shadow-md transition-colors"
          >
            <FaSearchPlus className="text-[14px]" />
          </button>
          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300">
            Xem nhanh
          </span>
        </div>

        <div className="relative group/icon">
          <button
            onClick={() => (window.location.href = "/Detail")}
            className="flex flex-col items-center bg-white text-gray-700 hover:bg-purple-800 hover:text-white p-2 rounded-md shadow-md transition-colors"
          >
            <FaRegEye className="text-[14px]" />
          </button>
          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300">
            Xem chi tiết
          </span>
        </div>
      </div>

      {/* Tên và giá sản phẩm */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex flex-col justify-center items-center mt-1">
          <span className="text-base font-bold text-[#f47435]">
            {product.price.toLocaleString()} đ
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through mt-1">
              {product.oldPrice.toLocaleString()} đ
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Grid() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const products = [...Array(12).keys()].map((i) => ({
    id: i + 1,
    name: `Áo Khoác Chạy Bộ ${i + 1}`,
    price: (Math.floor(Math.random() * 150) + 50) * 1000,
    oldPrice:
      Math.random() > 0.5
        ? (Math.floor(Math.random() * 200) + 150) * 1000
        : null,
    imgMain: sanPham2,
    imgHover: Ao,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-3xl font-semibold text-gray-700 mb-8">
        Danh sách sản phẩm
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={handleQuickView} />
        ))}
      </div>

      {showPopup && selectedProduct && (
        <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
}
