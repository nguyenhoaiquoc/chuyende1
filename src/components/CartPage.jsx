// 📄 /pages/CartPage.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { useCart } from "../contexts/CartContext"; // 🔥 Dùng context thật

// --- Hàm định dạng tiền ---
function formatCurrency(number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(number)
    .replace(/\s/g, "");
}

// ===========================================
//  COMPONENT CON: QuantityInput
// ===========================================
function QuantityInput({ quantity, onDecrease, onIncrease, onChange, onBlur }) {
  return (
    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
      <button
        onClick={onDecrease}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
      >
        <FaMinus className="w-3 h-3" />
      </button>
      <input
        type="number"
        min="1"
        value={quantity}
        onKeyDown={(e) => {
          if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
        }}
        onChange={onChange}
        onBlur={onBlur}
        className="w-12 text-center border-l border-r border-gray-300 py-1 focus:outline-none"
      />
      <button
        onClick={onIncrease}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
      >
        <FaPlus className="w-3 h-3" />
      </button>
    </div>
  );
}

// ===========================================
//  COMPONENT CON: CartItem
// ===========================================
function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const price = item.price;
  const [lineTotal, setLineTotal] = useState(price * quantity);

  useEffect(() => {
    setLineTotal(price * quantity);
  }, [quantity, price]);

  const notifyParentUpdate = (newQty) => {
    if (newQty > 0) {
      setQuantity(newQty);
      onUpdateQuantity(item.id, newQty, item.size);
    }
  };

  const handleDecrease = () => quantity > 1 && notifyParentUpdate(quantity - 1);
  const handleIncrease = () => notifyParentUpdate(quantity + 1);
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === "") setQuantity("");
    else if (/^\d+$/.test(val)) setQuantity(Number(val));
  };
  const handleInputBlur = () => {
    if (quantity === "" || quantity < 1) notifyParentUpdate(1);
    else notifyParentUpdate(quantity);
  };

  return (
    <div className="border-b py-4">
      <div className="flex md:hidden justify-between items-start space-x-4">
        <img
          src={item.imgMain}
          alt={item.name}
          className="w-20 h-20 object-contain border rounded shrink-0"
        />
        <div className="flex-grow">
          <p className="font-semibold text-sm">{item.name}</p>
          {item.size && (
            <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
          )}
          <p className="text-gray-600 mt-1">{formatCurrency(item.price)}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <QuantityInput
            quantity={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <button
            onClick={() => onRemove(item.id, item.size)}
            className="text-gray-500 hover:text-red-600 text-sm"
          >
            Xóa
          </button>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-[100px_3fr_1.5fr_1fr_1.5fr_0.5fr] gap-4 items-center">
        <img
          src={item.imgMain}
          alt={item.name}
          className="w-20 h-20 object-contain border rounded"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          {item.size && (
            <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
          )}
        </div>
        <div className="text-center">{formatCurrency(item.price)}</div>
        <div className="flex justify-center">
          <QuantityInput
            quantity={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>
        <div className="text-center font-semibold">
          {formatCurrency(lineTotal)}
        </div>
        <div className="text-center">
          <button
            onClick={() => onRemove(item.id, item.size)}
            className="text-gray-500 hover:text-red-600"
            title="Xóa"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

// ===========================================
//  COMPONENT CHÍNH: CartPage
// ===========================================
export default function CartPage() {
  const { cartItems, removeFromCart } = useCart(); // 🔥 Lấy từ context
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Tính tổng tiền mỗi khi cart thay đổi
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleUpdateQuantity = (id, newQuantity, size) => {
    // cập nhật trong context
    const item = cartItems.find(
      (p) => p.id === id && p.size === size
    );
    if (item) {
      item.quantity = newQuantity;
      setTotalPrice(
        cartItems.reduce(
          (acc, p) => acc + p.price * p.quantity,
          0
        )
      );
    }
  };

  const handleRemoveItem = (id, size) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      removeFromCart(id, size);
    }
  };

  const handleCheckout = () => {
    console.log("🛒 Dữ liệu đặt hàng:", cartItems);
    alert("Tính năng đặt hàng sẽ được bổ sung sau!");
    // navigate("/checkout"); // có thể thêm sau
  };

  return (
    <div className="container mx-auto md:px-40 px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-black">
          Trang chủ
        </Link>{" "}
        / <span>Giỏ hàng</span>
      </nav>

      <h1 className="hidden md:block text-2xl font-bold mb-4 text-left">
        GIỎ HÀNG
      </h1>
      <div className="md:hidden mb-4">
        <h2 className="text-xl font-bold">GIỎ HÀNG</h2>
        <p className="text-sm text-gray-600">Giỏ hàng của bạn</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl">Giỏ hàng của bạn đang trống.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-[#7a34c2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#63299e]"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div>
          <div className="hidden md:grid md:grid-cols-[100px_3fr_1.5fr_1fr_1.5fr_0.5fr] gap-4 font-semibold text-sm text-gray-700 border-b pb-2 mb-4">
            <div>Hình ảnh</div>
            <div>Tên sản phẩm</div>
            <div className="text-center">Đơn giá</div>
            <div className="text-center">Số lượng</div>
            <div className="text-center">Thành tiền</div>
            <div className="text-center">Xóa</div>
          </div>

          <div>
            {cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}`}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          <div className="mt-8">
            <div className="flex justify-between md:justify-end items-center mb-4">
              <span className="text-lg font-semibold text-black">Tổng tiền:</span>
              <span className="text-xl font-bold text-[#7a34c2] md:text-red-600">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <div className="flex flex-col-reverse md:flex-row md:justify-end gap-4">
              <Link
                to="/"
                className="w-full md:w-auto text-center bg-gray-200 text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-300"
              >
                Tiếp tục mua hàng
              </Link>
              <button
                onClick={handleCheckout}
                className="w-full md:w-auto bg-[#7a34c2] text-white font-semibold py-3 px-10 rounded-lg hover:bg-[#63299e]"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
