// Tên file: ProductTabs.jsx

import React, { useState } from "react";
// Cài đặt: npm install @heroicons/react
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// Dữ liệu 2 tab đúng theo yêu cầu US020
const tabs = [
  { id: "description", label: "Mô tả chi tiết" },
  { id: "composition", label: "Thành phần" },
];

export default function ProductTabs({
  descriptionContent,
  compositionContent,
}) {
  // Mặc định chọn 'description' (Mô tả chi tiết) khi vào trang
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full mt-10">
      {/* --- Giao diện Mobile (Accordion) --- */}
      <div className="md:hidden space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div key={tab.id} className="border-t border-gray-200">
              {/* Nút bấm của dropdown */}
              <button
                onClick={() => setActiveTab(isActive ? null : tab.id)} // Bấm lần nữa để đóng
                className={`flex justify-between items-center w-full py-3 px-2 font-medium text-left text-sm ${
                  isActive ? "text-[#673AB7]" : "text-gray-700" // Tô màu tím khi active
                }`}
              >
                <span>{tab.label}</span>
                {/* Xóa icon mũi tên khi active */}
                {!isActive && (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>

            </div>
          );
        })}
        {/* Thêm viền dưới cùng cho mobile */}
        <div className="border-t border-gray-200"></div>

        <div className="py-4 px-2 animate-fade-in">
          {activeTab === "description" && descriptionContent}
          {activeTab === "composition" && compositionContent}
        </div>
      </div>

      {/* --- Giao diện Desktop (Tabs) --- */}
      <div className="hidden md:block">
        {/* Canh lề trái, style nút có border */}
        <div className="flex" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-6 font-medium text-sm border-l border-t border-r border-gray-200 -mb-px rounded-t-md
                ${
                  activeTab === tab.id
                    ? "bg-[#673AB7] text-white border-[#673AB7] z-10" // Active: Màu tím
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200" // Inactive
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Viền dưới của tab */}
        <div className="border-t border-gray-200 w-full"></div>
      </div>

      {/* --- Khu vực nội dung (Chỉ cho Desktop) --- */}
      {/* Nội dung đổ ra bên dưới */}
      <div className="py-6 hidden md:block">
        {activeTab === "description" && (
          <div className="animate-fade-in">{descriptionContent}</div>
        )}
        {activeTab === "composition" && (
          <div className="animate-fade-in">{compositionContent}</div>
        )}
      </div>
    </div>
  );
}
