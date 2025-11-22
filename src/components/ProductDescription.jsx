import ClothingSizeChart from "./ClothingSizeChart";
import ShoeSizeChart from "./ShoeSizeChart";

const descriptionStyles = `
  .product-html-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .product-html-content p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .product-html-content img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
  }
`;

export default function ProductDescription({ descriptionHtml, productType }) {
  // Chuẩn hoá loại sản phẩm từ API
  const type = productType?.toLowerCase()?.trim();

  return (
    <div>
      <style>{descriptionStyles}</style>

      {/* --- Render mô tả chi tiết HTML --- */}
      <div
        className="product-html-content"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />

      {/* --- Chọn bảng size theo loại sản phẩm --- */}
      {(type === "giay" ||
        type === "shoe" ||
        type === "shoes" ||
        type === "ao" ||
        type === "shirt") && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Bảng size tham khảo</h3>

          {/** Giày → bảng size giày */}
          {(type === "giay" || type === "shoe" || type === "shoes") && (
            <ShoeSizeChart />
          )}

          {/** Áo → bảng size áo */}
          {(type === "ao" || type === "shirt") && <ClothingSizeChart />}
        </div>
      )}
    </div>
  );
}
