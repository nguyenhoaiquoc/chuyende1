import { sizeTypes } from "../data/sizeTypes";
import { sizes } from "../data/sizes";

const ClothingSizeChart = () => (
  <table className="min-w-full divide-y divide-gray-200 border my-4">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          Size
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          S
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          M
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          L
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          XL
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-4 py-2 text-sm">Vòng ngực (cm)</td>
        <td className="px-4 py-2 text-sm">86-91</td>
        <td className="px-4 py-2 text-sm">92-97</td>
        <td className="px-4 py-2 text-sm">98-103</td>
        <td className="px-4 py-2 text-sm">104-109</td>
      </tr>
    </tbody>
  </table>
);

// === Bảng size Giày (US021) ===
const ShoeSizeChart = () => (
  <table className="min-w-full divide-y divide-gray-200 border my-4">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          EU
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          US
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          UK
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          JP (cm)
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-4 py-2 text-sm">40</td>
        <td className="px-4 py-2 text-sm">7</td>
        <td className="px-4 py-2 text-sm">6.5</td>
        <td className="px-4 py-2 text-sm">25</td>
      </tr>
    </tbody>
  </table>
);

export default function ProductDescription({ descriptionHtml, sizeTypeId }) {
  const type = sizeTypes.find((t) => t.id === sizeTypeId);
  const sizeRows = sizes.filter((s) => s.sizeTypeId === sizeTypeId);

  return (
    <div>
      <div
        className="prose prose-sm max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />

      {type && sizeRows.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Bảng size ({type.name})</h3>

          <table className="min-w-full divide-y divide-gray-200 border my-4">
            <thead className="bg-gray-50">
              <tr>
                {type.columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sizeRows.map((row) => (
                <tr key={row.id}>
                  {type.columns.map((col) => (
                    <td className="px-4 py-2 text-sm" key={col}>
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
