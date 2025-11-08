import React, { useState } from "react";
import "../css/ProductPopup.css";
import { useNavigate } from "react-router-dom";

const ProductPopup = ({ product, onClose }) => {
  if (!product) return null;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate(); // ✅ để chuyển trang cùng tab

  const sizes = product?.sizes || ["S", "M", "L"];
  const image = product?.imgMain || "https://via.placeholder.com/300x400.png?text=Áo+Khoác";
  const name = product?.name || "Tên sản phẩm";
  const price = product?.price || "0";

  // ✅ Xử lý thay đổi số lượng
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value) && Number(value) > 0) {
      setQuantity(Number(value));
    } else {
      setQuantity(1);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // ✅ Xử lý khi nhấn "Thêm vào giỏ hàng"
const handleAddToCart = () => {
  if (!selectedSize || quantity <= 0) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === selectedSize
  );

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name,
      price,
      size: selectedSize,
      quantity,
      image,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // ✅ Cập nhật badge theo số dòng sản phẩm
  localStorage.setItem("cartCount", cart.length);
  window.dispatchEvent(new Event("storage"));

  navigate("/cart");
};


  const isAddDisabled = !selectedSize || quantity <= 0;

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
            <h3 className="product-name">{name}</h3>

            <div className="qv-header-info">
              <span><b>Mã SP:</b> {product.id || "39113978"}</span>
              <span className="line">|</span>
              <span><b>Thương hiệu:</b> Zoot</span>
            </div>

            <div className="product-price">{price}₫</div>
            <hr className="divider" />

            {/* === Size chọn === */}
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

            {/* === Số lượng + nút thêm === */}
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
                  disabled={isAddDisabled}
                  onClick={handleAddToCart}
                  className={`h-[45px] px-5 border rounded-full cursor-pointer inline-flex items-center justify-center ${
                    isAddDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#673ab7] text-white hover:bg-[#6f4fb9] hover:border-[#333]"
                  }`}
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
