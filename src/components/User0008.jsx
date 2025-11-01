import { useRef, useState } from "react";
import mauAnh from "../assets/mauanh.png";
import Ao from "../assets/Aoremove.png";
import sanPham2 from "../assets/sanpham2.jpg";
import sanPham2Load from "../assets/sanpham2load.jpg";
import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import ProductPopup from "./ProductPopup";

export default function User0008() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const products = [
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: sanPham2,
      imgHover: sanPham2Load,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: sanPham2,
      imgHover: sanPham2Load,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
  ];

  const newProductsRef = useRef(null);
  const saleProductsRef = useRef(null);

  // === Hàm xử lý cuộn ===
  const handleScroll = (direction, ref) => {
    const container = ref.current;
    if (!container) return;

    const scrollAmount = 250;
    if (direction === "next") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  // === UI ===
  return (
    
    <div className="flex flex-col">
      {/* ========== SẢN PHẨM MỚI ========== */}
      <div>
        <div className="w-full text-center mt-10 my-10 font-medium text-4xl text-gray-700">
          <Link>Sản phẩm mới</Link>
        </div>

        <div className="relative">
          <div className="hidden md:block">
            <button
              onClick={() => handleScroll("prev", newProductsRef)}
              className="absolute top-1/3 z-30 left-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7] lg:left-0 xl:left-[250px]"
            >
              <MdKeyboardArrowLeft className="text-white text-[22px]" />
            </button>

            <button
              onClick={() => handleScroll("next", newProductsRef)}
              className="absolute top-1/3 z-30 right-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7] lg:right-0 xl:right-[250px]"
            >
              <MdKeyboardArrowRight className="text-white text-[22px]" />
            </button>
          </div>

          <div className="overflow-hidden" ref={newProductsRef}>
            <div className="grid grid-cols-2 gap-6 w-full md:flex">
                <div className="absolute w-[233px] h-full z-40 bg-white/60 lg:hidden xl:block"></div>
        <div className="absolute w-[242px] h-full z-40 bg-white/60 right-2 lg:hidden xl:block"></div>

              {products.map((p, index) => (
                <Link
                  to="/Detail"
                  state={{ product: p }} // ✅ truyền dữ liệu sản phẩm sang trang Detail
                  key={index}
                  className="h-auto md:w-[233px] w-full flex-shrink-0 lg:w-[300px] xl:w-[233px]"
                >
                  <div className="relative group">
                    {/* ẢNH */}
                    <div className="w-full h-full overflow-hidden relative">
                      <img
                        src={p.imgHover}
                        alt=""
                        className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
                      />
                      <img
                        src={p.imgMain}
                        alt=""
                        className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
                      />
                    </div>

                    {/* NÚT ICON */}
                    <div className="absolute top-[10%] left-[10px]">
                      <div className="flex flex-col items-center">
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenPopup(p);
                          }}
                          className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
                        >
                          <FaSearchPlus className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                        </Link>

                        <Link
                          to="/Detail"
                          state={{ product: p }}
                          className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300"
                        >
                          <FaRegEye className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                        </Link>
                      </div>
                    </div>

                    {/* TÊN + GIÁ */}
                    <div className="mt-2 text-center">
                      <div className="font-medium text-[14px] md:text-lg">
                        {p.name}
                      </div>
                      <div className="text-gray-500">{p.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10 w-full">
          <Link className="bg-[#f47435] py-3 px-6 text-white rounded-full text-xs">
            XEM THÊM
          </Link>
        </div>
      </div>

      {/* ========== SẢN PHẨM SALE ========== */}
      <div>
        <div className="w-full text-center mt-10 my-10 font-medium text-4xl text-gray-700">
          <Link>
            Sản phẩm <span className="text-purple-800 font-bold">Sale Off</span>
          </Link>
        </div>

        <div className="relative">
          <div className="hidden md:block">
              <div className="absolute w-[233px] h-full z-40 bg-white/60 lg:hidden xl:block"></div>
        <div className="absolute w-[242px] h-full z-40 bg-white/60 right-2 lg:hidden xl:block"></div>

            <button
              onClick={() => handleScroll("prev", saleProductsRef)}
              className="absolute top-1/3 z-30 left-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7] lg:left-0 xl:left-[250px]"
            >
              <MdKeyboardArrowLeft className="text-white text-[22px]" />
            </button>

            <button
              onClick={() => handleScroll("next", saleProductsRef)}
              className="absolute top-1/3 z-30 right-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7] lg:right-0 xl:right-[250px]"
            >
              <MdKeyboardArrowRight className="text-white text-[22px]" />
            </button>
          </div>

          <div className="overflow-hidden" ref={saleProductsRef}>
            <div className="grid grid-cols-2 gap-6 w-full md:flex">
              {products.map((p, index) => (
                <Link
                  to="/Detail"
                  state={{ product: p }}
                  key={index}
                  className="h-auto md:w-[233px] w-full flex-shrink-0 lg:w-[300px] xl:w-[233px]"
                >
                  <div className="relative group">
                    <div className="w-full h-full overflow-hidden relative">
                      <img
                        src={p.imgHover}
                        alt=""
                        className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
                      />
                      <img
                        src={p.imgMain}
                        alt=""
                        className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
                      />
                    </div>

                    <div className="absolute top-[10%] left-[10px] flex flex-col items-center">
                      <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
                        {p.sale}
                      </div>

                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenPopup(p);
                        }}
                        className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
                      >
                        <FaSearchPlus className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </Link>

                      <Link
                        to="/Detail"
                        state={{ product: p }}
                        className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300"
                      >
                        <FaRegEye className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </Link>
                    </div>

                    <div className="mt-2 text-center">
                      <div className="font-medium text-[14px] md:text-lg">
                        {p.name}
                      </div>
                      <div className="text-gray-500">{p.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10 w-full">
          <Link className="bg-[#f47435] py-3 px-6 text-white rounded-full text-xs">
            XEM THÊM
  </Link>
</div>

    </div>

      {/* POPUP XEM NHANH */}
      {showPopup && selectedProduct && (
        <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
}