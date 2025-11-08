import { useRef, useState } from "react";
import mauAnh from "../assets/mauanh.png";
import Ao from "../assets/Aoremove.png";
import sanPham2 from "../assets/sanpham2.jpg";
import sanPham2Load from "../assets/sanpham2load.jpg";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import ProductPopup from "./ProductPopup";
import ProductCard from "./ProductCard";
import { products } from "../data/products.mock"; // <<< dùng data chung

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


 const newProductsRef = useRef(null);
  const saleProductsRef = useRef(null);
  const newProducts = products.slice(0, 8);
  const saleProducts = products.filter((p) => p.sale);
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
        <div className="absolute w-[242px] h-full z-40 bg-white/60 right-0 lg:hidden xl:block"></div>

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
  <div className="grid grid-cols-2 gap-6 w-full md:flex">
    {newProducts.map((p) => (
      <ProductCard
        key={p.id}
        product={p}
        onQuickView={handleOpenPopup}
      />
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
    {saleProducts.map((p) => (
      <ProductCard
        key={p.id}
        product={p}
        onQuickView={handleOpenPopup}
      />
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
