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


// data/products.mock.js
// (import giữ nguyên như cậu viết)

export const products = [
  {
    id: "GIAY-HOKA-002",
    name: "Giày Chạy Trail Hoka Speedgoat 5",
    price: 5100000,
    categoryId: "men-shoes-trail",   // ✅
    brandId: "hoka",
    imgMain: giayHokaSide,
    imgHover: giayHokaBack,
    images: [giayHokaSide, giayHokaBack],
    sizes: ["40", "41", "42", "43", "44"],
  },
  {
    id: "AO-ON-001",
    name: "Áo Khoác Nam On Running Weather Jacket",
    price: 7060000,
    categoryId: "men-tops",          // ✅
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "SANDAL-TRAIL-LUNA-001",
    name: "Dép Chạy Trail LUNA Mono",
    price: 2900000,
    categoryId: "men-shoes-trail",   // ✅
    brandId: "luna",                 // nhớ có brand 'luna' trong brands.js
    imgMain: depTrailSide,
    imgHover: depTrailTop,
    images: [depTrailSide, depTrailTop],
    sizes: ["38", "39", "40", "41", "42"],
  },
  {
    id: "WATCH-COROS-PACE3-001",
    name: "Đồng Hồ COROS Pace 3",
    price: 6990000,
    categoryId: "watches",           // ✅ đã khớp
    brandId: "coros",
    imgMain: corosGrey,
    imgHover: corosGrey,
    images: [corosGrey, corosNylonDark, corosNylonWhite],
  },
  {
    id: "AO-ON-LS-W-001",
    name: "Áo Chạy Bộ Nữ On Running Long Sleeve",
    price: 2300000,
    categoryId: "women-tops",        // ✅
    brandId: "on",
    imgMain: aoNuFlat,
    imgHover: aoNuModel,
    images: [aoNuFlat, aoNuModel, aoNuBack],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "GIAY-HOKA-ROAD-W-001",
    name: "Giày Chạy Bộ Nữ HOKA Clifton 9 Wide",
    price: 4300000,
    categoryId: "women-shoes-road",  // ✅
    brandId: "hoka",
    imgMain: giayNuRoadSide,
    imgHover: giayNuRoadBack,
    images: [giayNuRoadSide, giayNuRoadBack],
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "GIAY-HOKA-TRAIL-W-001",
    name: "Giày Chạy Địa Hình Nữ HOKA Mafate Speed 4",
    price: 4600000,
    categoryId: "women-shoes-trail", // ✅
    brandId: "hoka",
    imgMain: giayNuTrailSide,
    imgHover: giayNuTrailAngle,
    images: [giayNuTrailSide, giayNuTrailAngle],
    sizes: ["36", "37", "38", "39", "40"],
  },
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
    sale: "10%",              // <<< thêm
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
    sale: "20%",              // <<< thêm
  },
  {
    id: "SANDAL-TRAIL-LUNA-001",
    name: "Dép Chạy Trail LUNA Mono",
    price: 2900000,
    categoryId: "men-shoes-trail",
    brandId: "luna",
    imgMain: depTrailSide,
    imgHover: depTrailTop,
    images: [depTrailSide, depTrailTop],
    sizes: ["38", "39", "40", "41", "42"],
    // không sale thì bỏ trống
  },
  {
    id: "WATCH-COROS-PACE3-001",
    name: "Đồng Hồ COROS Pace 3",
    price: 6990000,
    categoryId: "watches",
    brandId: "coros",
    imgMain: corosGrey,
    imgHover: corosGrey,
    images: [corosGrey, corosNylonDark, corosNylonWhite],
    sale: "5%",               // <<< thêm nếu muốn
  },
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
    sale: "15%",              // <<< thêm
  },
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
    sale: "20%",              // <<< thêm
  },
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
    sale: "25%",              // <<< thêm
  },
];

