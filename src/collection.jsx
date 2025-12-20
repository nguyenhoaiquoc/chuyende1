// src/Collection.jsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./collection.css";

import nam from "./assets/nam.jpg";
import nu from "./assets/women.jpg";
import dongho from "./assets/dongho.jpg";

import ProductPopup from "./components/ProductPopup";

const API = "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api";

const collectionsConfig = [
  { key: "men", title: "Men", image: nam, categoryId: 1 },
  { key: "women", title: "Women", image: nu, categoryId: 2 },
  { key: "watches", title: "ĐỒNG HỒ - TAI NGHE", image: dongho, categoryId: 3 },
];

// format giá
const formatPrice = (price) =>
  Number(price).toLocaleString("vi-VN") + " VNĐ";

// tính giá cũ từ sale %
const getOldPrice = (p) => {
  if (!p.sale || p.sale <= 0) return null;
  return Math.round(p.price / (1 - p.sale / 100));
};

function Collection() {
  const [collectionsData, setCollectionsData] = useState({});

  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch(`${API}/products`);
        const allProducts = await res.json();

        const mapped = {};
        collectionsConfig.forEach((col) => {
          mapped[col.key] = allProducts
            .filter(
              (p) => p.categoryId === col.categoryId && p.status === "Active"
            )
            .slice(0, 6);
        });

        setCollectionsData(mapped);
      } catch (err) {
        console.error("Fetch collections error:", err);
      }
    }

    fetchCollections();
  }, []);

  return (
    <main className="collections-page">
      <h1 className="page-title">Các Bộ Sưu Tập</h1>

      {collectionsConfig.map((col) => {
        const products = collectionsData[col.key] ?? [];
        if (!products.length) return null;

        return (
          <div key={col.key} className="collection-wrapper">
            <CollectionSection
              title={col.title}
              image={col.image}
              products={products}
            />
          </div>
        );
      })}
    </main>
  );
}

export default Collection;

function CollectionSection({ title, image, products }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleCloseQuickView = () => setQuickViewProduct(null);

  return (
    <section className="collection">
      <h2 className="collection-title">{title}</h2>

      <div className="collection-content">
        <div className="collection-image">
          <img src={image} alt={title} />
        </div>

        <div className="collection-products grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {products.map((p) => {
            const oldPrice = getOldPrice(p);
            return (
              <Link
                key={p.product_id || p.id}
                to={`/product/${p.product_id || p.id}`}
                state={{ product: p }}
                className="group relative block rounded-lg overflow-hidden text-center bg-white transform transition-all duration-300 hover:shadow-xl"
              >
                {/* Vùng ảnh sản phẩm */}
                <div className="relative group">
                  <div className="w-full h-full aspect-square overflow-hidden relative">
                    <img
                      src={p.imgHover || p.imgMain}
                      alt={p.name}
                      className="object-cover w-full h-full absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"
                    />
                    <img
                      src={p.imgMain}
                      alt={p.name}
                      className="object-cover w-full h-full group-hover:scale-0 transition-transform duration-500 ease-in-out delay-350 relative z-20"
                    />
                  </div>

                  {/* --- BADGES --- */}
                  <div className="absolute inset-0 z-30 pointer-events-none">
                    {p.sale > 0 && (
                      <span className="absolute top-2 left-2 bg-purple-700 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                        -{p.sale}%
                      </span>
                    )}
                    {p.gift && (
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black text-xs px-3 py-2 rounded-md shadow-md">
                        🎁
                      </span>
                    )}
                    {p.bestseller && (
                      <span className="absolute top-3 right-[-30px] bg-red-600 text-white text-[10px] font-bold px-6 py-1 rotate-45 shadow-md">
                        BEST SELLER
                      </span>
                    )}
                  </div>

                  {/* --- ICONS: Xem nhanh / Xem chi tiết --- */}
                  <div className="absolute top-[10%] left-[10px] z-40 flex flex-col items-center">
                    <div className="relative group/zoom">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuickView(p);
                        }}
                        className="hover:bg-purple-800 bg-white p-4 rounded-md mb-4 hover:text-white z-10 transition-colors duration-300 hidden md:block"
                      >
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity"
                        />
                      </button>
                      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-40">
                        Xem nhanh
                      </span>
                    </div>

                    <div className="relative group/eye">
                      <Link
                        to={`/product/${p.product_id || p.id}`}
                        state={{ product: p }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white hover:bg-purple-800 p-4 rounded-md hover:text-white z-10 transition-colors duration-300"
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-[12px] opacity-0 group-hover:opacity-100 duration-500 ease-in-out transition-opacity"
                        />
                      </Link>
                      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/eye:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-40">
                        Xem chi tiết
                      </span>
                    </div>
                  </div>
                </div>

                {/* --- THÔNG TIN SẢN PHẨM --- */}
                <div className="mt-2 p-3 text-center">
                  <div className="font-medium text-[14px] md:text-lg">
                    {p.name}
                  </div>
                  <div className="flex flex-col items-center mt-1">
                    <div className="text-red-600 font-bold text-base">
                      {formatPrice(p.price)}
                    </div>
                    {oldPrice && (
                      <div className="text-gray-500 text-sm line-through mt-0.5">
                        {formatPrice(oldPrice)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Popup xem nhanh */}
      {quickViewProduct && (
        <ProductPopup product={quickViewProduct} onClose={handleCloseQuickView} />
      )}
    </section>
  );
}
