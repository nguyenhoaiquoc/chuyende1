import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import mauAnh from "../assets/mauanh.png";

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

import { products } from "../data/products.mock";

export default function Detail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const allProducts = products;
  const currentProduct = allProducts.find((p) => p.id === Number(productId));

  // Thương hiệu
  const brandName = currentProduct?.brandId || "";

  // Ảnh thumbnails
  const thumbs = currentProduct
    ? currentProduct.images && currentProduct.images.length > 0
      ? currentProduct.images
      : [currentProduct.imgMain, currentProduct.imgHover].filter(Boolean)
    : [];

  // Size hiển thị (string → {label, available})
  const sizes = currentProduct
    ? Array.isArray(currentProduct.sizes)
      ? currentProduct.sizes.map((s) =>
          typeof s === "string" ? { label: s, available: true } : s
        )
      : []
    : [];

  const description = currentProduct?.description || [];

  // ==== TÍNH GIÁ: GIÁ GỐC + % GIẢM (Number) → GIÁ SALE ====

  // Giá gốc dạng số
  const basePrice =
    currentProduct && typeof currentProduct.price === "number"
      ? currentProduct.price
      : 0;

  // % giảm: sale là Number
  const salePercent =
    currentProduct && typeof currentProduct.sale === "number"
      ? currentProduct.sale
      : 0;

  // Tính giá sale nếu có giảm
  let salePriceNumber = null;
  if (salePercent > 0 && basePrice > 0) {
    salePriceNumber = Math.round(basePrice * (1 - salePercent / 100));
  }

  const hasSale = salePriceNumber !== null;

  const priceDisplay =
    basePrice > 0
      ? `${basePrice.toLocaleString("vi-VN")} VNĐ`
      : currentProduct?.price || "";

  const salePriceDisplay =
    hasSale && salePriceNumber !== null
      ? `${salePriceNumber.toLocaleString("vi-VN")} VNĐ`
      : priceDisplay;

  // ==== PHÂN LOẠI SẢN PHẨM / ĐỒNG HỒ HAY KHÔNG ====
  const categoryPath = currentProduct?.categoryPath || "";
  const categoryId = currentProduct?.categoryId || "";

  let productType = "ao";
  if (categoryId === 1) productType = "giay";
  else if (categoryId === 2) productType = "quan";
  else if (categoryId === 3) productType = "dongho";

  const isWatch =
    categoryPath.includes("dong-ho") ||
    categoryId === 3 ||
    (typeof categoryId === "string" &&
      categoryId.toLowerCase().includes("watch"));

  // ==== ZOOM & ẢNH CHÍNH ====
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (currentProduct) {
      setSelectedImage(currentProduct.imgMain);
    }
  }, [currentProduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const ZOOM_SCALE = 3;

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

  // ==== SỐ LƯỢNG & SIZE ====
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const isAddDisabled = (!isWatch && !selectedSize) || quantity < 1;

  const handleAddToCart = () => {
    if (isAddDisabled) {
      if (!isWatch && !selectedSize) {
        alert("Vui lòng chọn size trước khi thêm vào giỏ.");
      }
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const sizeToSave = isWatch ? null : selectedSize;

    // Giá lưu giỏ: có sale thì dùng giá sale, không thì giá gốc
    const priceForCart =
      hasSale && salePriceNumber !== null ? salePriceNumber : basePrice;

    const existingItemIndex = cart.findIndex(
      (item) => item.id === currentProduct.id && item.size === sizeToSave
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: currentProduct.id,
        name: currentProduct.name,
        price: priceForCart,
        size: sizeToSave,
        quantity: quantity,
        image: currentProduct.imgMain,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartCount", cart.length);
    window.dispatchEvent(new Event("storage"));
    navigate("/cart");
  };

  const lastThumb = thumbs.length > 0 ? thumbs[thumbs.length - 1] : mauAnh;

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

  return (
    <div className="overflow-hidden">
      <NavigationMenu />
      <div className="relative md:grid md:grid-cols-2 md:px-40">
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

        {/* Cụm hình ảnh */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start">
          {/* Thumbnails */}
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

          {/* Ảnh chính + vùng zoom */}
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

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col space-y-5 px-4 ">
          <div className="font-semibold">
            <h1 className="text-xl">{currentProduct.name}</h1>
          </div>

          <div className="flex border-b pb-5 w-full gap-2">
            <div>
              Thương hiệu:{" "}
              <span className="border-r pr-2 border-black text-gray-400">
                {brandName}
              </span>
            </div>
            <div>
              Mã SP:{" "}
              <span className="text-gray-400">{currentProduct.id}</span>
            </div>
          </div>

          {/* GIÁ + GIÁ SALE */}
          <div className="flex items-center">
            <p className="mr-2">Giá:</p>
            {hasSale ? (
              <>
                <div className="inline-block text-lg text-gray-500 relative before:content-[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute">
                  {priceDisplay}
                </div>
                <p className="text-xl mb-1 ml-2 text-red-600 font-semibold">
                  {salePriceDisplay}
                </p>
                <span className="ml-2 text-sm text-red-600 font-semibold">
                  -{salePercent}%
                </span>
              </>
            ) : (
              <p className="text-xl mb-1 ml-1">{priceDisplay}</p>
            )}
          </div>

          {/* === NẾU KHÔNG PHẢI ĐỒNG HỒ -> CHỌN SIZE === */}
          {!isWatch && (
            <>
              <div>Chọn Size:</div>
              <div className="flex items-center gap-2 min-w-11 text-center leading-[2] text-[#767676]">
                {sizes.map(({ label, available }) => (
                  <div
                    key={label}
                    onClick={() => available && setSelectedSize(label)}
                    className={`border h-[30px] min-w-10 cursor-pointer relative transition-[box-shadow] duration-300 ease-out 
                ${
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
            </>
          )}

          {/* Số lượng */}
          <div>Số lượng:</div>
          <div className="md:flex items-center gap-4 border-b pb-10">
            <div className="mb-5 md:mb-0">
              <input
                type="number"
                min="1"
                value={quantity}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                    "Home",
                    "End",
                    "Tab",
                    "Enter",
                  ];

                  if (e.ctrlKey || e.metaKey) return;
                  if (allowedKeys.includes(e.key)) return;
                  if (/^\d$/.test(e.key)) return;
                  e.preventDefault();
                }}
                onPaste={(e) => {
                  const pasteData = e.clipboardData.getData("text");
                  if (!/^\d+$/.test(pasteData)) {
                    e.preventDefault();
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                }}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val === "") {
                    setQuantity("");
                    return;
                  }
                  val = val.replace(/\D/g, "");
                  if (val !== "") {
                    const num = Number(val);
                    if (!Number.isNaN(num) && num >= 1) {
                      setQuantity(num);
                    }
                  }
                }}
                onBlur={() => {
                  if (quantity === "" || quantity < 1) {
                    setQuantity(1);
                  }
                }}
                className="border h-[50px] rounded-full text-center w-full md:w-[150px] pr-5 pl-8"
              />
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleAddToCart}
                disabled={isAddDisabled}
                className={`rounded-full text-white py-2.5 px-12 transition-colors duration-200 ${
                  isAddDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#673AB7] hover:bg-[#5a329f]"
                }`}
              >
                THÊM VÀO GIỎ HÀNG
              </button>

              <div className="border p-4 rounded-full cursor-pointer ">
                <CiHeart />
              </div>
            </div>
          </div>

          {/* Đặc điểm nổi bật */}
          <div className="flex flex-col gap-4 border-b pb-2">
            <p className="text-red-600 font-bold">Đặc điểm nổi bật</p>
            {description.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          {/* Chia sẻ */}
          <div className="flex gap-20 border-b p-5">
            <p>Chia sẻ:</p>
            <div className="flex gap-4 text-white">
              <div className="flex bg-[#1877f2]  px-2 rounded-sm items-center gap-1">
                <AiFillLike />
                <button className="font-bold  text-xs">Thích 0</button>
              </div>
              <button className="bg-[#1877f2] font-bold px-3 text-xs rounded-sm">
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs mô tả / chất liệu */}
      <div className="md:px-40 px-4 mt-8">
        <ProductTabs
          descriptionContent={
            <ProductDescription sizeTypeId={currentProduct.sizeTypeId} />
          }
          compositionContent={<ProductComposition />}
        />
      </div>

      {/* Sản phẩm liên quan */}
      <RelatedProducts
        allProducts={allProducts}
        currentProductId={currentProduct.id}
        currentCategory={currentProduct.categoryId}
      />

      <Footer />
      <ScrollTest />
      <Panel />
    </div>
  );
}
