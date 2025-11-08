// ProductCard.jsx
import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";
import ProductPopup from "./ProductPopup"; // nếu card tự không xử popup thì bỏ

export default function ProductCard({ product, onQuickView }) {
  const { id, name, price, imgMain, imgHover, sale } = product;

  return (
    <div className="h-auto md:w-[233px] w-full flex-shrink-0 lg:w-[300px] xl:w-[233px]">
      <div className="relative group">
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

        <div className="absolute top-[10%] left-[10px]">
          <div className="flex flex-col items-center">
            {sale && (
              <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
                {sale}
              </div>
            )}

            {/* Quick view: dùng button, tránh Link lồng Link */}
            <button
              type="button"
              onClick={() => onQuickView?.(product)}
              className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
            >
              <FaSearchPlus className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
            </button>

            <Link
              to={`/product/${id}`}
              className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300 "
            >
              <FaRegEye className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
            </Link>
          </div>
        </div>

        <div>
          <div className="text-center font-medium text-[14px] md:text-lg">
            {name}
          </div>
          <div className="text-center">
            <div className="inline-block text-gray-500 relative before:content-[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute">
              {price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
