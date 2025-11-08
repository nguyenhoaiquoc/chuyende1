// data/products.mock.js
import { brands } from "./brands";
import { categories } from "./categories";

// import ảnh
import aoOnFlat from "../assets/AoChayBo.jpeg";
import giayHokaSide from "../assets/Giaychaybonam1.jpeg";
import giayHokaBack from "../assets/Giaychaybonam2.jpeg";
import depTrailSide from "../assets/depchaybonam1.jpg";
import depTrailTop from "../assets/depchaybonam2.jpeg";
import corosGrey from "../assets/dongho1.jpeg";
import corosNylonDark from "../assets/dongho2.jpeg";
import corosNylonWhite from "../assets/dongho3.jpeg";

// ÁO NỮ ON
import aoNuFlat from "../assets/Aochaybonu1.jpeg";
import aoNuModel from "../assets/Aochaybonu2.png";
import aoNuBack from "../assets/Aochaybonu3.png";

// GIÀY NỮ HOKA ROAD
import giayNuRoadSide from "../assets/Giauchaybonu1.jpeg";
import giayNuRoadBack from "../assets/Giaychaybonu2.webp";

// GIÀY NỮ HOKA TRAIL
import giayNuTrailSide from "../assets/Giaychaybonu3.jpeg";
import giayNuTrailAngle from "../assets/Giaychaybonu4.jpeg";

// QUẦN CHẠY BỘ NỮ
import QuanNuOnRunning from "../assets/Quanchaybonu1.jpeg";
import QuanNuOnRunning2 from "../assets/Quanchaybonu2.png";

