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
      id: "SP002", // Áo
      name: "Áo Khoác Nữ On Running Weather",
      price: "7,060,000 VNĐ",
      imgMain: sanPham2,
      imgHover: sanPham2Load,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "1ME1031315", // Áo
      name: "Áo Khoác Nam On Running Weather Jacket",
      price: "7,060,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "20%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "GIAY-HOKA-002", // Giày
      name: "Giày Chạy Trail Hoka Speedgoat 5",
      price: "5,100,000 VNĐ",
      imgMain: sanPham2, // (Nên thay ảnh)
      imgHover: sanPham2Load, // (Nên thay ảnh)
      sale: "",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "AO-NIKE-003", // Áo
      name: "Áo Thun Chạy Bộ Nike Dri-Fit",
      price: "1,200,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "25%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "GIAY-ADI-003", // Giày
      name: "Giày Adidas Adizero Boston 12",
      price: "4,200,000 VNĐ",
      imgMain: sanPham2Load,
      imgHover: sanPham2,
      sale: "",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "AO-ADIDAS-004", // Áo
      name: "Áo Ba Lỗ Adidas Running",
      price: "950,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "QUAN-ON-001", // Quần
      name: "Quần Đùi Chạy Bộ On Running 5 Inch",
      price: "2,300,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "SP003", // Giày
      name: "Giày Chạy Bộ Siêu Bền",
      price: "4,500,000 VNĐ",
      imgMain: mauAnh,
      imgHover: Ao,
      sale: "10%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "GIAY-BROOKS-005", // Giày
      name: "Giày Brooks Ghost 15",
      price: "3,900,000 VNĐ",
      imgMain: sanPham2,
      imgHover: mauAnh,
      sale: "10%",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: "AO-SALOMON-006", // Áo
      name: "Áo Thun Dài Tay Salomon",
      price: "1,800,000 VNĐ",
      imgMain: Ao,
      imgHover: mauAnh,
      sale: "15%",
      sizes: ["S", "M", "L", "XL"],
    },
  ];

 const newProductsRef = useRef(null);
  const saleProductsRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);

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

  return (
    
    <div className="flex flex-col">
        <div className="">
      <div className="w-full text-center mt-10 my-10 font-medium text-4xl text-gray-700">
        <Link>Sản phẩm mới</Link>
      </div>

      <div className="relative">
        <div className="hidden md:block">
              <div className="absolute w-[233px] h-full z-40 bg-white/60 lg:hidden xl:block"></div>
        <div className="absolute w-[242px] h-full z-40 bg-white/60 right-2 lg:hidden xl:block"></div>

        <button
         onClick={() => handleScroll("prev", newProductsRef)}
          className="absolute top-1/3 z-30 left-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7] lg:left-0 xl:left-[250px]"
        >
          <MdKeyboardArrowLeft className="text-white text-[22px]" />
        </button>

        <button
           onClick={() => handleScroll("next", newProductsRef)}
          className="absolute top-1/3 z-30 right-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7]  lg:right-0 xl:right-[250px]"
        >
          <MdKeyboardArrowRight className="text-white text-[22px]" />
        </button>
        </div>
      

        <div className="overflow-hidden" ref={newProductsRef}>
          <div className=" grid grid-cols-2 gap-6 w-full md:flex  ">
            {products.map((p, index) => (
                <Link to={`/product/${p.id}`} key={p.id} className="h-auto md:w-[233px] w-full flex-shrink-0 lg:w-[300px] xl:w-[233px]">                <div className="relative group">
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

                  <div className="absolute top-[10%] left-[10px]">
                    <div className="flex flex-col items-center">
                      <Link onClick={() => handleOpenPopup(p)} className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block">
                        <FaSearchPlus className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </Link>
                      <Link to={`/product/${p.id}`} className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300 ">
                        <FaRegEye className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </Link>
                    </div>
                  </div>

                  <div className="">
                    <div className="text-center font-medium text-[14px] md:text-lg  ">{p.name}</div>
                    <div className="text-center">
                      <div className="inline-block text-gray-500 relative before:content[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute">
                        {p.price}
                      </div>
                    </div>
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
        <div className="">
      <div className="w-full text-center mt-10 my-10 font-medium text-4xl text-gray-700">
        <Link>Sản phẩm  <span className="text-purple-800 font-bold">Sale Of</span></Link>
      </div>

      <div className="relative">
        <div className="hidden md:block">
              <div className="absolute w-[233px] h-full z-40 bg-white/60 lg:hidden xl:block"></div>
        <div className="absolute w-[242px] h-full z-40 bg-white/60 right-0 lg:hidden xl:block"></div>

        <button
          onClick={() => handleScroll("prev", saleProductsRef)}
          className="absolute top-1/3 z-30 left-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7] lg:left-0 xl:left-[250px]"
        >
          <MdKeyboardArrowLeft className="text-white text-[22px]" />
        </button>

        <button
           onClick={() => handleScroll("next", saleProductsRef)}
          className="absolute top-1/3 z-30 right-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7]  lg:right-0 xl:right-[250px]"
        >
          <MdKeyboardArrowRight className="text-white text-[22px]" />
        </button>
        </div>

        <div className="overflow-hidden" ref={saleProductsRef}>
          <div className="md:flex gap-6 grid grid-cols-2 w-full">
            {products.map((p, index) => (
              <Link to={`/product/${p.id}`} key={p.id} className="h-auto md:w-[233px] w-full flex-shrink-0 lg:w-[300px] xl:w-[233px]">
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

                  <div className="absolute top-[10%] left-[10px]">
                    <div className="flex flex-col items-center">
                
                               <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
                        {p.sale}
                      </div>
              
                   
                      <Link onClick={() => handleOpenPopup(p)} className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block">
                        <FaSearchPlus  className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </Link>
                      <Link to={`/product/${p.id}`} className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300 ">
                        <FaRegEye className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </Link>
                    </div>
                  </div>

                  <div className="">
                    <div className="text-center font-medium text-[14px] md:text-lg  ">{p.name}</div>
                    <div className="text-center">
                      <div className="inline-block text-gray-500 relative before:content[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute">
                        {p.price}
                      </div>
                    </div>
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

{showPopup && selectedProduct && (
  <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
)}
    </div>
  );
}
