import { shoeSizes } from "../data/sizeCharts.mock";

const SizeTable = ({ title, sizes }) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-3">{title}</h4>  
    <table className="min-w-full border border-collapse border-gray-300 text-center">
        
      <thead>
          
        <tr className="bg-gray-100">
            
          <th className="border border-gray-300 p-2 font-semibold">US</th>
          <th className="border border-gray-300 p-2 font-semibold">UK</th>  
          <th className="border border-gray-300 p-2 font-semibold">EU</th>
          <th className="border border-gray-300 p-2 font-semibold">JP</th>  
        </tr>  
      </thead>  
      <tbody>
          
        {sizes.map((size, index) => (
          <tr key={index}>
              
            <td className="border border-gray-300 p-2">{size.US}</td>  
            <td className="border border-gray-300 p-2">{size.UK}</td>  
            <td className="border border-gray-300 p-2">{size.EU}</td>  
            <td className="border border-gray-300 p-2">{size.JP}</td>  
          </tr>
        ))}  
      </tbody>  
    </table>  
  </div>
);

export default function ShoeSizeChart() {
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">Bảng size giày</h3>  
      <div className="overflow-x-auto">
        {/* Lấy data từ file import */}
        <SizeTable title="Men/Nam" sizes={shoeSizes.men} />
        <SizeTable title="Women/Nữ" sizes={shoeSizes.women} />  
      </div>  
    </div>
  );
}
