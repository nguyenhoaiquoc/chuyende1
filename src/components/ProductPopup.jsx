import React, { useState } from "react";
import "../css/ProductPopup.css";
import { Link, useNavigate } from "react-router-dom";

const ProductPopup = ({ product, onClose }) => {
  if (!product) return null;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  const image = product?.imgMain || "https://via.placeholder.com/300x400.png";
  const name = product?.name || "Tên sản phẩm";
  const price = Number(product?.price ?? 0);
  const sale = Number(product?.sale ?? 0);

  // Tính giá cuối cùng (để hiển thị hoặc lưu nếu muốn)
  const finalPrice = sale > 0 ? Math.round(price * (1 - sale / 100)) : price;

  const brand = product?.brand || "Đang cập nhật";
  const sizes = product?.sizes || [];
  const stockQuantity = Number(product?.quantity ?? 0);

  const hasSizes = sizes.length > 0;

  const handleQuantityChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value) || value <= 0) value = 1;
    if (value > stockQuantity) value = stockQuantity;
    setQuantity(value);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // ✅ SỬA HÀM NÀY: Xử lý thêm vào giỏ hàng theo User
  const handleAddToCart = () => {
    // 1. Validate
    if ((hasSizes && !selectedSize) || quantity <= 0) {
      if (hasSizes && !selectedSize) {
        alert("Vui lòng chọn size.");
      }
      return;
    }

    // 🔥 2. Xác định KEY giỏ hàng (Quan trọng)
    const user = JSON.parse(localStorage.getItem("user"));
    const cartKey = user && user.id ? `cart_${user.id}` : "cart";

    // 🔥 3. Lấy giỏ hàng hiện tại dựa trên KEY đó
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // 4. Quyết định size
    const sizeToSave = hasSizes ? selectedSize : null;

    // 5. Kiểm tra sản phẩm đã tồn tại chưa
    const existingItemIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === sizeToSave
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name,
        // Lưu ý: Bạn đang lưu giá gốc 'price'. 
        // Nếu muốn lưu giá đã giảm, hãy đổi thành 'finalPrice'
        price: price, 
        size: sizeToSave,
        quantity,
        image,
      });
    }

    // 🔥 6. Lưu lại vào đúng KEY
    localStorage.setItem(cartKey, JSON.stringify(cart));
    
    // Cập nhật số lượng item để hiển thị badge trên Header (nếu có dùng)
    localStorage.setItem("cartCount", cart.length);
    
    // Bắn sự kiện để các component khác (như CartPage, Header) tự cập nhật
    window.dispatchEvent(new Event("storage"));

    navigate("/cart");
    window.scrollTo(0, 0);
  };

  const isAddDisabled = (hasSizes && !selectedSize) || quantity <= 0;

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
            <h3 className="product-name">
              <Link to={`/product/${product.id}`} onClick={onClose}>
                {name}
              </Link>
            </h3>

            <div className="qv-header-info">
              <span><b>Mã SP:</b> {product.id}</span>
              <span className="line">|</span>
              <span><b>Thương hiệu:</b> {brand}</span>
            </div>

            <div className="product-price">
              {sale > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through text-sm">
                    {price.toLocaleString("vi-VN")} VNĐ
                  </span>
                  <span className=" font-bold text-lg">
                    {finalPrice.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              ) : (
                <span className="font-semibold">
                  {price.toLocaleString("vi-VN")} VNĐ
                </span>
              )}
            </div>

            <hr className="divider" />

            {/* === Size chọn === */}
            {hasSizes && (
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
            )}

            {/* === Số lượng + nút thêm === */}
            <div className="quantity-add">
              <label className="label">Số lượng:</label>
              <div className="quantity-row">
                <input
                  type="number"
                  min="1"
                  max={stockQuantity > 0 ? stockQuantity : undefined}
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