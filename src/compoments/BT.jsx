import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaBars } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { IoMdCart } from "react-icons/io";
import logo from "../assets/logoImSport.png";
import vn from "../assets/vn.png";
import eng from "../assets/eng.png";

export default function BT({ onMenuToggle }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className={`md:px-12 md:mt-7 mt-5 px-10  pb-8`}>

        <div className="flex justify-between items-center ">
          <div className="block md:hidden">
            <button onClick={onMenuToggle}>

              <FaBars className="text-2xl hover:text-purple-600" />
            </button >

          </div>

          <div className="">
            <a href="#"> <img className="w-[138px] h-[26px] sm:w-[180px] sm:h-[34px]" src={logo} alt="" /> </a>
          </div>

          <div className="flex items-center gap-2 ">
            <form action="" className="relative">
              <input type="text" className="hidden md:block w-[260px] h-[34px] pl-2 border border-gray-400" placeholder="Tìm..." />
              <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 lg:text-xl cursor-pointer" onClick={() => setShowSearch(!showSearch)} />



            </form>

            <Link> <FaUser className="hidden md:block mb-1 hover:text-purple-500 ml-3" /> </Link>
            <Link className="relative"> <HiShoppingBag className="  ml-3 text-xl lg:mb-1 hover:text-purple-500 hidden md:block" />

              <IoMdCart className="  ml-3 text-xl lg:mb-1 block md:hidden" />
              <span className="absolute -right-4 -top-3 bg-red-500 text-white px-[8px] py-[2px] text-[12px] rounded-full">0</span>
            </Link>

            <div className="pl-3 hidden md:block">
              <Link><img className="w-[24px] h-[24px] " src={vn} alt="" /></Link>
            </div>

            <div className="border-l border-black pl-2 hidden md:block">
              <Link><img className="w-[22px] h-[22px]" src={eng} alt="" /></Link>
            </div>
          </div>
        </div>

      </div>

      <div
        className={`z-30 md:hidden absolute right-0 bg-gray-400  shadow-md overflow-hidden  transition-all duration-500 ease-in-out ${showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <form action="">
          <input
            type="text"
            className="w-[280px] h-[34px] pl-2 border-none bg-gray-200 relative  "
            placeholder="Tìm kiếm..."
          />
          <Link><FaSearch className="absolute bottom-2 right-1" onClick={() => setShowSearch(!showSearch)} /></Link>

        </form>

      </div>

    </>
  );
}