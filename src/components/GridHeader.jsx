import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function GridHeader({ totalProducts }) {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="w-full">
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Title + Total products (chỉ hiện ở desktop) */}
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl md:text-3xl font-bold uppercase text-gray-900">
            ĐỒ NAM
          </h1>
          <span className="hidden md:inline text-sm text-gray-600">
            ({totalProducts} Sản phẩm)
          </span>
        </div>

        {/* Dropdown */}
        <div className="w-40 sm:w-52 md:w-auto">
          <select
            name="sort-by"
            value={sortOption}
            onChange={handleSortChange}
            className="w-full border border-gray-300 rounded-md bg-white py-1.5 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sắp xếp sản phẩm"
          >
            <option value="">-- Sắp xếp theo --</option>
            <option value="newest">Sản phẩm mới nhất</option>
            <option value="price_desc">Giá giảm dần</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="sale">Giảm giá</option>
          </select>
        </div>
      </div>
    </div>
  );
}
