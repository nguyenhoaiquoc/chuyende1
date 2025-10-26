import { useEffect, useRef, useState } from "react";
import mauAnh from "../assets/mauanh.png";
import Ao from "../assets/Aoremove.png";
import { CiHeart } from "react-icons/ci";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import Panel from "./Panel";
import ScrollTest from "../ScrollTest";

export default function Detail() {
  const [selectedImage, setSelectedImage] = useState(mauAnh);
  const ZOOM_SCALE = 3;
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const thumbs = [Ao, Ao, Ao, mauAnh, Ao, mauAnh];
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0)
  const step = 120; // độ dịch mỗi lần bấm

  const canScrollUp =  offsetY < 0;
  const canScrollDown = Math.abs(offsetY) < (thumbs.length - 3) * step;

  const stepMobile = 110;

const canScrollLeft = offsetX < 0;
const canScrollRight = Math.abs(offsetX) < (thumbs.length - 5) * stepMobile;

 const handleUp = () => {
  if (canScrollUp) setOffsetY(prev => Math.min(prev + step, 0));
};

const handleDown = () => {
  if (canScrollDown) setOffsetY(prev => prev - step);
};
 const handleLeft = () => {
  if (canScrollLeft) setOffsetX(prev => Math.min(prev + stepMobile, 0));
};

