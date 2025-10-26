import React from "react";
import "./collection.css";
import { MdOutlineZoomIn } from "react-icons/md";
import { FaEye } from "react-icons/fa";

// import tất cả ảnh
import nam from './assets/nam.jpg';
import nam1 from './assets/nam1.jpeg';
import nam2 from './assets/nam2.jpeg';
import nam3 from './assets/nam3.jpeg';
import nam4 from './assets/nam4.jpg';
import nam5 from './assets/nam5.jpg';
import nam6 from './assets/nam6.jpg';
import nu from './assets/women.jpg';
import nu1 from './assets/women1.jpeg';
import nu2 from './assets/women2.jpeg';
import nu3 from './assets/women3.jpeg';
import nu4 from './assets/women4.jpeg';
import nu5 from './assets/women5.jpeg';
import nu6 from './assets/women6.jpeg';
import phukien from './assets/phukien.jpg';
import phukien1 from './assets/phukien1.jpg';
import phukien2 from './assets/phukien2.jpeg';
import phukien3 from './assets/phukien3.jpeg';
import phukien4 from './assets/phukien4.jpeg';
import phukien5 from './assets/phukien5.jpeg';
import phukien6 from './assets/phukien6.jpeg';
import triathlon from './assets/triathlon.jpg';
import triathlon1 from './assets/triathlon1.jpeg';
import triathlon2 from './assets/triathlon2.jpeg';
import triathlon3 from './assets/triathlon3.jpeg';
import triathlon4 from './assets/triathlon4.jpeg';
import triathlon5 from './assets/triathlon5.jpeg';
import triathlon6 from './assets/triathlon6.jpeg';
import dongho from './assets/dongho.jpg';
import dongho1 from './assets/dongho1.jpeg';
import dongho2 from './assets/dongho2.jpeg';
import dongho3 from './assets/dongho3.jpeg';
import dongho4 from './assets/dongho4.jpeg';
import dongho5 from './assets/dongho5.jpg';
import dongho6 from './assets/dongho6.jpg';
import dinhduong from './assets/dinhduong.jpg';
import dinhduong1 from './assets/dinhduong1.jpeg';
import dinhduong2 from './assets/dinhduong2.jpeg';
import dinhduong3 from './assets/dinhduong3.jpeg';
import dinhduong4 from './assets/dinhduong4.jpeg';
import dinhduong5 from './assets/dinhduong5.jpeg';
import dinhduong6 from './assets/dinhduong6.jpeg';
import chanthuong from './assets/chanthuong.jpg';
import chanthuong1 from './assets/chanthuong1.jpeg';
import chanthuong2 from './assets/chanthuong2.jpeg';  
import chanthuong3 from './assets/chanthuong3.jpeg';
import chanthuong4 from './assets/chanthuong4.jpg';
import chanthuong5 from './assets/chanthuong5.jpg';
import chanthuong6 from './assets/chanthuong6.jpg';
import lifestyleSports from './assets/Lifestyle Sports.jpeg';
import lifestyleSports1 from './assets/Lifestyle Sports1.jpeg';
import lifestyleSports2 from './assets/Lifestyle Sports2.jpeg';
import lifestyleSports3 from './assets/Lifestyle Sports3.jpeg';
import lifestyleSports4 from './assets/Lifestyle Sports4.jpeg';
import lifestyleSports5 from './assets/Lifestyle Sports5.jpeg';
import lifestyleSports6 from './assets/Lifestyle Sports6.jpeg';
import xemthem from './assets/xemthem.jpeg';
import xemthem1 from './assets/xemthem1.jpeg';
import xemthem2 from './assets/xemthem2.jpg';
import xemthem3 from './assets/xemthem3.jpeg';
import xemthem4 from './assets/xemthem4.jpeg';
import xemthem5 from './assets/xemthem5.jpeg';
import xemthem6 from './assets/xemthem6.jpg';
// Dữ liệu
const collectionsData = [
  {
    title: "Men",
    image: nam,
    products: [
      { id: 1, name: "Áo thể thao nam", price: "350.000₫", oldPrice: "450.000₫", image: nam1, hoverImage: nam2, discountPercent: 22, isBestSeller: true, isGift: true },
      { id: 2, name: "Quần training", price: "420.000₫", oldPrice: "500.000₫", image: nam2, hoverImage: nam3, discountPercent: 21, isBestSeller: true, isGift: true },
      { id: 3, name: "Giày chạy bộ", price: "890.000₫", oldPrice: "1.050.000₫", image: nam3, hoverImage: nam4 },
      { id: 4, name: "Áo khoác gió", price: "560.000₫", image: nam4, hoverImage: nam5 },
      { id: 5, name: "Tất thể thao", price: "120.000₫", image: nam5, hoverImage: nam6 },
      { id: 6, name: "Mũ lưỡi trai", price: "210.000₫", image: nam6, hoverImage: nam1 },
    ],
  },
];

function Collection() {
  return (
    <main className="collections-page">
      <h1 className="page-title">Các Bộ Sưu Tập</h1>
      {collectionsData.map((col, index) => (
        <div key={index} className="collection-wrapper">
          <CollectionSection
            title={col.title}
            image={col.image}
            products={col.products}
          />
        </div>
      ))}
    </main>
  );
}

export default Collection;

function CollectionSection({ title, image, products }) {
  const handleClickDetail = (id) => {
    alert(`Đi tới chi tiết sản phẩm ID ${id}`);
  };

  const handleClickQuickView = (id) => {
    alert(`Xem nhanh sản phẩm ID ${id}`);
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
              <div className="product-image-wrapper">
                <img
                  src={p.image}
                  alt={p.name}
                  className="main-img"
                  onMouseOver={(e) => { if (p.hoverImage) e.currentTarget.src = p.hoverImage }}
                  onMouseOut={(e) => { e.currentTarget.src = p.image }}
                />
                {p.discountPercent && <div className="icon discount">{p.discountPercent}%</div>}
                {p.isGift && <div className="icon gift">🎁</div>}
                {p.isBestSeller && <div className="ribbon bestseller">BEST SELLER</div>}
                <div className="hover-icons">
                  <span className="eye" onClick={() => handleClickDetail(p.id)} title="Xem chi tiết">
                    <MdOutlineZoomIn />
                  </span>
                  <span className="magnifier" onClick={() => handleClickQuickView(p.id)} title="Xem nhanh">
                    <FaEye />
                  </span>
                </div>
              </div>

              <h3>{p.name}</h3>
              <p className="price">
                {p.oldPrice && <span className="old-price">{p.oldPrice}</span>} {p.price}
              </p>
              <p className="add-to-cart">Thêm vào giỏ hàng</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
