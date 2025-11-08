// (Trong RelatedProducts.jsx)

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";
import ProductPopup from "./ProductPopup"; 

// === 1. BỎ IMPORT CÁC MODULE KHÔNG DÙNG ===
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Scrollbar } from 'swiper/modules'; // <-- XÓA DÒNG NÀY

// === 2. BỎ IMPORT CSS CỦA CÁC MODULE KHÔNG DÙNG ===
import 'swiper/css';
// import 'swiper/css/pagination'; // <-- XÓA DÒNG NÀY
// import 'swiper/css/scrollbar'; // <-- XÓA DÒNG NÀY


export default function RelatedProducts({
  currentProductId,
  currentCategory,
  allProducts,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const relatedProducts = allProducts.filter(
    (p) => p.category === currentCategory && p.id !== currentProductId
  );

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

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <div className="w-full text-center mb-10 font-medium text-4xl text-gray-700">
        Sản phẩm liên quan
      </div>

      <Swiper
        // === 3. XÓA BỎ "Pagination" và "Scrollbar" khỏi modules ===
        // modules={[Pagination, Scrollbar]} // <-- DÒNG CŨ
        modules={[]} // <-- DÒNG MỚI: Không cần module nào nếu không có pagination/scrollbar/navigation
        
        spaceBetween={24} 
        slidesPerView={2}  
        loop={true} 
        // === 4. XÓA BỎ CÁC THUỘC TÍNH pagination và scrollbar ===
        // pagination={{ clickable: true }} // <-- XÓA DÒNG NÀY
        // scrollbar={{ draggable: true }} // <-- XÓA DÒNG NÀY
        
        breakpoints={{
          768: {
            slidesPerView: 4, 
          },
        }}
        // className="pb-10" // <-- Dòng này cũng không cần nữa nếu không có pagination/scrollbar
      >
        {relatedProducts.map((p) => (
          <SwiperSlide key={p.id}>
            <Link
              to={`/product/${p.id}`} 
              className="h-auto block" 
            >
              <div className="relative group">
                <div className="w-full h-full overflow-hidden relative">
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

                <div className="absolute top-[10%] left-[10px]">
                  <div className="flex flex-col items-center">
                    {p.sale && (
                      <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
                        {p.sale}
                      </div>
                    )}
                    <Link
                      onClick={(e) => handleOpenPopup(e, p)} 
                      className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
                    >
                      <FaSearchPlus className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                    </Link>
                    <Link
                      to={`/product/${p.id}`} 
                      className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300 "
                    >
                      <FaRegEye className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                    </Link>
                  </div>
                </div>

                <div className="">
                  <div className="text-center font-medium text-[14px] md:text-lg">
                    {p.name}
                  </div>
                  <div className="text-center">
                    <div className="inline-block text-gray-500 relative before:content[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute">
                      {p.price}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {showPopup && selectedProduct && (
        <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
}