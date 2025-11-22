import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

import NavigationMenu from "./NavigationMenu";
import ScrollTest from "../ScrollTest";
import ProductTabs from "./ProductTabs";
import ProductDescription from "./ProductDescription";
import ProductComposition from "./ProductComposition";
import Panel from "./Panel";
import Footer from "./Footer";
import RelatedProducts from "./RelatedProducts";

import mauAnh from "../assets/mauanh.png";
import Ao from "../assets/Aoremove.png";
import sanPham2 from "../assets/sanpham2.jpg";
import sanPham2Load from "../assets/sanpham2load.jpg";

// ================= DỮ LIỆU GIẢ LẬP =================
const DUMMY_ALL_PRODUCTS = [
  {
    id: "SP002",
    name: "Áo Khoác Nữ On Running Weather",
    price: "7,060,000 VNĐ",
    salePrice: "6,000,000 VNĐ",
    brand: "On Running",
    category: "ao",
    imgMain: sanPham2,
    thumbs: [sanPham2, sanPham2Load, Ao, Ao],
    imgHover: sanPham2Load,
    sale: "20%",
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
    ],
    description: ["- Siêu nhẹ", "- Chống thấm nước"],
  },
  // ... các sản phẩm khác
];

export default function Detail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const allProducts = DUMMY_ALL_PRODUCTS;
  const currentProduct = allProducts.find((p) => p.id === productId);
  const thumbs = currentProduct ? currentProduct.thumbs : [];
  const sizes = currentProduct ? currentProduct.sizes : [];

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Badge cập nhật vào localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartBadge", cart.length.toString());
  }, [cart]);

  useEffect(() => {
    if (currentProduct) setSelectedImage(currentProduct.imgMain);
    window.scrollTo(0, 0);
  }, [productId, currentProduct]);

  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const ZOOM_SCALE = 3;

  const scrollRef = useRef(null);
  const handleUp = () => scrollRef.current?.scrollBy({ top: -120, behavior: "smooth" });
  const handleDown = () => scrollRef.current?.scrollBy({ top: 120, behavior: "smooth" });
  const handleLeft = () => scrollRef.current?.scrollBy({ left: -100, behavior: "smooth" });
  const handleRight = () => scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });

  // ==== XỬ LÝ NÚT THÊM VÀO GIỎ ====
  const isAddDisabled = !selectedSize || quantity < 1;

  const onAddToCart = () => {
    if (isAddDisabled) return;

    const existingIndex = cart.findIndex(
      (item) => item.id === currentProduct.id && item.size === selectedSize
    );

    let newCart;
    if (existingIndex >= 0) {
      newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart = [
        ...cart,
        {
          id: currentProduct.id,
          name: currentProduct.name,
          size: selectedSize,
          quantity,
          price: currentProduct.salePrice,
          img: currentProduct.imgMain,
        },
      ];
    }
    setCart(newCart);

    // Sau khi thêm thì điều hướng qua trang giỏ hàng
    navigate("/cart");
  };

  if (!currentProduct) {
    return (
      <div className="flex flex-col">
        <NavigationMenu />
        <div className="w-full text-center my-20 text-2xl">
          Đang tải sản phẩm hoặc không tìm thấy...
        </div>
        <Footer />
      </div>
    );
  }

  const productDescriptionHTML = `
    <h3 style="font-size: 1.25rem; font-weight: 600;">Zoot Elite Tri Aero Fx Racesuit</h3>
    <p>Bộ trisuit cao cấp cho hiệu suất tối đa.</p>
  `;
  const productType = currentProduct.category;

  return (
    <div className="overflow-hidden">
      <NavigationMenu />

      <div className="relative md:grid md:grid-cols-2 md:px-40">
        {/* ====== ẢNH ZOOM ====== */}
        {zoom && (
          <div className="w-[500px] h-[500px] overflow-hidden border-4 border-black absolute right-[270px] top-0 bg-gray-200 z-20">
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

        {/* ====== CỤM ẢNH NHỎ ====== */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start">
          <div className="flex flex-col items-center">
            <MdOutlineKeyboardArrowUp
              className="mb-5 text-2xl hidden md:block cursor-pointer"
              onClick={handleUp}
            />
            <div className="relative overflow-hidden flex justify-center w-full">
              <MdOutlineKeyboardArrowLeft
                onClick={handleLeft}
                className="absolute text-2xl left-0 bg-[#313131] z-10 text-white block md:hidden"
              />
              <div
                ref={scrollRef}
                className="md:flex md:flex-col flex flex-row overflow-hidden scroll-smooth gap-2 max-h-[330px] md:max-h-[330px] w-full"
              >
                {thumbs.map((b, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(b)}
                    className="border mb-5 md:my-2 cursor-pointer h-[100px] w-[25%] sm:w-[90px] overflow-hidden shrink-0"
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
                className="absolute text-2xl right-0 bg-[#313131] text-white block md:hidden"
              />
            </div>
            <MdOutlineKeyboardArrowDown
              onClick={handleDown}
              className="mt-5 text-2xl hidden md:block cursor-pointer"
            />
          </div>

          {/* ====== ẢNH CHÍNH ====== */}
          <div
            className="w-[450px] h-[450px] relative overflow-hidden"
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
          </div>
        </div>

        {/* ====== THÔNG TIN SP ====== */}
        <div className="flex flex-col space-y-5 px-4 ">
          <h1 className="text-xl font-semibold">{currentProduct.name}</h1>

          <div className="flex border-b pb-5 w-full gap-2">
            <div>
              Thương hiệu:{" "}
              <span className="border-r pr-2 border-black text-gray-400">
                {currentProduct.brand}
              </span>
            </div>
            <div>
              Mã SP: <span className="text-gray-400">{currentProduct.id}</span>
            </div>
          </div>

          <div className="flex items-center">
            <p className="mr-2">Giá:</p>
            <div className="inline-block text-lg text-gray-500 relative line-through">
              {currentProduct.price}
            </div>
            <p className="text-xl mb-1 ml-1 text-red-600 font-semibold">
              {currentProduct.salePrice}
            </p>
          </div>

          <div>Chọn Size:</div>
          <div className="flex items-center gap-2 min-w-11 text-center leading-[2] text-[#767676]">
            {sizes.map(({ label, available }) => (
              <div
                key={label}
                onClick={() => available && setSelectedSize(label)}
                className={`border h-[30px] min-w-10 cursor-pointer relative transition-all duration-300 ease-out 
                ${
                  available
                    ? selectedSize === label
                      ? "[box-shadow:0_0_2px_2px_#FF7A00] border-white"
                      : "border-white [box-shadow:0_0_0_1px_#B8B8B8] hover:[box-shadow:0_0_2px_2px_#FF7A00]"
                    : "border border-white bg-gray-300 shadow-sm shadow-slate-500"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          <div>Số lượng:</div>
          <div className="md:flex items-center gap-4 border-b pb-10">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border h-[50px] rounded-full text-center w-full md:w-[150px]"
            />
            <button
              onClick={onAddToCart}
              disabled={isAddDisabled}
              className={`${
                isAddDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#673AB7] hover:bg-[#5E35B1]"
              } transition-all duration-200 rounded-full text-white font-semibold py-2.5 px-12 shadow-md`}
            >
              THÊM VÀO GIỎ HÀNG
            </button>
            <div className="border p-4 rounded-full cursor-pointer">
              <CiHeart />
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b pb-2">
            <p className="text-red-600 font-bold">Đặc điểm nổi bật</p>
            {currentProduct.description.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
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

      <RelatedProducts
        allProducts={allProducts}
        currentProductId={currentProduct.id}
        currentCategory={currentProduct.category}
      />

      <Footer />
      <ScrollTest />
      <Panel />
    </div>
  );
}
