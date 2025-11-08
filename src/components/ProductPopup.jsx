import React, { useState } from "react";
import "../css/ProductPopup.css";
import { Link } from "react-router-dom";

const ProductPopup = ({ product, onClose }) => {
  if (!product) return null;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    // Chỉ cho phép số nguyên dương
    if (/^\d+$/.test(value)) {
      setQuantity(Number(value));
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const sizes = product?.sizes || ["S", "M", "L"];
  const image = product?.imgMain || "https://via.placeholder.com/300x400.png?text=Áo+Khoác";
  const name = product?.name || "Tên sản phẩm";
  const price = product?.price || "0";

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-[7px] right-[13px] w-[30px] h-[30px] text-[20px] bg-[#673ab7] cursor-pointer rounded-full font-bold text-white flex items-center justify-center"
        >
          &times;
        </button>



        <div className="popup-content">
          <div className="popup-image">
            <img src={image} alt={name} />
          </div>

          <div className="popup-info">
            <Link to="/Detail">
              <h3 className="product-name">{name}</h3>
            </Link>

            <div className="qv-header-info">
              <span><b>Mã SP:</b> 39113978</span>
              <span className="line">|</span>
              <span><b>Thương hiệu:</b> Zoot</span>
            </div>

            <div className="product-price">{price}</div>
            <hr className="divider" />
            <div className="sizes">
              <div className="size-list">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`size-box ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div className="quantity-add">
              <label className="label">Số lượng:</label>
              <div className="quantity-row">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button
                  className="h-[45px] bg-[#673ab7] text-white px-5 border border-transparent rounded-full cursor-pointer hover:bg-[#6f4fb9] hover:border-[#333]"
                >
                  THÊM VÀO GIỎ HÀNG
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductPopup;
