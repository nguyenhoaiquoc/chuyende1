import { clothingSizes } from "../data/sizeCharts.mock";

export default function ClothingSizeChart() {
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-3">Phom dáng</h3>
      <p className="mb-4">
        Dáng Race Fit ôm sát cơ thể giúp tối ưu hiệu suất khí động học. Nếu bạn
        muốn cảm giác thoải mái hơn, nên chọn tăng 1 size.
      </p>
      <h3 className="text-xl font-semibold mb-4">Bảng size (cm)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 font-semibold">Size</th>
              <th className="border border-gray-300 p-3 font-semibold">Ngực</th>
              <th className="border border-gray-300 p-3 font-semibold">Eo</th>
              <th className="border border-gray-300 p-3 font-semibold">Hông</th>
            </tr>
          </thead>
          <tbody>
            {/* Lấy data từ file import */}
            {clothingSizes.map((row) => (
              <tr key={row.size}>
                <td className="border border-gray-300 p-3">{row.size}</td>
                <td className="border border-gray-300 p-3">{row.chest}</td>
                <td className="border border-gray-300 p-3">{row.waist}</td>
                <td className="border border-gray-300 p-3">{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
