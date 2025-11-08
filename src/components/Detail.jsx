import { useEffect, useRef, useState } from "react";
// === 1. IMPORT TỪ ROUTER ===
import { useParams } from "react-router-dom"; 

// --- Import assets (Giữ nguyên) ---
import mauAnh from "../assets/mauanh.png";
import Ao from "../assets/Aoremove.png";
import sanPham2 from "../assets/sanpham2.jpg";
import sanPham2Load from "../assets/sanpham2load.jpg";

// --- Import icons (Giữ nguyên) ---
import { CiHeart } from "react-icons/ci";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

// --- Import components (Giữ nguyên) ---
import NavigationMenu from "./NavigationMenu";
import ScrollTest from "../ScrollTest";
import ProductTabs from "./ProductTabs";
import ProductDescription from "./ProductDescription";
import ProductComposition from "./ProductComposition";
import Panel from "./Panel";
import Footer from "./Footer";
import RelatedProducts from "./RelatedProducts"; 

// === DỮ LIỆU GIẢ LẬP (GIỮ NGUYÊN) ===
const DUMMY_ALL_PRODUCTS = [
  // ... (Toàn bộ mảng dữ liệu của bạn) ...
  // --- THỂ LOẠI "AO" (7 SẢN PHẨM) ---
  {
    id: "1ME1031315",
    name: "Áo Khoác Nam On Running Weather Jacket - Desert/Cinder",
    price: "7,060,000 VNĐ",
    salePrice: "5,648,000 VNĐ",
    brand: "On Running",
    category: "ao", 
    imgMain: mauAnh,
    thumbs: [Ao, Ao, Ao, mauAnh, Ao, mauAnh],
    imgHover: Ao,
    sizes: [{label: "L", available: true}, {label: "S", available: false}],
    description: ["- Chống gió vượt trội", "- Siêu nhẹ"]
  },
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
    sizes: [{label: "S", available: true}, {label: "M", available: true}],
    description: ["- Siêu nhẹ", "- Chống thấm nước"]
  },
  {
    id: "AO-NIKE-003",
    name: "Áo Thun Chạy Bộ Nike Dri-Fit",
    price: "1,200,000 VNĐ",
    salePrice: "900,000 VNĐ",
    brand: "Nike",
    category: "ao", 
    imgMain: Ao, 
    thumbs: [Ao, mauAnh, Ao, Ao],
    imgHover: mauAnh, 
    sale: "25%",
    sizes: [{label: "M", available: true}, {label: "L", available: true}],
    description: ["- Công nghệ Dri-Fit", "- Thoáng khí"]
  },
  {
    id: "AO-ADIDAS-004",
    name: "Áo Ba Lỗ Adidas Running",
    price: "950,000 VNĐ",
    salePrice: "950,000 VNĐ",
    brand: "Adidas",
    category: "ao", 
    imgMain: mauAnh, 
    thumbs: [mauAnh, Ao, Ao, Ao],
    imgHover: Ao, 
    sizes: [{label: "S", available: true}, {label: "M", available: true}],
    description: ["- Chất liệu tái chế", "- Siêu mỏng"]
  },
    {
    id: "AO-ASICS-005",
    name: "Áo Khoác Gió Asics",
    price: "2,100,000 VNĐ",
    salePrice: "2,100,000 VNĐ",
    brand: "Asics",
    category: "ao", 
    imgMain: sanPham2Load, 
    thumbs: [sanPham2Load, Ao],
    imgHover: sanPham2, 
    sizes: [{label: "S", available: true}, {label: "M", available: true}],
    description: ["- Chống tia UV", "- Gọn nhẹ"]
  },
    {
    id: "AO-SALOMON-006",
    name: "Áo Thun Dài Tay Salomon",
    price: "1,800,000 VNĐ",
    salePrice: "1,500,000 VNĐ",
    brand: "Salomon",
    category: "ao", 
    imgMain: Ao, 
    thumbs: [Ao, mauAnh, Ao, Ao],
    imgHover: mauAnh, 
    sale: "15%",
    sizes: [{label: "S", available: true}, {label: "L", available: true}],
    description: ["- Giữ ấm tốt", "- Thoát mồ hôi"]
  },
  {
    id: "AO-NB-007",
    name: "Áo Singlet New Balance",
    price: "880,000 VNĐ",
    salePrice: "880,000 VNĐ",
    brand: "New Balance",
    category: "ao", 
    imgMain: mauAnh, 
    thumbs: [mauAnh, Ao, Ao, Ao],
    imgHover: Ao, 
    sizes: [{label: "S", available: true}, {label: "M", available: true}],
    description: ["- Siêu nhẹ cho ngày đua", "- Không đường may"]
  },
  // ... (Các thể loại "Giay" và "Quan" giữ nguyên) ...
  // --- THỂ LOẠI "GIAY" (6 SẢN PHẨM) ---
  {
    id: "SP003",
    name: "Giày Chạy Bộ Siêu Bền",
    price: "4,500,000 VNĐ",
    salePrice: "4,000,000 VNĐ",
    brand: "Nike",
    category: "giay", 
    imgMain: mauAnh, 
    thumbs: [mauAnh, Ao, Ao, Ao],
    imgHover: Ao,
    sale: "10%",
    sizes: [{label: "40", available: true}, {label: "41", available: true}],
    description: ["- Đế carbon", "- Bật nảy cao"]
  },
  {
    id: "GIAY-HOKA-002",
    name: "Giày Chạy Trail Hoka Speedgoat 5",
    price: "5,100,000 VNĐ",
    salePrice: "5,100,000 VNĐ",
    brand: "Hoka",
    category: "giay", 
    imgMain: sanPham2, 
    thumbs: [sanPham2, sanPham2Load, Ao, Ao],
    imgHover: sanPham2Load, 
    sizes: [{label: "40", available: true}, {label: "42", available: true}],
    description: ["- Bám đường vượt trội", "- Đế siêu êm"]
  },
  {
    id: "GIAY-ADI-003",
    name: "Giày Adidas Adizero Boston 12",
    price: "4,200,000 VNĐ",
    salePrice: "4,200,000 VNĐ",
    brand: "Adidas",
    category: "giay", 
    imgMain: sanPham2Load, 
    thumbs: [sanPham2Load, sanPham2],
    imgHover: sanPham2, 
    sizes: [{label: "41", available: true}, {label: "42", available: true}],
    description: ["- Luyện tập tốc độ", "- Lớp đệm Lightstrike"]
  },
  {
    id: "GIAY-SAUCONY-004",
    name: "Giày Saucony Endorphin Speed 3",
    price: "4,900,000 VNĐ",
    salePrice: "4,900,000 VNĐ",
    brand: "Saucony",
    category: "giay", 
    imgMain: Ao, 
    thumbs: [Ao, mauAnh, Ao, Ao],
    imgHover: mauAnh, 
    sizes: [{label: "40", available: true}, {label: "43", available: true}],
    description: ["- Công nghệ SpeedRoll", "- Tấm nylon"]
  },
  {
    id: "GIAY-BROOKS-005",
    name: "Giày Brooks Ghost 15",
    price: "3,900,000 VNĐ",
    salePrice: "3,500,000 VNĐ",
    brand: "Brooks",
    category: "giay", 
    imgMain: sanPham2, 
    thumbs: [sanPham2, mauAnh],
    imgHover: mauAnh, 
    sale: "10%",
    sizes: [{label: "40", available: true}, {label: "41", available: true}],
    description: ["- Êm ái hàng ngày", "- Thân thiện môi trường"]
  },
  {
    id: "GIAY-ON-006",
    name: "Giày On Cloudsurfer",
    price: "4,800,000 VNĐ",
    salePrice: "4,800,000 VNĐ",
    brand: "On Running",
    category: "giay", 
    imgMain: mauAnh, 
    thumbs: [mauAnh, Ao, Ao, Ao],
    imgHover: Ao, 
    sizes: [{label: "42", available: true}, {label: "44", available: false}],
    description: ["- Công nghệ CloudTec Phase", "- Siêu êm"]
  },

  // --- THỂ LOẠI "QUAN" (3 SẢN PHẨM) ---
  {
    id: "QUAN-ON-001",
    name: "Quần Đùi Chạy Bộ On Running 5 Inch",
    price: "2,300,000 VNĐ",
    salePrice: "2,300,000 VNĐ",
    brand: "On Running",
    category: "quan", 
    imgMain: mauAnh, 
    thumbs: [mauAnh, Ao, Ao, Ao],
    imgHover: Ao, 
    sizes: [{label: "S", available: true}, {label: "L", available: true}],
    description: ["- Siêu nhẹ", "- Có túi zip sau"]
  },
  {
    id: "QUAN-NIKE-002",
    name: "Quần Dài Nike Phenom",
    price: "2,800,000 VNĐ",
    salePrice: "2,800,000 VNĐ",
    brand: "Nike",
    category: "quan", 
    imgMain: sanPham2Load, 
    thumbs: [sanPham2Load, Ao],
    imgHover: Ao, 
    sizes: [{label: "M", available: true}, {label: "L", available: false}],
    description: ["- Co giãn 4 chiều", "- Giữ ấm nhẹ"]
  },
  {
    id: "QUAN-2XU-003",
    name: "Quần Bó Cơ 2XU",
    price: "2,500,000 VNĐ",
    salePrice: "2,200,000 VNĐ",
    brand: "2XU",
    category: "quan", 
    imgMain: Ao, 
    thumbs: [Ao, mauAnh, Ao, Ao],
    imgHover: mauAnh,
    sale: "12%",
    sizes: [{label: "S", available: true}, {label: "M", available: true}],
    description: ["- Hỗ trợ cơ bắp", "- Giảm mỏi cơ"]
  }
];

