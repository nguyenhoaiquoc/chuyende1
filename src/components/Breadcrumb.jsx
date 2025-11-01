import React from "react";
import { useParams, Link } from "react-router-dom";
import BT from "./BT";
import NavigationMenu from "./NavigationMenu";
import CategoryDescription from "./CategoryDescription";
import Grid from "./Gird";
import ProductPage from "../ProductPage";

export default function Breadcrumb() {
  const { category, subCategory } = useParams();

  const categoryLabel = {
    "do-nam": "Đồ Nam",
    "do-nu": "Đồ Nữ",
    "dong-ho": "Đồng Hồ",
    "thuong-hieu": "Thương Hiệu",
    "sale": "Khuyến Mãi 10.10",
    "running-gears":"Running Gears",
    "triathlon":"Triathlon",
  }[category] || "Danh mục";

  const subCategoryLabel = {
    ao: "Áo",
    quan: "Quần",
    "giay-chay-bo": "Giày Chạy Bộ",
    "giay-dia-hinh": "Giày Địa Hình",
    suunto: "Suunto",
    garmin: "Garmin",
    coros: "Coros",

  }[subCategory] || null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <BT />

      {/* Breadcrumb */}
      <header className="bg-gray-100 px-4 py-10">
        <nav className="max-w-7xl mx-auto flex items-center text-lg text-gray-700 select-none">
          {/* Trang chủ */}
          <Link
            to="/"
            className="hover:text-purple-600 transition-colors cursor-pointer"
          >
            Trang chủ
          </Link>

          {/* Danh mục cha */}
          {category && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <Link
                to={`/${category}`}
                className="hover:text-purple-600 transition-colors cursor-pointer"
              >
                {categoryLabel}
              </Link>
            </>
          )}

          {/* Danh mục con (clickable luôn) */}
          {subCategory && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <Link
                to={`/${category}/${subCategory}`}
                className="hover:text-purple-600 transition-colors cursor-pointer"
              >
                {subCategoryLabel}
              </Link>
            </>
          )}
        </nav>
      </header>
      <ProductPage/>
    </div>
  );
}
