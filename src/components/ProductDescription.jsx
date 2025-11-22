import React from "react";
import { sizeTypes } from "../data/sizeTypes";
import { sizes } from "../data/sizes";

const COLUMN_LABELS = {
  eu: "EU",
  us: "US",
  uk: "UK",
  ep: "Nhật (mm)",
  label: "Size",
  chest: "Vòng ngực (cm)",
  waist: "Vòng eo (cm)",
  hip: "Vòng mông (cm)",
};

export default function ProductDescription({
  descriptionHtml,
  sizeTypeId,
  imgUrl,
  productName, // <--- Thêm prop này để hiện tên sản phẩm đầu tiên
}) {
  const type = sizeTypes.find((t) => t.id === sizeTypeId);
  const sizeRows = sizes.filter((s) => s.sizeTypeId === sizeTypeId);

  return (
    <div className="text-gray-700">
      {/* 1. TIÊU ĐỀ SẢN PHẨM (Giống trong hình Zoot Elite...) */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">{productName}</h3>

      {/* 2. NỘI DUNG HTML (Mô tả chữ) */}
      <div
        className="prose prose-sm max-w-none mb-6 text-justify" // text-justify cho đều 2 bên đẹp
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />

      {/* 3. ẢNH MINH HỌA (Đưa xuống dưới chữ) */}
      {imgUrl && (
        <div className="w-full mb-8">
          <img
            src={imgUrl}
            alt={productName}
            className="w-380 h-auto rounded-lg object-cover shadow-sm" // Bỏ khung xám, để ảnh full width
          />
        </div>
      )}

      {/* 4. BẢNG SIZE (Nằm cuối cùng) */}
      {type && sizeRows.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 uppercase flex items-center gap-2">
            📏 Bảng quy đổi size: {type.name}
          </h3>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  {type.columns.map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 border-b border-r last:border-r-0 whitespace-nowrap"
                    >
                      {COLUMN_LABELS[col] || col.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    {type.columns.map((col) => (
                      <td
                        key={`${row.id}-${col}`}
                        className="px-6 py-3 border-b border-r last:border-r-0 font-medium text-gray-900 text-center"
                      >
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-400 italic">
            * Số liệu mang tính chất tham khảo.
          </p>
        </div>
      )}
    </div>
  );
}
