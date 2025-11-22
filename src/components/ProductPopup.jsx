import React, { useState } from "react";
import "../css/ProductPopup.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const ProductPopup = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  // Kiểm tra điều kiện đủ
  const canAdd = selectedSize && quantity > 0;

  const handleAddToCart = () => {
    if (canAdd) {
      addToCart({ ...product, selectedSize }, quantity);
      navigate("/cart"); // Điều hướng chuẩn React Router
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) setQuantity(Number(value));
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const sizes = product?.sizes || ["S", "M", "L"];
  const image =
    product?.imgMain ||
    "https://via.placeholder.com/300x400.png?text=Áo+Khoác";
  const name = product?.name || "Tên sản phẩm";
  const price = product?.price || "0";

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-[7px] right-[13px] w-[30px] h-[30px] text-[20px] bg-[#673ab7] cursor-pointer rounded-full font-bold text-white flex items-center justify-center"
        >
          &times;
        </button>

        <div className="popup-content">
          {/* Ảnh */}
          <div className="popup-image">
            <img src={image} alt={name} />
          </div>

          {/* Thông tin */}
          <div className="popup-info">
            <Link to="/Detail">
              <h3 className="product-name">{name}</h3>
            </Link>

            <div className="qv-header-info">
              <span>
                <b>Mã SP:</b> {product.id || "39113978"}
              </span>
              <span className="line">|</span>
              <span>
                <b>Thương hiệu:</b> {product.brand || "Zoot"}
              </span>
            </div>

            <div className="product-price">{price}</div>

            <hr className="divider" />

            {/* Size */}
            <div className="sizes">
              <div className="size-list">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`size-box ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Số lượng + nút thêm */}
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
                  className={`rounded-full text-white py-2.5 px-12 ${
                    canAdd
                      ? "bg-[#673AB7] hover:bg-[#5e35b1]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!canAdd}
                  onClick={handleAddToCart}
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
