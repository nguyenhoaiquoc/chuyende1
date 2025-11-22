// ProductCard.jsx
import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";

export default function ProductCard({ product, onQuickView, hideSale }) {
  const { id, name, price, oldPrice, imgMain, imgHover, sale } = product;

  return (
    <div className="h-auto md:w-[233px] w-full flex-shrink-0 lg:w-[300px] xl:w-[233px]">
      <div className="relative group">
        {/* ẢNH – CLICK ĐỂ XEM CHI TIẾT */}
        <a href="/">
          <div className="w-full h-full overflow-hidden relative">
            <img
              src={imgHover}
              alt={name}
              className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
            />
            <img
              src={imgMain}
              alt={name}
              className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
            />
          </div>
        </a>

        {/* ICONS */}
        <div className="absolute top-[10%] left-[10px]">
          <div className="flex flex-col items-center">
            {/* SALE */}
            {!hideSale && sale && (
              <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
                {sale}%
              </div>
            )}

            {/* QUICK VIEW */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
              className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
            >
              <FaSearchPlus className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
            </button>

            {/* XEM CHI TIẾT */}
            <Link
              to={`/product/${id}`}
              state={{ product }}
              className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300"
            >
              <FaRegEye className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
            </Link>
          </div>
        </div>

        {/* THÔNG TIN */}
        <div className="mt-2 text-center font-medium text-[14px] md:text-lg">
          {name}
        </div>

        <div className="text-center mt-1">
          <div className="text-red-600 font-bold text-base">
            {Number(price).toLocaleString("vi-VN")}₫
          </div>

          {oldPrice && (
            <div className="text-gray-500 text-sm line-through">
              {Number(oldPrice).toLocaleString("vi-VN")}₫
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
