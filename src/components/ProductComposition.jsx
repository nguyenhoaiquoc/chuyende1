import React from "react";

// Helper để làm đẹp tên thương hiệu (nếu cần)
const formatBrand = (brandId) => {
  const brands = {
    hoka: "Hoka One One",
    on: "On Running",
    coros: "COROS",
    luna: "LUNA Sandals",
  };
  return brands[brandId] || brandId.toUpperCase();
};

export default function ProductComposition({ product }) {
  // 1. Tạo mảng thông tin cơ bản từ product gốc
  const basicSpecs = [
    { label: "Tên sản phẩm", value: product.name },
    { label: "Thương hiệu", value: formatBrand(product.brandId) },
  ];

  // 2. Gộp với mảng specifications (nếu có)
  // Nếu product.specifications không có thì dùng mảng rỗng để tránh lỗi
  const fullSpecs = [...basicSpecs, ...(product.specifications || [])];

  return (
    <div className="text-sm text-gray-700">
      {/* --- Giao diện Mobile (List) --- */}
      <div className="md:hidden space-y-6">
        {fullSpecs.map((item, index) => (
          <div key={index} className="border-b pb-4 last:border-0">
            <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
            {item.isList ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {item.value.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* --- Giao diện Desktop (Table) --- */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {fullSpecs.map((item, index) => (
              <tr key={index}>
                {/* Cột Label */}
                <td className="px-6 py-4 font-semibold text-gray-800 bg-gray-50 w-1/3 align-top">
                  {item.label}
                </td>

                {/* Cột Value */}
                <td className="px-6 py-4 align-top text-gray-600">
                  {item.isList ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {item.value.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
