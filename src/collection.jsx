// src/Collection.jsx
import { useState, useEffect } from "react";
import "./collection.css";

// ảnh banner lớn cho từng bộ sưu tập
import nam from "./assets/nam.jpg";
import nu from "./assets/women.jpg";
import dongho from "./assets/dongho.jpg";

// dùng card & popup chung
import ProductCard from "./components/ProductCard";
import ProductPopup from "./components/ProductPopup";

// Cấu hình từng collection + cách lọc sản phẩm dựa trên categoryId
const collectionsConfig = [
  {
    key: "men",
    title: "Men",
    image: nam,
    filter: (p) => p.categoryId === 1,
  },
  {
    key: "women",
    title: "Women",
    image: nu,
    filter: (p) => p.categoryId === 2,
  },
  {
    key: "watches",
    title: "ĐỒNG HỒ - TAI NGHE",
    image: dongho,
    filter: (p) => p.categoryId === 3,
  },
];

function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api/products"
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch products error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center my-20 text-2xl">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return (
      <div className="text-center my-20 text-2xl text-red-600">
        Lỗi khi tải sản phẩm: {error}
      </div>
    );
  }

  return (
    <main className="collections-page">
      <h1 className="page-title">Các Bộ Sưu Tập</h1>

      {collectionsConfig.map((col) => {
        const filteredProducts = products.filter(col.filter).slice(0, 6);

        if (!filteredProducts.length) return null;

        return (
          <div key={col.key} className="collection-wrapper">
            <CollectionSection
              title={col.title}
              image={col.image}
              products={filteredProducts}
            />
          </div>
        );
      })}
    </main>
  );
}

export default Collection;

function CollectionSection({ title, image, products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="collection">
      <h2 className="collection-title">{title}</h2>

      <div className="collection-content">
        <div className="collection-image">
          <img src={image} alt={title} />
        </div>

        <div className="collection-products">
          {products.map((p) => (
            <div key={p.id} className="product">
              <ProductCard product={p} onQuickView={handleOpenPopup} />
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </section>
  );
}
