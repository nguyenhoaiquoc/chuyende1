import React, { useState } from "react";

export default function GridHeader({
  title = "Sản phẩm",
  totalProducts = 0,
  onSortChange,
}) {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange?.(value); // optional callback
  };

  return (
    <div className="w-full border-b">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4">
        {/* ===== TITLE ===== */}
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl md:text-2xl font-semibold uppercase text-gray-800 tracking-wide">
            {title}
          </h1>
          <span className="hidden md:inline text-sm text-gray-600">
            ({totalProducts} Sản phẩm)
          </span>
        </div>

        {/* ===== SORT ===== */}
        <div className="w-40 sm:w-52 md:w-auto">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full border border-gray-300 rounded-md bg-white py-1.5 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
