import { useRef, useState } from "react";
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
import { Link } from "react-router-dom";
<<<<<<< HEAD

=======
import ProductPopup from "./components/ProductPopup";
>>>>>>> 1467ac228e80d51688a6ceabb791993b0915ceab
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
  // Women
  {
    title: "Women",
    image: nu,
    products: [
<<<<<<< HEAD
      { id: 1, name: "Áo croptop nữ", price: "280.000₫", oldPrice: "350.000₫", image: nu1, hoverImage: nu2, discountPercent: 20, isBestSeller: true ,isGift: true },
=======
      { id: 1, name: "Áo croptop nữ", price: "280.000₫", oldPrice: "350.000₫", image: nu1, hoverImage: nu2, discountPercent: 20, isBestSeller: true, isGift: true },
>>>>>>> 1467ac228e80d51688a6ceabb791993b0915ceab
      { id: 2, name: "Quần legging tập gym", price: "410.000₫", image: nu2, hoverImage: nu3 },
      { id: 3, name: "Giày thể thao nữ", price: "860.000₫", oldPrice: "980.000₫", image: nu3, hoverImage: nu4, isBestSeller: true },
      { id: 4, name: "Áo khoác tập yoga", price: "520.000₫", image: nu4, hoverImage: nu5 },
      { id: 5, name: "Bình nước tập gym", price: "150.000₫", image: nu5, hoverImage: nu6, isGift: true },
      { id: 6, name: "Băng đô thể thao", price: "90.000₫", image: nu6, hoverImage: nu1 },
    ],
  },
  // Phụ kiện
  {
    title: "Phụ kiện",
    image: phukien,
    products: [
<<<<<<< HEAD
      { id: 1, name: "Kính chạy 100%", price: "3.874.000₫", oldPrice: "4.500.000₫", image: phukien1, hoverImage: phukien2, discountPercent: 14,isBestSeller: true ,isGift: true },
      { id: 2, name: "Mũ FRACTEL", price: "1.350.000₫", image: phukien2, hoverImage: phukien3, isGift: true },
      { id: 3, name: "Tất Injinji RUN", price: "369.000₫", oldPrice: "450.000₫", image: phukien3, hoverImage: phukien4, discountPercent: 18, isBestSeller: true ,isGift: true },
      { id: 4, name: "Đèn đội đầu Nitecore", price: "1.050.000₫", image: phukien4, hoverImage: phukien5 },
      { id: 5, name: "Thắt lưng Naked", price: "890.000₫", image: phukien5, hoverImage: phukien6, isBestSeller: true,discountPercent: 22, isGift: true },
=======
      { id: 1, name: "Kính chạy 100%", price: "3.874.000₫", oldPrice: "4.500.000₫", image: phukien1, hoverImage: phukien2, discountPercent: 14, isBestSeller: true, isGift: true },
      { id: 2, name: "Mũ FRACTEL", price: "1.350.000₫", image: phukien2, hoverImage: phukien3, isGift: true },
      { id: 3, name: "Tất Injinji RUN", price: "369.000₫", oldPrice: "450.000₫", image: phukien3, hoverImage: phukien4, discountPercent: 18, isBestSeller: true, isGift: true },
      { id: 4, name: "Đèn đội đầu Nitecore", price: "1.050.000₫", image: phukien4, hoverImage: phukien5 },
      { id: 5, name: "Thắt lưng Naked", price: "890.000₫", image: phukien5, hoverImage: phukien6, isBestSeller: true, discountPercent: 22, isGift: true },
>>>>>>> 1467ac228e80d51688a6ceabb791993b0915ceab
      { id: 6, name: "Bình nước UltraSpine", price: "420.000₫", image: phukien6, hoverImage: phukien1 },
    ],
  },
  // Triathlon
  {
    title: "Triathlon",
    image: triathlon,
    products: [
      { id: 1, name: "Bộ đồ thi đấu", price: "1.650.000₫", image: triathlon1, hoverImage: triathlon2, isBestSeller: true },
      { id: 2, name: "Kính bơi chuyên nghiệp", price: "590.000₫", oldPrice: "690.000₫", image: triathlon2, hoverImage: triathlon3, discountPercent: 14 },
      { id: 3, name: "Đồng hồ GPS", price: "5.890.000₫", image: triathlon3, hoverImage: triathlon4 },
      { id: 4, name: "Giày đạp xe", price: "2.450.000₫", image: triathlon4, hoverImage: triathlon5 },
      { id: 5, name: "Bộ nón bơi", price: "190.000₫", image: triathlon5, hoverImage: triathlon6, isGift: true },
      { id: 6, name: "Thắt lưng nước", price: "420.000₫", image: triathlon6, hoverImage: triathlon1 },
    ],
  },
  // Đồng hồ
  {
    title: "ĐỒNG HỒ - TAI NGHE",
    image: dongho,
    products: [
      { id: 1, name: "PACE 3 | Đồng hồ chạy bộ", price: "1.650.000₫", image: dongho1, hoverImage: dongho2, isBestSeller: true },
      { id: 2, name: "PACE 3 | Đồng hồ chạy bộ", price: "590.000₫", image: dongho2, hoverImage: dongho3 },
      { id: 3, name: "PACE 3 | Đồng hồ chạy bộ", price: "5.890.000₫", image: dongho3, hoverImage: dongho4, oldPrice: "6.200.000₫", discountPercent: 5 },
      { id: 4, name: "PACE 3 | Đồng hồ chạy bộ", price: "2.450.000₫", image: dongho4, hoverImage: dongho5 },
      { id: 5, name: "Đồng hồ Coros Apex 2", price: "190.000₫", image: dongho5, hoverImage: dongho6 },
      { id: 6, name: "Đồng hồ Coros Apex", price: "420.000₫", image: dongho6, hoverImage: dongho1, isGift: true },
    ],
  },
  // DINH DƯỠNG
  {
    title: "DINH DƯỠNG",
    image: dinhduong,
    products: [
      { id: 1, name: "GU Liquid Gel | Thức uống năng lượng", price: "1.650.000₫", image: dinhduong1, hoverImage: dinhduong2 },
      { id: 2, name: "GU Liquid Gel | Thức uống năng lượng", price: "590.000₫", image: dinhduong2, hoverImage: dinhduong3, oldPrice: "690.000₫", discountPercent: 14 },
      { id: 3, name: "GU Liquid Gel | Thức uống năng lượng", price: "5.890.000₫", image: dinhduong3, hoverImage: dinhduong4 },
      { id: 4, name: "GU Liquid Gel | Thức uống năng lượng", price: "2.450.000₫", image: dinhduong4, hoverImage: dinhduong5 },
      { id: 5, name: "Gel SiS | Gói Gel Năng Lượng SiS GO", price: "190.000₫", image: dinhduong5, hoverImage: dinhduong6 },
      { id: 6, name: "Gel SiS | Gói Gel Năng Lượng Go Isotonic", price: "420.000₫", image: dinhduong6, hoverImage: dinhduong1 },
    ],
  },
  // CHẤN THƯƠNG
  {
    title: "CHẤN THƯƠNG",
    image: chanthuong,
    products: [
      { id: 1, name: "EVO | Dụng Cụ Massage Cơ Đa năng", price: "1.650.000₫", image: chanthuong1, hoverImage: chanthuong2 },
      { id: 2, name: "KICA K3 | Dụng cụ massage cơ đa năng", price: "590.000₫", image: chanthuong2, hoverImage: chanthuong3 },
      { id: 3, name: "Đồng hồ GPSKiCA Pro | Dụng cụ massage cơ đa năng", price: "5.890.000₫", image: chanthuong3, hoverImage: chanthuong4 },
      { id: 4, name: "KiCA Pro | Dụng cụ massage cơ đa năng", price: "2.450.000₫", image: chanthuong4, hoverImage: chanthuong5 },
      { id: 5, name: "Bó Gối Chống Chấn Thương Pro", price: "190.000₫", image: chanthuong5, hoverImage: chanthuong6 },
      { id: 6, name: "Bó Gối Hỗ Trợ Chấn Thương Pro", price: "420.000₫", image: chanthuong6, hoverImage: chanthuong1 },
    ],
  },
  // LIFESTYLE SPORTS
  {
    title: "LIFESTYLE SPORTS",
    image: lifestyleSports,
    products: [
      { id: 1, name: "Cloudrunner 2 | Giày Chạy Bộ Nam ON", price: "1.650.000₫", image: lifestyleSports1, hoverImage: lifestyleSports2 },
      { id: 2, name: "KíCloudrunner 2 | Giày Chạy Bộ Nam ON", price: "590.000₫", image: lifestyleSports2, hoverImage: lifestyleSports3 },
      { id: 3, name: "Giày Chạy Bộ Nữ ON", price: "5.890.000₫", image: lifestyleSports3, hoverImage: lifestyleSports4 },
      { id: 4, name: "Giày Chạy Bộ Nữ ON", price: "2.450.000₫", image: lifestyleSports4, hoverImage: lifestyleSports5 },
      { id: 5, name: "Giày Chạy Bộ Nữ ON", price: "190.000₫", image: lifestyleSports5, hoverImage: lifestyleSports6 },
<<<<<<< HEAD
      { id: 6, name: "Giày Chạy Bộ Nữ ON", price: "420.000₫", image: lifestyleSports6, hoverImage: lifestyleSports1,discountPercent: 15, isBestSeller: true ,isGift: true },
    ],     
  },
  // OUTLET
  {   
=======
      { id: 6, name: "Giày Chạy Bộ Nữ ON", price: "420.000₫", image: lifestyleSports6, hoverImage: lifestyleSports1, discountPercent: 15, isBestSeller: true, isGift: true },
    ],
  },
  // OUTLET
  {
>>>>>>> 1467ac228e80d51688a6ceabb791993b0915ceab
    title: "OUTLET Xem thêm ...",
    image: xemthem,
    products: [
      { id: 1, name: "Cloudrunner 2 | Giày Chạy Bộ Nam ON", price: "1.650.000₫", image: xemthem1, hoverImage: xemthem2 },
      { id: 2, name: "KíCloudrunner 2 | Giày Chạy Bộ Nam ON", price: "590.000₫", image: xemthem2, hoverImage: xemthem3 },
      { id: 3, name: "Giày Chạy Bộ Nữ ON", price: "5.890.000₫", image: xemthem3, hoverImage: xemthem4 },
      { id: 4, name: "Giày Chạy Bộ Nữ ON", price: "2.450.000₫", image: xemthem4, hoverImage: xemthem5 },
      { id: 5, name: "Giày Chạy Bộ Nữ ON", price: "190.000₫", image: xemthem5, hoverImage: xemthem6 },
<<<<<<< HEAD
      { id: 6, name: "Giày Chạy Bộ Nữ ON", price: "420.000₫", image: xemthem6, hoverImage: xemthem1,discountPercent: 25, isBestSeller: true ,isGift: true },
=======
      { id: 6, name: "Giày Chạy Bộ Nữ ON", price: "420.000₫", image: xemthem6, hoverImage: xemthem1, discountPercent: 25, isBestSeller: true, isGift: true },
>>>>>>> 1467ac228e80d51688a6ceabb791993b0915ceab
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
<<<<<<< HEAD
export default Collection;

function CollectionSection({ title, image, products }) {
  
 const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenPopup = (product) => {
    console.log("Mở popup với:", product);
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    console.log("Đóng popup");
    setSelectedProduct(null);
  };
=======
export default CollectionsPage;

function CollectionSection({ title, image, products }) {

 const [selectedProduct, setSelectedProduct] = useState(null);
>>>>>>> 1467ac228e80d51688a6ceabb791993b0915ceab

const handleOpenPopup = (product) => {
  setSelectedProduct(product);
  setShowPopup(true);
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
            <a href="#" key={p.id} className="product">
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
<<<<<<< HEAD
                   <button
                    className="zoom-in"
                    onClick={() => handleOpenPopup(p)}
                    title="Xem nhanh"
                  >
                    <MdOutlineZoomIn />
                  </button>
                  <Link to="/Detail" className="eye"  title="Xem chi tiết">
=======

                  <button onClick={() => handleOpenPopup(p)} title="Xem nhanh">
                  <MdOutlineZoomIn />
                  </button>
                  <Link to={`/product/:id`} title="Xem chi tiết">
>>>>>>> 1467ac228e80d51688a6ceabb791993b0915ceab
                    <FaEye />
                  </Link>
                </div>
              </div>
              <h3>{p.name}</h3>
              <p className="price">
                {p.oldPrice && <span className="old-price">{p.oldPrice}</span>} {p.price}
              </p>
              <a href="#" className="addtocart">Thêm vào giỏ hàng</a>
            </a>  
          ))}
        </div>
      </div>
    </section>
   
  );
}
