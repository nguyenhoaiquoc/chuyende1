// data/products.mock.js

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
    id: 1,
    name: "Giày Chạy Trail Hoka Speedgoat 5",
    price: 5100000,
    categoryId: 1,
    sizeTypeId: 1, // <-- GIÀY NAM
    brandId: "hoka",
    imgMain: giayHokaSide,
    imgHover: giayHokaBack,
    images: [giayHokaSide, giayHokaBack],
    sizes: ["40", "41", "42", "43", "44"],
    sale: "10%",
    gift: true,
  },
  {
    id: 2,
    name: "Áo Khoác Nam On Running Weather Jacket",
    price: 7060000,
    categoryId: 1,
    sizeTypeId: 4,
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L", "XL"],
    sale: "20%",
    gift: true,
  },
  {
    id: 3,
    name: "Dép Chạy Trail LUNA Mono",
    price: 2900000,
    categoryId: 1,
    brandId: "luna",
    imgMain: depTrailSide,
    imgHover: depTrailTop,
    images: [depTrailSide, depTrailTop],
    sizes: ["38", "39", "40", "41", "42"],
  },
  {
    id: 4,
    name: "Đồng Hồ COROS Pace 3",
    price: 6990000,
    categoryId: 3,
    brandId: "coros",
    imgMain: corosGrey,
    imgHover: corosGrey,
    images: [corosGrey, corosNylonDark, corosNylonWhite],
    specs: {
      battery: "38 giờ GPS full",
      weight: "30g",
      waterResist: "5 ATM",
      gps: "Dual-band GNSS",
      display: "1.2\" Memory-In-Pixel",
    },
  },
  {
    id: 5,
    name: "Áo Chạy Bộ Nữ On Running Long Sleeve",
    price: 2300000,
    categoryId: 2,
    brandId: "on",
    imgMain: aoNuFlat,
    imgHover: aoNuModel,
    images: [aoNuFlat, aoNuModel, aoNuBack],
    sizes: ["XS", "S", "M", "L"],
    sale: "15%",
    gift: true,
  },
  {
    id: 6,
    name: "Giày Chạy Bộ Nữ HOKA Clifton 9 Wide",
    price: 4300000,
    categoryId: 2,
    sizeTypeId: 1, // <-- GIÀY NAM
    brandId: "hoka",
    imgMain: giayNuRoadSide,
    imgHover: giayNuRoadBack,
    images: [giayNuRoadSide, giayNuRoadBack],
    sizes: ["36", "37", "38", "39", "40"],
    sale: "20%",
    gift: true,
  },
  {
    id: 7,
    name: "Giày Chạy Địa Hình Nữ HOKA Mafate Speed 4",
    price: 4600000,
    categoryId: 2,
    brandId: "hoka",
    imgMain: giayNuTrailSide,
    imgHover: giayNuTrailAngle,
    images: [giayNuTrailSide, giayNuTrailAngle],
    sizes: ["36", "37", "38", "39", "40"],
    sale: "25%",
    gift: true,
  },
  {
    id: 8,
    name: "Quần Chạy Bộ Nữ On Running 3 Inch",
    price: 2100000,
    categoryId: 2,
    brandId: "on",
    imgMain: QuanNuOnRunning,
    imgHover: QuanNuOnRunning2,
    images: [QuanNuOnRunning, QuanNuOnRunning2],
    sizes: ["XS", "S", "M", "L"],
    sale: "10%",
    gift: true,
  },
  {
    id: 9,
    name: "Quần Chạy Bộ Nữ On Running 5 Inch",
    price: 1950000,
    categoryId: 2,
    brandId: "on",
    imgMain: QuanNuOnRunning2,
    imgHover: QuanNuOnRunning,
    images: [QuanNuOnRunning2, QuanNuOnRunning],
    sizes: ["XS", "S", "M", "L"],
    gift: true,
  },
  {
    id: 10,
    name: "Áo Thun Nam On Running Performance-T",
    price: 2190000,
    categoryId: 1,
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L"],
    sale: "10%",
    gift: true,
  },
];