const handleRight = () => {
  if (canScrollRight) setOffsetX(prev => prev - stepMobile);
};
const [quantity, setQuantity] = useState(1);
const handleQuantityChange = (e) => {
  const value = e.target.value;

  // Chỉ cho phép số nguyên dương
  if (/^\d+$/.test(value)) {
    setQuantity(Number(value));
  }
};

  return (
    <div className="">
    
    

      <div className="relative md:grid md:grid-cols-2 md:px-40">

        {/* Zoomed view */}
        {zoom && (
          <div className="w-[500px] h-[500px] overflow-hidden border-4 border-black absolute right-[270px] top-0 bg-gray-200 z-20 ">
            <img
              className="relative z-20"
              src={selectedImage}
              alt=""
              style={{
                transform: `scale(${ZOOM_SCALE})`,
                transformOrigin: `${zoomPos.x}px ${zoomPos.y}px`,
                width: '450px',
                height: '450px',
              }}
            />
          </div>
        )}

        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex flex-col items-center">
            <MdOutlineKeyboardArrowUp className={`mb-5 text-2xl hidden md:block cursor-pointer ${!canScrollUp ? "opacity-40 pointer-events-none" : ""}`} onClick={handleUp} />
            <div className="relative max-w-[400px] overflow-hidden md:max-w-none md:h-[350px] flex justify-center">
                <MdOutlineKeyboardArrowLeft onClick={handleLeft} className={ `absolute text-2xl left-0 bg-[#313131] z-10 text-white  block md:hidden ${!canScrollLeft ? "opacity-40 pointer-events-none" : ""} `} />
               <div className="md:block flex items-center relative  max-h-[350px] justify-center gap-4 transition-transform duration-300"
               style={{
              transform: window.innerWidth >= 768
                ? `translateY(${offsetY}px)`
                : `translateX(${offsetX}px)`
            }} >
             
              {thumbs.map((b, index) => (
                <div key={index} onClick={ () =>  setSelectedImage(b)} className="border w-[90px] h-[91px] mb-5 md:h-[111px] md:my-2 cursor-pointer " ><img src={b} alt="" className="max-w-[100%] h-full object-contain mx-auto" /></div>
              ))}

       
            </div>
                   <MdOutlineKeyboardArrowRight onClick={handleRight} className={ `absolute text-2xl right-0 bg-[#313131] text-white block md:hidden ${!canScrollRight ? "opacity-40 pointer-events-none" : ""}` } />
            </div>
           

            <MdOutlineKeyboardArrowDown onClick={handleDown} className={`mt-5 text-2xl hidden md:block cursor-pointer ${!canScrollDown ? "opacity-40 pointer-events-none" : ""}`} />

          </div>
          <div
            className="w-[450px] h-[450px] relative  overflow-hidden"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              let x = e.clientX - rect.left;
              let y = e.clientY - rect.top;
              x = Math.max(0, Math.min(x, rect.width));
              y = Math.max(0, Math.min(y, rect.height));
              setZoomPos({ x, y });
            }}
          >
            <img src={selectedImage} alt="main" className="w-full h-full object-contain" />

            {zoom && (
              <div className="absolute border-2 border-black w-32 h-32 cursor-pointer bg-white/20"
                style={{
                  left: Math.min(Math.max(zoomPos.x - 46, 0), 450 - 32),
                  top: Math.min(Math.max(zoomPos.y - 16, 0), 450 - 32)
                }}
              />
            )}
          </div>

        </div>
        <div className="flex flex-col space-y-5 px-4 ">
          <div className="font-semibold">
            <h1 className="text-xl">Áo Khoác Chạy Bộ Nam On Running Men's Weather Jacket - Desert/Cinder</h1>
          </div>

          <div className="flex border-b pb-5 w-full gap-2">
            <div className="">Thương hiêu: <span className="border-r pr-2 border-black text-gray-400">On Running</span></div>
            <div className="">Mã SP: <span className="text-gray-400">SV-1ME1031315</span></div>
          </div>

          <div className="flex items-center">
            <p className="mr-2">Giá:</p>

            <div className="inline-block text-lg text-gray-500 relative before:content[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute">
              7,060,000 VNĐ
            </div>

            <p className="text-xl mb-1 ml-1">5,648,000 VNĐ</p>
          </div>

          <div className="">chọn Size:</div>
          <div className="flex items-center gap-2 min-w-11 text-center leading-[2] text-[#767676]">
            <div className="border border-white [box-shadow:0_0_0_1px_#B8B8B8] hover:[box-shadow:0_0_2px_2px_#FF7A00] transition-[box-shadow] duration-300 ease-out h-[30px] min-w-10 cursor-pointer">XL</div>
            <div className="border border-white bg-gray-300 shadow-sm shadow-slate-500 h-[30px] min-w-10 relative 
          before:content[''] before:w-[1px] before:h-[40px] before:bg-gray-600 before:absolute  before:left-1/2  before:-top-[6px] before:rotate-[55deg]
          after:content[''] after:w-[1px] after:h-[40px] after:bg-gray-600 after:absolute  after:left-1/2  after:-top-[6px] after:-rotate-[55deg]
          ">S</div>
            <div className="border border-white bg-gray-300 shadow-sm shadow-slate-500 h-[30px] min-w-10 relative 
          before:content[''] before:w-[1px] before:h-[40px] before:bg-gray-600 before:absolute  before:left-1/2  before:-top-[6px] before:rotate-[55deg]
          after:content[''] after:w-[1px] after:h-[40px] after:bg-gray-600 after:absolute  after:left-1/2  after:-top-[6px] after:-rotate-[55deg]
          ">M</div>
          </div>

          <div className="">Số lương:</div>
          <div className="md:flex items-center gap-4 border-b pb-10">
            <div className="mb-5 md:mb-0"> 
              

              <input
    type="number"
    min="1"
    value={quantity}
    onChange={handleQuantityChange}
    className="border h-[50px] rounded-full text-center w-full md:w-auto"
  />
  
              </div>
            <div className="flex justify-center gap-2">
              <button className="bg-[#673AB7] rounded-full text-white py-2.5 px-12">THÊM VÀO GIỎ HÀNG</button>
              <div className="border p-4 rounded-full cursor-pointer "><CiHeart /></div>
            </div>

          </div>
          <div className="flex flex-col gap-4 border-b pb-2">
            <p className="text-red-600 font-bold">Đặc điểm nổi bật</p>
            <p className="">- Chống gió vượt trội</p>
            <p className="">- Trọng lượng siêu nhẹ: chỉ 230g</p>
            <p className="">- Hệ thống thoát khí ẩn</p>
            <p className="">- Gấp gọn vào túi áo</p>
            <p className="">- Thiết kế khuỷu tay xoắn</p>
          </div>
              <div className="flex gap-20 border-b p-5">


                  <p className="">Chia sẻ:</p>
                  <div className="flex gap-4 text-white">
                    <div className="flex bg-[#1877f2]  px-2 rounded-sm items-center gap-1">
                       <AiFillLike/>
                        <button className="font-bold  text-xs">Thích 0</button>
                     
                    </div>
                  

                  <button className="bg-[#1877f2] font-bold px-3 text-xs rounded-sm">Chia sẻ</button>

                  </div>
                  

              </div>
        </div>
      </div>

            <ScrollTest/>
      <Panel/>
    </div>
  )
}