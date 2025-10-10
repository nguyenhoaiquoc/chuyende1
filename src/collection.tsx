import React from "react";
import "./collection.css";
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
import lifestyleSports from './assets/Lifestyle Sports.jpeg'
import lifestyleSports1 from './assets/Lifestyle Sports1.jpeg'
import lifestyleSports2 from './assets/Lifestyle Sports2.jpeg'
import lifestyleSports3 from './assets/Lifestyle Sports3.jpeg'
import lifestyleSports4 from './assets/Lifestyle Sports4.jpeg'
import lifestyleSports5 from './assets/Lifestyle Sports5.jpeg'
import lifestyleSports6 from './assets/Lifestyle Sports6.jpeg'
import xemthem from './assets/xemthem.jpeg'
import xemthem1 from './assets/xemthem1.jpeg'
import xemthem2 from './assets/xemthem2.jpg'
import xemthem3 from './assets/xemthem3.jpeg'
import xemthem4 from './assets/xemthem4.jpeg'
import xemthem5 from './assets/xemthem5.jpeg'
import xemthem6 from './assets/xemthem6.jpg'
// Dữ liệu tổng cho các collection
const collectionsData = [
  {
    title: "Men",
    image: nam,
    products: [
      { id: 1, name: "Áo thể thao nam", price: "350.000₫", image: nam1 },
      { id: 2, name: "Quần training", price: "420.000₫", image: nam2},
      { id: 3, name: "Giày chạy bộ", price: "890.000₫", image:nam3 },
      { id: 4, name: "Áo khoác gió", price: "560.000₫", image: nam4 },
      { id: 5, name: "Tất thể thao", price: "120.000₫", image: nam5 },
      { id: 6, name: "Mũ lưỡi trai", price: "210.000₫", image: nam6},
    ],
  },
  {
    title: "Women",
    image: nu,
    products: [
      { id: 1, name: "Áo croptop nữ", price: "280.000₫", image:nu1},
      { id: 2, name: "Quần legging tập gym", price: "410.000₫", image:nu2 },
      { id: 3, name: "Giày thể thao nữ", price: "860.000₫", image:nu3 },
      { id: 4, name: "Áo khoác tập yoga", price: "520.000₫", image: nu4 },
      { id: 5, name: "Bình nước tập gym", price: "150.000₫", image: nu5 },
      { id: 6, name: "Băng đô thể thao", price: "90.000₫", image: nu6},
    ],
  },
  {
    title: "Phụ kiện",
    image: phukien,
    products: [
      { id: 1, name: "Kính chạy 100%", price: "3,874,000₫", image: phukien1},
      { id: 2, name: "Mũ FRACTEL", price: "1,350,000₫", image: phukien2 },
      { id: 3, name: "Tất Injinji RUN", price: "369,000₫", image: phukien3 },
      { id: 4, name: "Đèn đội đầu Nitecore", price: "1,050,000₫", image: phukien4 },
      { id: 5, name: "Thắt lưng Naked", price: "890,000₫", image: phukien5 },
      { id: 6, name: "Bình nước UltraSpine", price: "420,000₫", image: phukien6},
    ],
  },
  {
    title: "Triathlon",
    image: triathlon,
    products: [
      { id: 1, name: "Bộ đồ thi đấu", price: "1,650,000₫", image: triathlon1 },
      { id: 2, name: "Kính bơi chuyên nghiệp", price: "590,000₫", image: triathlon2 },
      { id: 3, name: "Đồng hồ GPS", price: "5,890,000₫", image: triathlon3 },
      { id: 4, name: "Giày đạp xe", price: "2,450,000₫", image: triathlon4 },
      { id: 5, name: "Bộ nón bơi", price: "190,000₫", image: triathlon5 },
      { id: 6, name: "Thắt lưng nước", price: "420,000₫", image: triathlon6 },
    ],
  },
   {
    title: "ĐỒNG HỒ - TAI NGHE",
    image: dongho,
    products: [
      { id: 1, name: "PACE 3 | Đồng hồ chạy bộ, thể thao GPS", price: "1,650,000₫", image: dongho1 },
      { id: 2, name: "PACE 3 | Đồng hồ chạy bộ, thể thao GPS", price: "590,000₫", image: dongho2 },
      { id: 3, name: "PACE 3 | Đồng hồ chạy bộ, thể thao GPS", price: "5,890,000₫", image: dongho3 },
      { id: 4, name: "PACE 3 | Đồng hồ chạy bộ, thể thao GPS", price: "2,450,000₫", image: dongho4 },
      { id: 5, name: "Đồng hồ chạy bộ, thể thao GPS Coros Apex 2", price: "190,000₫", image: dongho5 },
      { id: 6, name: "Đồng hồ chạy bộ, thể thao GPS Coros Apex ", price: "420,000₫", image: dongho6 },
    ],
  },
   {
    title: "DINH DƯỠNG",
    image: dinhduong,
    products: [
      { id: 1, name: "GU Liquid Gel | Thức uống năng lượng", price: "1,650,000₫", image: dinhduong1 },
      { id: 2, name: "GU Liquid Gel | Thức uống năng lượng", price: "590,000₫", image: dinhduong2 },
      { id: 3, name: "GU Liquid Gel | Thức uống năng lượng", price: "5,890,000₫", image: dinhduong3 },
      { id: 4, name: "GU Liquid Gel | Thức uống năng lượng ", price: "2,450,000₫", image: dinhduong4 },
      { id: 5, name: "Gel SiS | Gói Gel Năng Lượng SiS GO Energy", price: "190,000₫", image: dinhduong5 },
      { id: 6, name: "Gel SiS | Gói Gel Năng Lượng Go Isotonic", price: "420,000₫", image: dinhduong6 },
    ],
  },
   {
    title: "CHẤN THƯƠNG",
    image: chanthuong,
    products: [
      { id: 1, name: "EVO | Dụng Cụ Massage Cơ Đa năng", price: "1,650,000₫", image: chanthuong1 },
      { id: 2, name: "KICA K3 | Dụng cụ massage cơ đa năng", price: "590,000₫", image: chanthuong2 },
      { id: 3, name: "Đồng hồ GPSKiCA Pro | Dụng cụ massage cơ đa năng", price: "5,890,000₫", image: chanthuong3 },
      { id: 4, name: "KiCA Pro | Dụng cụ massage cơ đa năng", price: "2,450,000₫", image: chanthuong4 },
      { id: 5, name: "Bó Gối Chống Chấn Thương Thể Thao Pro-", price: "190,000₫", image: chanthuong5 },
      { id: 6, name: "Bó Gối Hỗ Trợ Chấn Thương Thể Thao Pro-", price: "420,000₫", image: chanthuong6 },
    ],
  },
  {
    title: "LIFESTYLE SPORTS",
    image: lifestyleSports,
    products: [
      { id: 1, name: "Cloudrunner 2 | Giày Chạy Bộ Nam ON", price: "1,650,000₫", image: lifestyleSports1 },
      { id: 2, name: "KíCloudrunner 2 | Giày Chạy Bộ Nam ONnh bơi chuyên nghiệp", price: "590,000₫", image: lifestyleSports2 },
      { id: 3, name: "ĐÁo Chạy Bộ Nữ ON Running Women'sồng hồ GPS", price: "5,890,000₫", image: lifestyleSports3 },
      { id: 4, name: "GÁo Chạy Bộ Nữ ON Running Women'siày đạp xe", price: "2,450,000₫", image: lifestyleSports4 },
      { id: 5, name: "BÁo Chạy Bộ Nữ ON Running Women'sộ nón bơi", price: "190,000₫", image: lifestyleSports5 },
      { id: 6, name: "TGiày Chạy Bộ Nữ On Running Cloudmonst", price: "420,000₫", image: lifestyleSports6 },
    ],
  },
  {
    title: "OUTLET Xem thêm ...",
    image: xemthem,
    products: [
      { id: 1, name: "Cloudrunner 2 | Giày Chạy Bộ Nam ON", price: "1,650,000₫", image: xemthem1 },
      { id: 2, name: "KíCloudrunner 2 | Giày Chạy Bộ Nam ONnh bơi chuyên nghiệp", price: "590,000₫", image: xemthem2 },
      { id: 3, name: "ĐÁo Chạy Bộ Nữ ON Running Women'sồng hồ GPS", price: "5,890,000₫", image: xemthem3 },
      { id: 4, name: "GÁo Chạy Bộ Nữ ON Running Women'siày đạp xe", price: "2,450,000₫", image: xemthem4 },
      { id: 5, name: "BÁo Chạy Bộ Nữ ON Running Women'sộ nón bơi", price: "190,000₫", image: xemthem5 },
      { id: 6, name: "TGiày Chạy Bộ Nữ On Running Cloudmonst", price: "420,000₫", image: xemthem6 },
    ],
  },

]
;

const CollectionsPage: React.FC = () => {
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
};

export default CollectionsPage;

// 🧩 Component con tái sử dụng (tương tự Collection.tsx)
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface CollectionProps {
  title: string;
  image: string;
  products: Product[];
}

const CollectionSection: React.FC<CollectionProps> = ({ title, image, products }) => {
  const handleClick = (id: number) => {
    window.location.href = "/"; // Placeholder
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
            <div
              className="product"
              key={p.id}
              onClick={() => handleClick(p.id)}
            >
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">{p.price}</p>
                <p className="add-to-cart">
              Thêm vào giỏ hàng
            </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
