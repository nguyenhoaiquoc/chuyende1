import React, { useState } from 'react';
import NavigationMenu from "./NavigationMenu";
import Breadcrumb from './Breadcrumb';

const CartItem = ({ item, onQuantityChange, onRemove, formatCurrency }) => {
  // Hàm xử lý tăng/giảm
  const increment = () => onQuantityChange(item.id, item.quantity + 1);
  const decrement = () => onQuantityChange(item.id, item.quantity > 1 ? item.quantity - 1 : 1);

  // Hàm xử lý khi nhập số lượng trực tiếp
  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    onQuantityChange(item.id, newQuantity > 0 ? newQuantity : 1);
  };
  return (
    <div className="border-b py-6">
      {/* === Bố cục Mobile === */}
      <div className="md:hidden grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-4">
        {/* Hàng 1: Ảnh (chiếm 2 hàng), Tên, Nút số lượng */}
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-20 h-auto row-span-2 self-start" // image lề top left
        />
        <p className="font-semibold col-start-2 row-start-1 self-start">
          {item.name}
        </p>
        <div className="flex items-center col-start-3 row-start-1 self-start"> {/* nút tăng lề top right */}
          <button onClick={decrement} className="px-2 py-1 border bg-gray-100 rounded-l">-</button>
          <input
            type="number"
            value={item.quantity}
            onChange={handleInputChange}
            className="w-10 text-center border-t border-b focus:outline-none"
          />
          <button onClick={increment} className="px-2 py-1 border bg-gray-100 rounded-r">+</button>
        </div>

        {/* Hàng 2: (Trống), Giá, Nút Xóa */}
        <p className="text-gray-700 col-start-2 row-start-2 self-start">
          {formatCurrency(item.price)}
        </p>
        <div className="col-start-3 row-start-2 flex justify-end items-start pt-1">
          <button onClick={() => onRemove(item.id)} className="text-gray-500 hover:text-red-600 text-sm">
            Xóa
          </button>
        </div>
      </div>

      {/* === Bố cục Desktop === */}
      <div className="hidden md:grid md:grid-cols-[100px_3fr_1.5fr_1fr_1.5fr_100px] gap-4 items-center">
        {/* Ảnh */}
        <img src={item.image} alt={item.name} className="w-20 h-auto" />
        
        {/* Tên sản phẩm */}
        <div className="text-left">
          <p className="font-semibold">{item.name}</p>
        </div>
        
        {/* Đơn giá */}
        <p className="text-center">{formatCurrency(item.price)}</p>
        
        {/* Số lượng */}
        <div className="flex justify-center items-center">
          <input
            type="number"
            value={item.quantity}
            onChange={handleInputChange}
  className="h-[36px] w-[100px] rounded-[18px] px-[10px] py-[4px] border border-[#ccc] bg-white text-center text-[14px] text-[#898989] outline-none transition-colors duration-200 ease-in"          />
        </div>
        
        {/* Thành tiền */}
        <p className="text-center font-bold">
          {formatCurrency(item.price * item.quantity)}
        </p>
        
        {/* Xóa */}
        <div className="text-center">
          <button onClick={() => onRemove(item.id)} className="text-gray-500 hover:text-red-600">
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CartPage() {
  // Dữ liệu giỏ hàng (giả lập)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "BỘ QUẦN ÁO BA MÔN NỮ ZOOT WOMEN'S LTD TRI AERO FZ RACESUIT - BELLA - S",
      price: 6990000,
      quantity: 1,
      image: 'https://i.imgur.com/gKWrT1T.png', // Placeholder image URL
    },
  ]);

  // Hàm helper để format tiền tệ
  const formatCurrency = (amount) => {
    return `${new Intl.NumberFormat('vi-VN').format(amount)} VNĐ`;
  };

  // Hàm cập nhật số lượng
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Hàm xóa sản phẩm
const handleRemoveItem = (id) => {
  const updatedCart = cartItems.filter(item => item.id !== id);
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // ✅ Cập nhật badge khi xóa
  localStorage.setItem("cartCount", updatedCart.length);
  window.dispatchEvent(new Event("storage"));
};

  // Tính tổng tiền
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="">
      <Breadcrumb/>
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 shadow-sm">
        {/* === TITLE === */}
        <h1 className="text-3xl font-bold mb-2 text-left">GIỎ HÀNG</h1>
        <p className="md:hidden mb-6 text-gray-600">giỏ hàng của bạn</p>

        {/* === HEADER CỦA BẢNG (DESKTOP) === */}
        <div className="hidden md:grid md:grid-cols-[100px_3fr_1.5fr_1fr_1.5fr_100px] gap-4 items-center font-bold text-gray-500 uppercase text-sm mb-4 border-b pb-4">
          <span className="text-center">Hình ảnh</span>
          <span className="text-left">Tên sản phẩm</span>
          <span className="text-center">Đơn giá</span>
          <span className="text-center">Số lượng</span>
          <span className="text-center">Thành tiền</span>
          <span className="text-center">Xóa</span>
        </div>

        {/* === DANH SÁCH SẢN PHẨM === */}
        <div className="space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                formatCurrency={formatCurrency}
              />
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">Giỏ hàng của bạn đang trống.</p>
          )}
        </div>

        {/* === TỔNG TIỀN & NÚT HÀNH ĐỘNG === */}
        <div className="mt-8">
          
          {/* --- Bố cục Desktop --- */}
          <div className="hidden md:block">
            <div className="flex justify-end items-center mb-4">
              <span className="text-xl font-bold">Tổng tiền:</span>
              <span className="text-xl font-bold text-red-600 ml-4">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="flex justify-end items-center space-x-4">
              <a 
                href="/" // Link về trang chủ
                title="Tiếp tục mua hàng" // Tooltip
                className="px-6 py-3 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Tiếp tục mua hàng
              </a>
              <button 
                title="Tiến hành đặt hàng" // Tooltip
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition cursor-pointer"
              >
                Đặt hàng
              </button>
            </div>
          </div>
          
          {/* --- Bố cục Mobile --- */}
          <div className="md:hidden space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold text-black">Tổng tiền</span>
              <span className="font-bold text-purple-600">
                {formatCurrency(total)}
              </span>
            </div>
            <button className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
              Tiến hành thanh toán
            </button>
            <a 
              href="/" // Link về trang chủ
              className="w-full block text-center px-6 py-3 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              Tiếp tục mua hàng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}