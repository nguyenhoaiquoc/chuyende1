import { useRef, useState } from "react";
import mauAnh from "../assets/mauanh.png";
import Ao from "../assets/Aoremove.png";
import sanPham2 from "../assets/sanpham2.jpg";
import sanPham2Load from "../assets/sanpham2load.jpg";
import { Link } from "react-router-dom";
import { FaSearchPlus, FaRegEye } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function User0008() {
 

  const products = [
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: sanPham2,
    imgHover: sanPham2Load,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },
    {
     name: "Áo Khoác Chạy Bộ Name On Running Men's Weather",
    price: "7,060,000 VNĐ",
    imgMain: Ao,
    imgHover: mauAnh,
    sale: "20%",
    },

  ]

  const scrollRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);



  // === Hàm xử lý cuộn ===
  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 250; // mỗi lần cuộn bao nhiêu px
    if (direction === "next") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setClickCount((prev) => prev + 1);
    } else if (direction === "prev") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setClickCount((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="">
      <div className="w-full text-center mt-10 my-10 font-medium text-4xl text-gray-700">
        <Link>Sản phẩm mới</Link>
      </div>

      <div className="relative">
        <div className="hidden md:block">
              <div className="absolute w-[233px] h-full z-40 bg-white/60"></div>
        <div className="absolute w-[242px] h-full z-40 bg-white/60 right-2"></div>

        <button
          onClick={() => handleScroll("prev")}
          className="absolute top-1/3 z-30 left-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7]"
        >
          <MdKeyboardArrowLeft className="text-white text-[22px]" />
        </button>

        <button
          onClick={() => handleScroll("next")}
          className="absolute top-1/3 z-30 right-[250px] bg-[#f47435] rounded-full p-2 hover:bg-[#673ab7]"
        >
          <MdKeyboardArrowRight className="text-white text-[22px]" />
        </button>
        </div>
      

        <div className="overflow-hidden" ref={scrollRef}>
          <div className="md:flex gap-6 gird grid-cols-2 ">
            {products.map((p, index) => (
              <button key={index} className="h-auto md:w-[233px] w-[200px] flex-shrink-0">
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
                        {index % 2 !== 0 && (
                               <div className="relative flex items-center justify-center pb-1 bg-purple-800 text-white text-[10px] font-bold mb-6 rounded-b-full z-30 w-[33px] h-[33px] before:content-[''] before:absolute before:inset-0.5 before:border before:z-0 before:rounded-b-full">
                        {p.sale}
                      </div>
                        )}
                   
                      <Link className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300">
                        <FaSearchPlus className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity" />
                      </Link>
                      <Link className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300">
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
              </button>
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
  );
}
