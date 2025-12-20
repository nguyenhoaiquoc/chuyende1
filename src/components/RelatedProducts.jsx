import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductPopup from "./ProductPopup";

/**
 * RelatedProducts
 * - Hiển thị sản phẩm liên quan
 * - Ưu tiên: cùng subcategory
 * - Fallback: cùng category
 */
export default function RelatedProducts({
  currentProductId,
  allProducts = [],
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ================= CURRENT PRODUCT ================= */

  const currentProduct = useMemo(() => {
    return allProducts.find((p) => p.id === currentProductId);
  }, [allProducts, currentProductId]);

  if (!currentProduct) return null;

  /* ================= RELATED PRODUCTS ================= */

  const relatedProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (p.id === currentProductId) return false;

      // Ưu tiên mạnh nhất: cùng subcategory
      if (
        p.subcategoryId &&
        currentProduct.subcategoryId &&
        p.subcategoryId === currentProduct.subcategoryId
      ) {
        return true;
      }

      // Fallback: cùng category (Đồ Nam / Đồ Nữ / Đồng hồ)
      if (
        p.categoryId &&
        currentProduct.categoryId &&
        p.categoryId === currentProduct.categoryId
      ) {
        return true;
      }

      return false;
    });
  }, [allProducts, currentProduct, currentProductId]);

  if (relatedProducts.length === 0) return null;

  /* ================= HANDLERS ================= */

  const handleOpenPopup = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  /* ================= RENDER ================= */

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <div className="w-full text-center mb-10 font-medium text-4xl text-gray-700">
        Sản phẩm liên quan
      </div>

      <Swiper
        spaceBetween={24}
        slidesPerView={2}
        loop
        breakpoints={{
          768: { slidesPerView: 4 },
        }}
      >
        {relatedProducts.map((p) => {
          const basePrice =
            typeof p.price === "number" ? p.price : null;
          const salePercent =
            typeof p.sale === "number" ? p.sale : 0;

          let finalPrice = basePrice;
          if (basePrice && salePercent > 0) {
            finalPrice = Math.round(
              basePrice * (1 - salePercent / 100)
            );
          }

          return (
            <SwiperSlide key={p.id}>
              <Link to={`/product/${p.id}`} className="block">
                <div className="relative group">
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={p.imgHover}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover 
                        -translate-x-full group-hover:translate-x-0 
                        transition-transform duration-500 z-10"
                    />
                    <img
                      src={p.imgMain}
                      alt={p.name}
                      className="relative z-20 w-full h-full object-cover 
                        group-hover:scale-0 transition-transform duration-500"
                    />
                  </div>

                  {/* ACTIONS */}
                  <div className="absolute top-[10%] left-[10px] z-30">
                    {salePercent > 0 && (
                      <div className="mb-4 bg-purple-800 text-white text-[10px] 
                        font-bold w-[34px] h-[34px] flex items-center 
                        justify-center rounded-b-full">
                        -{salePercent}%
                      </div>
                    )}

                    <button
                      onClick={(e) => handleOpenPopup(e, p)}
                      className="hidden md:flex mb-3 bg-white hover:bg-purple-800 
                        hover:text-white p-3 rounded transition"
                    >
                      <FaSearchPlus className="text-xs" />
                    </button>

                    <Link
                      to={`/product/${p.id}`}
                      className="flex bg-white hover:bg-purple-800 
                        hover:text-white p-3 rounded transition"
                    >
                      <FaRegEye className="text-xs" />
                    </Link>
                  </div>

                  {/* INFO */}
                  <div className="mt-3 text-center">
                    <div className="font-medium text-sm md:text-base">
                      {p.name}
                    </div>

                    <div className="mt-1">
                      {salePercent > 0 && basePrice && (
                        <span className="text-gray-400 text-xs line-through mr-2">
                          {basePrice.toLocaleString("vi-VN")} VNĐ
                        </span>
                      )}

                      {finalPrice && (
                        <span className="text-red-600 font-semibold text-sm">
                          {finalPrice.toLocaleString("vi-VN")} VNĐ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {showPopup && selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