export const products = [
  // ===== NAM =====
  {
    id: "GIAY-HOKA-002",
    name: "Giày Chạy Trail Hoka Speedgoat 5",
    price: 5100000,
    categoryId: "men-shoes-trail",
    brandId: "hoka",
    imgMain: giayHokaSide,
    imgHover: giayHokaBack,
    images: [giayHokaSide, giayHokaBack],
    sizes: ["40", "41", "42", "43", "44"],
    sale: "10%",
    gift: true,
  },
  {
    id: "AO-ON-001",
    name: "Áo Khoác Nam On Running Weather Jacket",
    price: 7060000,
    categoryId: "men-tops",
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L", "XL"],
    sale: "20%",
    gift: true,
  },
  {
    id: "SANDAL-TRAIL-LUNA-001",
    name: "Dép Chạy Trail LUNA Mono",
    price: 2900000,
    categoryId: "men-shoes-trail",
    brandId: "luna", // nhớ có 'luna' trong brands.js
    imgMain: depTrailSide,
    imgHover: depTrailTop,
    images: [depTrailSide, depTrailTop],
    sizes: ["38", "39", "40", "41", "42"], // không sale thì thô
    // gift: true,i
  }, // ===== ĐỒNG HỒ =====

  {
    id: "WATCH-COROS-PACE3-001",
    name: "Đồng Hồ COROS Pace 3",
    price: 6990000,
    categoryId: "watches",
    brandId: "coros",
    imgMain: corosGrey,
    imgHover: corosGrey,
    images: [corosGrey, corosNylonDark, corosNylonWhite],
    sale: "5%",
    gift: true,
  }, // ===== NỮ: ÁO =====

  {
    id: "AO-ON-LS-W-001",
    name: "Áo Chạy Bộ Nữ On Running Long Sleeve",
    price: 2300000,
    categoryId: "women-tops",
    brandId: "on",
    imgMain: aoNuFlat,
    imgHover: aoNuModel,
    images: [aoNuFlat, aoNuModel, aoNuBack],
    sizes: ["XS", "S", "M", "L"],
    sale: "15%",
    gift: true,
  }, // ===== NỮ: GIÀY ROAD =====

  {
    id: "GIAY-HOKA-ROAD-W-001",
    name: "Giày Chạy Bộ Nữ HOKA Clifton 9 Wide",
    price: 4300000,
    categoryId: "women-shoes-road",
    brandId: "hoka",
    imgMain: giayNuRoadSide,
    imgHover: giayNuRoadBack,
    images: [giayNuRoadSide, giayNuRoadBack],
    sizes: ["36", "37", "38", "39", "40"],
    sale: "20%",
    gift: true,
  }, // ===== NỮ: GIÀY TRAIL =====

  {
    id: "GIAY-HOKA-TRAIL-W-001",
    name: "Giày Chạy Địa Hình Nữ HOKA Mafate Speed 4",
    price: 4600000,
    categoryId: "women-shoes-trail",
    brandId: "hoka",
    imgMain: giayNuTrailSide,
    imgHover: giayNuTrailAngle,
    images: [giayNuTrailSide, giayNuTrailAngle],
    sizes: ["36", "37", "38", "39", "40"],
    sale: "25%",
    gift: true,
  }, // ===== NỮ: QUẦN (MỚI THÊM) =====

  {
    id: "W-SHORT-ON-001",
    name: "Quần Chạy Bộ Nữ On Running 3 Inch",
    price: 2100000,
    categoryId: "women-shorts", // phải khớp categories.js
    brandId: "on",
    imgMain: QuanNuOnRunning,
    imgHover: QuanNuOnRunning2,
    images: [QuanNuOnRunning, QuanNuOnRunning2],
    sizes: ["XS", "S", "M", "L"],
    sale: "10%",
    gift: true,
  },
  {
    id: "W-SHORT-ON-002",
    name: "Quần Chạy Bộ Nữ On Running 5 Inch",
    price: 1950000,
    categoryId: "women-shorts",
    brandId: "on",
    imgMain: QuanNuOnRunning2,
    imgHover: QuanNuOnRunning,
    images: [QuanNuOnRunning2, QuanNuOnRunning],
    sizes: ["XS", "S", "M", "L"],
    gift: true,
  }, // ===== 20 SẢN PHẨM MỚI THÊM ===== // Thêm 3 'men-tops' (Áo Nam)

  {
    id: "AO-ON-002",
    name: "Áo Thun Nam On Running Performance-T",
    price: 2190000,
    categoryId: "men-tops",
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L"],
    sale: "10%",
    gift: true,
  },
  {
    id: "AO-ON-003",
    name: "Áo Ba Lỗ Nam On Running Tank-T",
    price: 1890000,
    categoryId: "men-tops",
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L", "XL"],
    gift: true,
  },
  {
    id: "AO-HOKA-001",
    name: "Áo Thun Nam Hoka Glide",
    price: 1500000,
    categoryId: "men-tops",
    brandId: "hoka",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["M", "L"],
    sale: "15%",
    gift: true,
    bestseller: true,
  }, // Thêm 3 'men-shoes-trail' (Giày Trail Nam)

  {
    id: "GIAY-HOKA-003",
    name: "Giày Chạy Trail Hoka Tecton X 2",
    price: 5800000,
    categoryId: "men-shoes-trail",
    brandId: "hoka",
    imgMain: giayHokaSide,
    imgHover: giayHokaBack,
    images: [giayHokaSide, giayHokaBack],
    sizes: ["40", "42", "44"],
    gift: true,
  },
  {
    id: "GIAY-HOKA-004",
    name: "Giày Chạy Trail Hoka Challenger ATR 7",
    price: 4200000,
    categoryId: "men-shoes-trail",
    brandId: "hoka",
    imgMain: giayHokaSide,
    imgHover: giayHokaBack,
    images: [giayHokaSide, giayHokaBack],
    sizes: ["41", "43"],
    sale: "5%",
    gift: true,
  },
  {
    id: "SANDAL-TRAIL-LUNA-002",
    name: "Dép Chạy Trail LUNA Oso Flaco",
    price: 3100000,
    categoryId: "men-shoes-trail",
    brandId: "luna",
    imgMain: depTrailSide,
    imgHover: depTrailTop,
    images: [depTrailSide, depTrailTop],
    sizes: ["39", "40", "41"],
  }, // Thêm 3 'watches' (Đồng hồ)

  {
    id: "WATCH-COROS-APEX-001",
    name: "Đồng Hồ COROS Apex 2 Pro",
    price: 12990000,
    categoryId: "watches",
    brandId: "coros",
    imgMain: corosNylonDark,
    imgHover: corosNylonWhite,
    images: [corosNylonDark, corosNylonWhite, corosGrey],
    sale: "10%",
    gift: true,
  },
  {
    id: "WATCH-COROS-VERTIX-001",
    name: "Đồng Hồ COROS Vertix 2S",
    price: 18990000,
    categoryId: "watches",
    brandId: "coros",
    imgMain: corosGrey,
    imgHover: corosNylonDark,
    images: [corosGrey, corosNylonDark, corosNylonWhite],
  },
  {
    id: "WATCH-COROS-PACE3-002",
    name: "Đồng Hồ COROS Pace 3 (Bản Dây Nylon)",
    price: 6990000,
    categoryId: "watches",
    brandId: "coros",
    imgMain: corosNylonWhite,
    imgHover: corosGrey,
    images: [corosNylonWhite, corosGrey, corosNylonDark],
    sale: "5%",

    gift: true,
  }, // Thêm 3 'women-tops' (Áo Nữ)

  {
    id: "AO-ON-W-002",
    name: "Áo Thun Nữ On Running Performance-T",
    price: 2100000,
    categoryId: "women-tops",
    brandId: "on",
    imgMain: aoNuFlat,
    imgHover: aoNuModel,
    images: [aoNuFlat, aoNuModel, aoNuBack],
    sizes: ["XS", "S", "M"],
  },
  {
    id: "AO-ON-W-003",
    name: "Áo Ba Lỗ Nữ On Running Tank-T",
    price: 1750000,
    categoryId: "women-tops",
    brandId: "on",
    imgMain: aoNuModel,
    imgHover: aoNuBack,
    images: [aoNuModel, aoNuBack, aoNuFlat],
    sizes: ["S", "M", "L"],
    sale: "10%",
    gift: true,
  },
  {
    id: "AO-HOKA-W-001",
    name: "Áo Thun Nữ Hoka Glide",
    price: 1450000,
    categoryId: "women-tops",
    brandId: "hoka",
    imgMain: aoNuBack,
    imgHover: aoNuFlat,
    images: [aoNuBack, aoNuFlat, aoNuModel],
    sizes: ["XS", "M"],
  }, // Thêm 2 'women-shoes-road' (Giày Road Nữ)

  {
    id: "GIAY-HOKA-ROAD-W-002",
    name: "Giày Chạy Bộ Nữ HOKA Bondi 8",
    price: 4800000,
    categoryId: "women-shoes-road",
    brandId: "hoka",
    imgMain: giayNuRoadSide,
    imgHover: giayNuRoadBack,
    images: [giayNuRoadSide, giayNuRoadBack],
    sizes: ["36", "38", "40"],
    sale: "15%",
    gift: true,
  },
  {
    id: "GIAY-HOKA-ROAD-W-003",
    name: "Giày Chạy Bộ Nữ HOKA Mach 6",
    price: 4100000,
    categoryId: "women-shoes-road",
    brandId: "hoka",
    imgMain: giayNuRoadBack,
    imgHover: giayNuRoadSide,
    images: [giayNuRoadBack, giayNuRoadSide],
    sizes: ["37", "39"],
  }, // Thêm 2 'women-shoes-trail' (Giày Trail Nữ)

  {
    id: "GIAY-HOKA-TRAIL-W-002",
    name: "Giày Chạy Địa Hình Nữ HOKA Speedgoat 5",
    price: 5100000,
    categoryId: "women-shoes-trail",
    brandId: "hoka",
    imgMain: giayNuTrailSide,
    imgHover: giayNuTrailAngle,
    images: [giayNuTrailSide, giayNuTrailAngle],
    sizes: ["37", "38", "39"],
  },
  {
    id: "GIAY-HOKA-TRAIL-W-003",
    name: "Giày Chạy Địa Hình Nữ HOKA Tecton X 2",
    price: 5800000,
    categoryId: "women-shoes-trail",
    brandId: "hoka",
    imgMain: giayNuTrailAngle,
    imgHover: giayNuTrailSide,
    images: [giayNuTrailAngle, giayNuTrailSide],
    sizes: ["36", "38"],
    sale: "10%",
    gift: true,
  }, // Thêm 4 'women-shorts' (Quần Nữ)

  {
    id: "W-SHORT-ON-003",
    name: "Quần Chạy Bộ Nữ On Running Sprinter",
    price: 2400000,
    categoryId: "women-shorts",
    brandId: "on",
    imgMain: QuanNuOnRunning,
    imgHover: QuanNuOnRunning2,
    images: [QuanNuOnRunning, QuanNuOnRunning2],
    sizes: ["XS", "S", "M"],
    sale: "5%",

    gift: true,
  },
  {
    id: "W-SHORT-ON-004",
    name: "Quần Chạy Bộ Nữ On Running Essential",
    price: 1800000,
    categoryId: "women-shorts",
    brandId: "on",
    imgMain: QuanNuOnRunning2,
    imgHover: QuanNuOnRunning,
    images: [QuanNuOnRunning2, QuanNuOnRunning],
    sizes: ["S", "M", "L"],
  },
  {
    id: "W-SHORT-HOKA-001",
    name: "Quần Chạy Bộ Nữ Hoka Glide 4 Inch",
    price: 1600000,
    categoryId: "women-shorts",
    brandId: "hoka",
    imgMain: QuanNuOnRunning,
    imgHover: QuanNuOnRunning2,
    images: [QuanNuOnRunning, QuanNuOnRunning2],
    sizes: ["XS", "L"],
    sale: "20%",
    gift: true,
    bestseller: true,
  },
  {
    id: "W-SHORT-HOKA-002",
    name: "Quần Chạy Bộ Nữ Hoka Performance",
    price: 1900000,
    categoryId: "women-shorts",
    brandId: "hoka",
    imgMain: QuanNuOnRunning2,
    imgHover: QuanNuOnRunning,
    images: [QuanNuOnRunning2, QuanNuOnRunning],
    sizes: ["M", "L"],
  }, // --- Thêm 3 Áo Nam (men-tops) ---
  // ===== 20 SẢN PHẨM MỚI (THÊM VÀO CUỐI MẢNG) =====

  {
    id: "NEW-M-TOP-001",
    name: "Áo Thun Nam Hoka Tech",
    price: 1450000,
    categoryId: "men-tops",
    brandId: "hoka",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "NEW-M-TOP-002",
    name: "Áo Dài Tay Nam On Running",
    price: 2800000,
    categoryId: "men-tops",
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["M", "L"],
    sale: "5%",

    gift: true,
    bestseller: true,
  },
  {
    id: "NEW-M-TOP-003",
    name: "Áo Ba Lỗ Nam Hoka",
    price: 1200000,
    categoryId: "men-tops",
    brandId: "hoka",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M"],
  }, // --- Thêm 3 Giày Trail Nam (men-shoes-trail) ---

  {
    id: "NEW-M-TRAIL-001",
    name: "Giày Chạy Trail Hoka Tecton X 2",
    price: 5990000,
    categoryId: "men-shoes-trail",
    brandId: "hoka",
    imgMain: giayHokaSide,
    imgHover: giayHokaBack,
    images: [giayHokaSide, giayHokaBack],
    sizes: ["40", "41", "42"],
  },
  {
    id: "NEW-M-TRAIL-002",
    name: "Giày Chạy Trail On Running Cloudventure",
    price: 4500000,
    categoryId: "men-shoes-trail",
    brandId: "on",
    imgMain: giayHokaSide,
    imgHover: giayHokaBack,
    images: [giayHokaSide, giayHokaBack],
    sizes: ["42", "43", "44"],
    sale: "10%",
    gift: true,
    bestseller: true,
  },
  {
    id: "NEW-M-TRAIL-003",
    name: "Dép Chạy Trail LUNA Retro Mono",
    price: 2950000,
    categoryId: "men-shoes-trail",
    brandId: "luna",
    imgMain: depTrailSide,
    imgHover: depTrailTop,
    images: [depTrailSide, depTrailTop],
    sizes: ["40", "41"],
  }, // --- Thêm 3 Đồng Hồ (watches) ---

  {
    id: "NEW-WATCH-001",
    name: "Đồng Hồ COROS Apex 2 Pro",
    price: 12500000,
    categoryId: "watches",
    brandId: "coros",
    imgMain: corosNylonDark,
    imgHover: corosGrey,
    images: [corosNylonDark, corosGrey, corosNylonWhite],
    sale: "10%",
    gift: true,
    bestseller: true,
  },
  {
    id: "NEW-WATCH-002",
    name: "Đồng Hồ COROS Vertix 2S",
    price: 18990000,
    categoryId: "watches",
    brandId: "coros",
    imgMain: corosNylonWhite,
    imgHover: corosNylonDark,
    images: [corosNylonWhite, corosNylonDark, corosGrey],
  },
  {
    id: "NEW-WATCH-003",
    name: "Đồng Hồ COROS Pace 3 (Dây Silicone)",
    price: 6990000,
    categoryId: "watches",
    brandId: "coros",
    imgMain: corosGrey,
    imgHover: corosNylonWhite,
    images: [corosGrey, corosNylonWhite, corosNylonDark],
  }, // --- Thêm 3 Áo Nữ (women-tops) ---

  {
    id: "NEW-W-TOP-001",
    name: "Áo Thun Nữ On Running Performance-T",
    price: 2190000,
    categoryId: "women-tops",
    brandId: "on",
    imgMain: aoNuFlat,
    imgHover: aoNuModel,
    images: [aoNuFlat, aoNuModel, aoNuBack],
    sizes: ["XS", "S", "M"],
    sale: "5%",

    gift: true,
    bestseller: true,
  },
  {
    id: "NEW-W-TOP-002",
    name: "Áo Ba Lỗ Nữ On Running Active Tank",
    price: 1800000,
    categoryId: "women-tops",
    brandId: "on",
    imgMain: aoNuModel,
    imgHover: aoNuBack,
    images: [aoNuModel, aoNuBack, aoNuFlat],
    sizes: ["S", "M"],
  },
  {
    id: "NEW-W-TOP-003",
    name: "Áo Khoác Nữ Hoka",
    price: 3100000,
    categoryId: "women-tops",
    brandId: "hoka",
    imgMain: aoNuBack,
    imgHover: aoNuFlat,
    images: [aoNuBack, aoNuFlat, aoNuModel],
    sizes: ["XS", "S", "M", "L"],
    sale: "15%",
    gift: true,
    bestseller: true,
  }, // --- Thêm 3 Giày Road Nữ (women-shoes-road) ---

  {
    id: "NEW-W-ROAD-001",
    name: "Giày Chạy Bộ Nữ HOKA Bondi 8",
    price: 4790000,
    categoryId: "women-shoes-road",
    brandId: "hoka",
    imgMain: giayNuRoadSide,
    imgHover: giayNuRoadBack,
    images: [giayNuRoadSide, giayNuRoadBack],
    sizes: ["36", "37", "38"],
  },
  {
    id: "NEW-W-ROAD-002",
    name: "Giày Chạy Bộ Nữ HOKA Mach 6",
    price: 4200000,
    categoryId: "women-shoes-road",
    brandId: "hoka",
    imgMain: giayNuRoadBack,
    imgHover: giayNuRoadSide,
    images: [giayNuRoadBack, giayNuRoadSide],
    sizes: ["38", "39", "40"],
    sale: "10%",
    gift: true,
    bestseller: true,
  },
  {
    id: "NEW-W-ROAD-003",
    name: "Giày Chạy Bộ Nữ On Running Cloudsurfer",
    price: 5100000,
    categoryId: "women-shoes-road",
    brandId: "on",
    imgMain: giayNuRoadSide,
    imgHover: giayNuRoadBack,
    images: [giayNuRoadSide, giayNuRoadBack],
    sizes: ["37", "38"],
  }, // --- Thêm 2 Giày Trail Nữ (women-shoes-trail) ---

  {
    id: "NEW-W-TRAIL-001",
    name: "Giày Chạy Địa Hình Nữ On Running Cloudultra 2",
    price: 5300000,
    categoryId: "women-shoes-trail",
    brandId: "on",
    imgMain: giayNuTrailSide,
    imgHover: giayNuTrailAngle,
    images: [giayNuTrailSide, giayNuTrailAngle],
    sizes: ["36", "37", "38", "39", "40"],
    sale: "5%",

    gift: true,
  },
  {
    id: "NEW-W-TRAIL-002",
    name: "Giày Chạy Địa Hình Nữ Hoka Tecton X",
    price: 5500000,
    categoryId: "women-shoes-trail",
    brandId: "hoka",
    imgMain: giayNuTrailAngle,
    imgHover: giayNuTrailSide,
    images: [giayNuTrailAngle, giayNuTrailSide],
    sizes: ["38", "39"],
  }, // --- Thêm 3 Quần Nữ (women-shorts) ---

  {
    id: "NEW-W-SHORT-001",
    name: "Quần Chạy Bộ Nữ Hoka Glide 5 Inch",
    price: 1700000,
    categoryId: "women-shorts",
    brandId: "hoka",
    imgMain: QuanNuOnRunning,
    imgHover: QuanNuOnRunning2,
    images: [QuanNuOnRunning, QuanNuOnRunning2],
    sizes: ["S", "M"],
  },
  {
    id: "NEW-W-SHORT-002",
    name: "Quần Đùi Nữ On Running Sprinter",
    price: 2200000,
    categoryId: "women-shorts",
    brandId: "on",
    imgMain: QuanNuOnRunning2,
    imgHover: QuanNuOnRunning,
    images: [QuanNuOnRunning2, QuanNuOnRunning],
    sizes: ["XS", "S", "M", "L"],
    sale: "10%",
    gift: true,
  },
  {
    id: "NEW-W-SHORT-003",
    name: "Quần Legging Nữ Hoka",
    price: 2500000,
    categoryId: "women-shorts",
    brandId: "hoka",
    imgMain: QuanNuOnRunning,
    imgHover: QuanNuOnRunning2,
    images: [QuanNuOnRunning, QuanNuOnRunning2],
    sizes: ["XS", "S"],
  },
];