export default function Detail() {
  const { productId } = useParams();

  const allProducts = DUMMY_ALL_PRODUCTS; 
  const currentProduct = allProducts.find(p => p.id === productId);

  // Lấy dữ liệu động từ `currentProduct` (Định nghĩa ĐÚNG)
  const thumbs = currentProduct ? currentProduct.thumbs : [];
  const sizes = currentProduct ? currentProduct.sizes : [];

  // State cho ảnh chính
  const [selectedImage, setSelectedImage] = useState(null);

  // Cập nhật ảnh chính khi sản phẩm thay đổi
  useEffect(() => {
    if (currentProduct) {
      setSelectedImage(currentProduct.imgMain);
    }
  }, [currentProduct]); // Phụ thuộc vào currentProduct

  // Cuộn lên đầu trang khi đổi sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Logic Zoom
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const ZOOM_SCALE = 3;

  // === THAY THẾ LOGIC CUỘN ===
  // 1. Thêm scrollRef
  const scrollRef = useRef(null);
  
  // 2. Thêm hàm cuộn (lấy từ file cũ)
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

  // 3. Xóa logic cuộn cũ (dùng `offsetX`, `offsetY`, `canScroll...`)
  // === KẾT THÚC THAY THẾ LOGIC CUỘN ===

  // Logic Số lượng
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
    setQuantity("");
  } else if (/^\d+$/.test(value)) {
    setQuantity(Number(value));
  }
  };

  // Logic Chọn Size
  const [selectedSize, setSelectedSize] = useState(null);

  const lastThumb = thumbs.length > 0 ? thumbs[thumbs.length - 1] : mauAnh;

  // Dữ liệu tĩnh cho tabs
  const productDescriptionHTML = `
    <h3 style="font-size: 1.25rem; font-weight: 600;">Zoot Elite Tri Aero Fx Racesuit</h3>
    <p>Sự kết hợp hoàn hảo giữa tốc độ, độ thoải mái và phong cách, bộ trisuit Zoot Elite Tri Aero được thiết kế cho những vận động viên ba môn phối hợp tìm kiếm hiệu suất đỉnh cao.</p>
    <img src="${lastThumb}" alt="Product detail" style="width:100%; margin: 1rem 0;" />
    <h4 style="font-weight: 600;">Tính năng nổi bật</h4>
    <ul>
      <li>Vải dệt Exo-Dry™ High Thread Count: hỗ trợ cơ bắp và tăng lưu thông máu.</li>
      <li>Highway Ribbed Fabric: cấu trúc gân khí động học giảm lực cản gió.</li>
      <li>Aeromax™ Mesh Back Panel: phần lưng bằng lưới siêu thoáng, thoát nhiệt.</li>
      <li>Đệm PRO Carbon Tri Chamois: thiết kế riêng cho tư thế aero, êm ái và khô thoáng.</li>
    </ul>
  `;
  const productType = "ao"; 

  // Xử lý không tìm thấy sản phẩm
  if (!currentProduct) {
    return (
      <div className="flex flex-col">
        <NavigationMenu/>
        <div className="w-full text-center my-20 text-2xl">
          Đang tải sản phẩm hoặc không tìm thấy...
        </div>
        <Footer/>
      </div>
    );
  }

  // Render JSX
  return (
    <div className="overflow-hidden">
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
                width: '450px',
                height: '450px',
              }}
            />
          </div>
        )}

        {/* Cụm Hình ảnh */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start">
          
          {/* === CẬP NHẬT JSX CHO THUMBNAILS === */}
          <div className="flex flex-col items-center">
            {/* 1. Xóa logic `canScrollUp` khỏi className */}
            <MdOutlineKeyboardArrowUp
              className={`mb-5 text-2xl hidden md:block cursor-pointer`}
              onClick={handleUp}
            />
            
            <div className="relative overflow-hidden flex justify-center w-full">
              {/* 2. Xóa logic `canScrollLeft` khỏi className */}
              <MdOutlineKeyboardArrowLeft
                onClick={handleLeft}
                className={`absolute text-2xl left-0 bg-[#313131] z-10 text-white block md:hidden`}
              />
              
              {/* 3. Thêm `ref` và đổi `className` */}
              <div
                ref={scrollRef} // <-- THÊM REF
                // <-- XÓA style={{ transform: ... }}
                className="md:flex md:flex-col flex flex-row overflow-hidden scroll-smooth gap-2 max-h-[330px] md:max-h-[330px] w-full"
              >
                {thumbs.map((b, index) => (
                  // 4. Cập nhật className cho item thumbnail
                  <div
                    key={index}
                    onClick={() => setSelectedImage(b)}
                    className="border mb-5 md:my-2 cursor-pointer h-[100px] w-[25%] sm:w-[90px] overflow-hidden shrink-0" // <-- Class từ file cũ
                  >
                    <img
                      src={b}
                      alt=""
                      className="max-w-[80%] h-full object-contain mx-auto" // <-- Class từ file cũ
                    />
                  </div>
                ))}
              </div>
              
              {/* 5. Xóa logic `canScrollRight` khỏi className */}
              <MdOutlineKeyboardArrowRight
                onClick={handleRight}
                className={`absolute text-2xl right-0 bg-[#313131] text-white block md:hidden`}
              />
            </div>

            {/* 6. Xóa logic `canScrollDown` khỏi className */}
            <MdOutlineKeyboardArrowDown
              onClick={handleDown}
              className={`mt-5 text-2xl hidden md:block cursor-pointer`}
            />
          </div>
          {/* === KẾT THÚC CẬP NHẬT THUMBNAILS === */}

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
            {/* DÙNG ẢNH CHÍNH ĐỘNG */}
            <img src={selectedImage} alt="main" className="w-full h-full object-contain" />

            {/* Khung zoom */}
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

        {/* Cụm Thông tin sản phẩm (Giữ nguyên) */}
        <div className="flex flex-col space-y-5 px-4 ">
          <div className="font-semibold">
            <h1 className="text-xl">{currentProduct.name}</h1>
          </div>

          <div className="flex border-b pb-5 w-full gap-2">
            <div className="">Thương hiêu: <span className="border-r pr-2 border-black text-gray-400">{currentProduct.brand}</span></div>
            <div className="">Mã SP: <span className="text-gray-400">{currentProduct.id}</span></div>
          </div>

          <div className="flex items-center">
            <p className="mr-2">Giá:</p>
            <div className="inline-block text-lg text-gray-500 relative before:content[''] before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-gray-300 before:absolute">
              {currentProduct.price}
            </div>
            <p className="text-xl mb-1 ml-1">{currentProduct.salePrice}</p>
          </div>

          {/* SIZES ĐỘNG (Dùng biến `sizes` ĐÚNG) */}
          <div className="">chọn Size:</div>
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

          {/* Số lượng */}
          <div className="">Số lương:</div>
          <div className="md:flex items-center gap-4 border-b pb-10">
            <div className="mb-5 md:mb-0">
<input
  type="number"
  min="1"
  value={quantity}
  onKeyDown={(e) => {
    // Cho phép các phím điều hướng / control
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

    // Cho phép combo Ctrl/Command như Ctrl+C, Ctrl+V, Ctrl+A,...
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    // Nếu là phím điều hướng / xóa thì cho qua
    if (allowedKeys.includes(e.key)) {
      return;
    }

    // Nếu là 1 ký tự số (0-9) thì cho qua
    if (/^\d$/.test(e.key)) {
      return;
    }

    // Còn lại (ví dụ "e", "-", "+", chữ cái, dấu phẩy, khoảng trắng, ...) -> chặn
    e.preventDefault();
  }}
  onPaste={(e) => {
    const pasteData = e.clipboardData.getData("text");
    // Nếu dữ liệu dán không phải toàn số -> chặn
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  }}
  onDrop={(e) => {
    // Kéo-thả text vào input cũng chặn luôn cho chắc
    e.preventDefault();
  }}
  onChange={(e) => {
    let val = e.target.value;

    // Cho phép rỗng (để user xóa hết)
    if (val === "") {
      setQuantity("");
      return;
    }

    // Dọn sạch mọi thứ không phải số (phòng trường hợp trình duyệt lách)
    val = val.replace(/\D/g, "");

    // Nếu sau khi lọc vẫn có số thì set
    if (val !== "") {
      const num = Number(val);
      if (!Number.isNaN(num) && num >= 0) {
        setQuantity(num);
      }
    }
  }}
  onBlur={() => {
    // Nếu bỏ trống rồi blur ra ngoài -> tự reset về 1
    if (quantity === "") {
      setQuantity(1);
    }
  }}
  className="border h-[50px] rounded-full text-center w-full md:w-[150px] pr-5 pl-8"
/>

            </div>
            <div className="flex justify-center gap-2">
              <button className="bg-[#673AB7] rounded-full text-white py-2.5 px-12">THÊM VÀO GIỎ HÀNG</button>
              <div className="border p-4 rounded-full cursor-pointer "><CiHeart /></div>
            </div>

          </div>
          
          {/* MÔ TẢ ĐỘNG */}
          <div className="flex flex-col gap-4 border-b pb-2">
            <p className="text-red-600 font-bold">Đặc điểm nổi bật</p>
            {currentProduct.description.map((line, index) => (
              <p key={index} className="">{line}</p>
            ))}
          </div>

          {/* Chia sẻ */}
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

      {/* Product Tabs */}
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
      
      {/* RELATED PRODUCTS */}
      <RelatedProducts
        allProducts={allProducts}
        currentProductId={currentProduct.id}
        currentCategory={currentProduct.category}
      />

      {/* Footer và các components khác */}
      <Footer/>
      <ScrollTest/>
      <Panel/>
    </div>
  );
}