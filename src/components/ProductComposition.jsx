//data
const productData = {
  name: "Zoot Elite Tri Aero Fx Racesuit",
  brand: "Zoot",
  sizes: [
    "S (Ngực 86-91cm, Eo 71-76cm)",
    "M (Ngực 92-97cm, Eo 77-82cm)",
    "L (Ngực 98-103cm, Eo 83-88cm)",
  ],
  features: [
    "Vải dệt Exo-Dry™ High Thread Count",
    "Highway Ribbed Fabric (Vải gân)",
    "Aeromax™ Mesh Back Panel (Lưới lưng)",
    "Đệm PRO Carbon Tri Chamois",
  ],
};

export default function ProductComposition() {
  return (
    // Không dùng 'prose' ở đây để kiểm soát style của bảng tốt hơn
    <div className="text-sm text-gray-700">
      {/* --- Giao diện Mobile (List) --- */}
      {/* Trên mobile, bảng 2 cột thường xấu, nên ta dùng danh sách */}
      <div className="md:hidden space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800">Tên sản phẩm</h4>
          <p>{productData.name}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Thương hiệu</h4>
          <p>{productData.brand}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Kích cỡ</h4>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            {productData.sizes.map((size, index) => (
              <li key={index}>{size}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Đặc điểm</h4>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            {productData.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Giao diện Desktop (Table) --- */}
      {/* Bảng 2 cột 4 hàng cho Desktop */}
      <table className="hidden md:table min-w-full border border-gray-200 divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Hàng 1: Tên sản phẩm */}
          <tr>
            <td className="px-4 py-3 font-semibold text-gray-800 bg-gray-50 w-1/3">
              Tên sản phẩm
            </td>
            <td className="px-4 py-3">{productData.name}</td>
          </tr>

          {/* Hàng 2: Thương hiệu */}
          <tr>
            <td className="px-4 py-3 font-semibold text-gray-800 bg-gray-50 w-1/3">
              Thương hiệu
            </td>
            <td className="px-4 py-3">{productData.brand}</td>
          </tr>

          {/* Hàng 3: Kích cỡ */}
          <tr>
            <td className="px-4 py-3 font-semibold text-gray-800 bg-gray-50 w-1/3">
              Kích cỡ
            </td>
            <td className="px-4 py-3">
              {/* Yêu cầu: có dấu chấm trước mỗi dòng */}
              <ul className="list-disc pl-5 space-y-1">
                {productData.sizes.map((size, index) => (
                  <li key={index}>{size}</li>
                ))}
              </ul>
            </td>
          </tr>

          {/* Hàng 4: Đặc điểm */}
          <tr>
            <td className="px-4 py-3 font-semibold text-gray-800 bg-gray-50 w-1/3">
              Đặc điểm
            </td>
            <td className="px-4 py-3">
              {/* Yêu cầu: có dấu chấm trước mỗi dòng */}
              <ul className="list-disc pl-5 space-y-1">
                {productData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
