import { useEffect, useRef, useState } from "react";
import mauAnh from "../assets/mauanh.png";
import Ao from "../assets/Aoremove.png";
import { CiHeart } from "react-icons/ci";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import Footer from "./Footer";
import ScrollTest from "../ScrollTest";
import Panel from "./Panel";
import ProductDescription from "./ProductDescription";
import ProductTabs from "./ProductTabs";
import ProductComposition from "./ProductComposition";

export default function Detail() {
  const location = useLocation();
  const product = location.state?.product;

  // Nếu không có dữ liệu sản phẩm => báo lỗi
  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Không tìm thấy sản phẩm.
      </div>
    );
  }

  // === State ===
  const [selectedImage, setSelectedImage] = useState(product.imgMain || mauAnh);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const ZOOM_SCALE = 3;
  const thumbs = [product.imgMain, product.imgHover, Ao, mauAnh, Ao, mauAnh]; // ảnh phụ demo
  const scrollRef = useRef(null);

  const handleUp = () => {
    scrollRef.current?.scrollBy({ top: -120, behavior: "smooth" });
  };
  const handleDown = () => {
    scrollRef.current?.scrollBy({ top: 120, behavior: "smooth" });
  };
  const handleLeft = () => {
    scrollRef.current?.scrollBy({ left: -100, behavior: "smooth" });
  };
  const handleRight = () => {
    scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });
  };

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) setQuantity(Number(value));
  };

  const [selectedSize, setSelectedSize] = useState(null);

  // Dữ liệu size từ product (nếu có)
  const sizes = product.sizes?.map((s) => ({ label: s, available: true })) || [
    { label: "S", available: false },
    { label: "M", available: false },
    { label: "L", available: true },
    { label: "XL", available: true },
  ];

  const productDescriptionHTML = `
    <h3 style="font-size: 1.25rem; font-weight: 600;">Zoot Elite Tri Aero Fx Racesuit</h3>
    <p>Sự kết hợp hoàn hảo giữa tốc độ, độ thoải mái và phong cách, bộ trisuit Zoot Elite Tri Aero được thiết kế cho những vận động viên ba môn phối hợp tìm kiếm hiệu suất đỉnh cao.</p>
    <img src="https://pos.nvncdn.com/be3294-43017/ps/content/20251021_N7zmH6hG.webp" alt="Product detail" style="width:100%; margin: 1rem 0;" />
    <h4 style="font-weight: 600;">Tính năng nổi bật</h4>
    <ul>
      <li>Vải dệt Exo-Dry™ High Thread Count: hỗ trợ cơ bắp và tăng lưu thông máu.</li>
      <li>Highway Ribbed Fabric: cấu trúc gân khí động học giảm lực cản gió.</li>
      <li>Aeromax™ Mesh Back Panel: phần lưng bằng lưới siêu thoáng, thoát nhiệt.</li>
      <li>Đệm PRO Carbon Tri Chamois: thiết kế riêng cho tư thế aero, êm ái và khô thoáng.</li>
    </ul>
  `;
  const productType = "ao";

  // === Render ===
  return (
    <div className="">
      <NavigationMenu />
      <div className="relative md:grid md:grid-cols-2 md:px-40">
        {/* Zoom Preview */}
        {zoom && (
          <div className="w-[500px] h-[500px] overflow-hidden border-4 border-black absolute right-[270px] top-0 bg-gray-200 z-20 ">
            <img
              className="relative z-20"
              src={selectedImage}
              alt="zoomed"
              style={{
                transform: `scale(${ZOOM_SCALE})`,
                transformOrigin: `${zoomPos.x}px ${zoomPos.y}px`,
                width: "450px",
                height: "450px",
              }}
            />
          </div>
        )}

        {/* Thumbnail + Main Image */}
        <div className="flex flex-col-reverse md:flex-row">
          {/* Thumbnails */}
          <div className="flex flex-col items-center">
            <MdOutlineKeyboardArrowUp
              className={`mb-5 text-2xl hidden md:block cursor-pointer`}
              onClick={handleUp}
            />
            <div className="relative overflow-hidden flex justify-center w-full">
              <MdOutlineKeyboardArrowLeft
                onClick={handleLeft}
                className={`absolute text-2xl left-0 bg-[#313131] z-10 text-white block md:hidden`}
              />
              <div
                ref={scrollRef}
                className="md:flex md:flex-col flex flex-row overflow-hidden scroll-smooth gap-2 max-h-[330px] md:max-h-[330px] w-full"
              >
                {thumbs.map((b, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(b)}
                    className="border mb-5 md:my-2 cursor-pointer h-[100px] w-[25%] sm:w-[90px]  overflow-hidden shrink-0"
                  >
                    <img
                      src={b}
                      alt=""
                      className="max-w-[80%] h-full object-contain mx-auto"
                    />
                  </div>
                ))}
              </div>
              <MdOutlineKeyboardArrowRight
                onClick={handleRight}
                className={`absolute text-2xl right-0 bg-[#313131] text-white block md:hidden`}
              />
            </div>

            <MdOutlineKeyboardArrowDown
              onClick={handleDown}
              className={`mt-5 text-2xl hidden md:block cursor-pointer`}
            />
          </div>

          {/* Main Image */}
          <div
            className="w-full h-[450px] relative overflow-hidden"
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
            <img
              src={selectedImage}
              alt="main"
              className="w-full h-full object-contain"
            />
            {zoom && (
              <div
                className="absolute border-2 border-black w-32 h-32 cursor-pointer bg-white/20"
                style={{
                  left: Math.min(Math.max(zoomPos.x - 46, 0), 450 - 32),
                  top: Math.min(Math.max(zoomPos.y - 16, 0), 450 - 32),
                }}
              />
            )}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col space-y-5 px-4">
          <div className="font-semibold">
            <h1 className="text-xl">{product.name}</h1>
          </div>

          <div className="flex border-b pb-5 w-full gap-2 text-sm text-gray-600">
            <div>
              Thương hiệu:{" "}
              <span className="border-r pr-2 border-black text-gray-400">
                On Running
              </span>
            </div>
            <div>
              Mã SP: <span className="text-gray-400">SV-1ME1031315</span>
            </div>
          </div>

          <div className="flex items-center">
            <p className="mr-2">Giá:</p>
            <div className="inline-block text-lg text-gray-500 relative before:content[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute line-through">
              {product.price}
            </div>
            <p className="text-xl mb-1 ml-2 text-[#f47435]">
              {product.sale ? (
                <>
                  {(
                    parseFloat(product.price.replace(/\D/g, "")) *
                    (1 - parseFloat(product.sale) / 100)
                  ).toLocaleString("vi-VN")}{" "}
                  VNĐ
                </>
              ) : (
                product.price
              )}
            </p>
          </div>

          <div>Chọn Size:</div>
          <div className="flex items-center gap-2 min-w-11 text-center leading-[2] text-[#767676]">
            {sizes.map(({ label, available }) => (
              <div
                key={label}
                onClick={() => available && setSelectedSize(label)}
                className={`border h-[30px] min-w-10 cursor-pointer relative transition-[box-shadow] duration-300 ease-out ${
                  available
                    ? selectedSize === label
                      ? "[box-shadow:0_0_2px_2px_#FF7A00] border-white"
                      : "border-white [box-shadow:0_0_0_1px_#B8B8B8] hover:[box-shadow:0_0_2px_2px_#FF7A00]"
                    : "border border-white bg-gray-300 shadow-sm shadow-slate-500 before:content[''] before:w-[1px] before:h-[40px] before:bg-gray-600 before:absolute before:left-1/2 before:-top-[6px] before:rotate-[55deg] after:content[''] after:w-[1px] after:h-[40px] after:bg-gray-600 after:absolute after:left-1/2 after:-top-[6px] after:-rotate-[55deg]"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          <div>Số lượng:</div>
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
              <button className="bg-[#673AB7] rounded-full text-white py-2.5 px-12">
                THÊM VÀO GIỎ HÀNG
              </button>
              <div className="border p-4 rounded-full cursor-pointer">
                <CiHeart />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b pb-2">
            <p className="text-red-600 font-bold">Đặc điểm nổi bật</p>
            <p>- Chống gió vượt trội</p>
            <p>- Trọng lượng siêu nhẹ: chỉ 230g</p>
            <p>- Hệ thống thoát khí ẩn</p>
            <p>- Gấp gọn vào túi áo</p>
            <p>- Thiết kế khuỷu tay xoắn</p>
          </div>

          <div className="flex gap-20 border-b p-5">
            <p>Chia sẻ:</p>
            <div className="flex gap-4 text-white">
              <div className="flex bg-[#1877f2] px-2 rounded-sm items-center gap-1">
                <AiFillLike />
                <button className="font-bold text-xs">Thích 0</button>
              </div>
              <button className="bg-[#1877f2] font-bold px-3 text-xs rounded-sm">
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:px-40 px-4 mt-8">
        <ProductTabs
          descriptionContent={
            <ProductDescription
              descriptionHtml={productDescriptionHTML}
              productType={productType}
            />
          }
          compositionContent={<ProductComposition />}
        />
      </div>
      <Footer />
      <ScrollTest />
      <Panel />
    </div>
  );
}
