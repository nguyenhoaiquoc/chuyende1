import React, { useState, useEffect } from "react";
import logo from "../assets/logoImSport.png";
import { useNavigate } from "react-router-dom";

// ĐIỀN LINK API GATEWAY CỦA BẠN VÀO ĐÂY
const API_URL = "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api/cart"; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State để hiển thị loading khi đang gọi API

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 0;
  const total = subTotal + shippingFee;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN").format(amount) + " ₫";

  const [paymentMethod, setPaymentMethod] = useState("banking");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [errors, setErrors] = useState({});

  // --- API LOCATION (Giữ nguyên) ---
  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => response.json())
      .then((data) => {
        if (data.error === 0) setProvinces(data.data);
      })
      .catch((error) => console.error("Lỗi lấy tỉnh thành:", error));
  }, []);

  useEffect(() => {
    if (formData.province) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${formData.province}.htm`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error === 0) {
            setDistricts(data.data);
            setWards([]);
          }
        })
        .catch((error) => console.error("Lỗi lấy quận huyện:", error));
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [formData.province]);

  useEffect(() => {
    if (formData.district) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${formData.district}.htm`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error === 0) setWards(data.data);
        })
        .catch((error) => console.error("Lỗi lấy phường xã:", error));
    } else {
      setWards([]);
    }
  }, [formData.district]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "province") {
      setFormData({ ...formData, [name]: value, district: "", ward: "" });
    } else if (name === "district") {
      setFormData({ ...formData, [name]: value, ward: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên.";
      isValid = false;
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Tên không hợp lệ.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
      isValid = false;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "SĐT phải có 10 số và bắt đầu bằng 0.";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ.";
      isValid = false;
    }
    if (!formData.province) {
      newErrors.province = "Chưa chọn Tỉnh/Thành.";
      isValid = false;
    }
    if (!formData.district) {
      newErrors.district = "Chưa chọn Quận/Huyện.";
      isValid = false;
    }
    if (!formData.ward) {
      newErrors.ward = "Chưa chọn Phường/Xã.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // --- HÀM GỬI DỮ LIỆU LÊN AWS ---
  const handleSubmit = async () => {
    // 1. Validate Form
    if (!validateForm()) return;

    // 2. Check giỏ hàng
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (currentCart.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }

    // 3. Xử lý tên địa chỉ
    const selectedProvince = provinces.find((p) => p.id === formData.province);
    const selectedDistrict = districts.find((d) => d.id === formData.district);
    const selectedWard = wards.find((w) => w.id === formData.ward);

    const provinceName = selectedProvince ? selectedProvince.full_name : "";
    const districtName = selectedDistrict ? selectedDistrict.full_name : "";
    const wardName = selectedWard ? selectedWard.full_name : "";

    // Gom địa chỉ thành 1 chuỗi để gửi lên backend
    const fullAddress = `${formData.address}, ${wardName}, ${districtName}, ${provinceName}`;

    // 4. Chuẩn bị dữ liệu gửi lên AWS Lambda
    const orderData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: fullAddress,
      note: formData.note,
      paymentMethod: paymentMethod,
      products: currentCart.map((item) => ({
        id: item.id, // ID sản phẩm
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      })),
    };

    // 5. Gọi API
    setIsLoading(true); // Bật trạng thái loading
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        // --- THÀNH CÔNG ---
        alert("🎉 Đặt hàng thành công!");

        // Xóa giỏ hàng
        localStorage.removeItem("cart");
        localStorage.removeItem("cartCount");
        window.dispatchEvent(new Event("storage"));

        // Chuyển trang
        navigate("/");
      } else {
        // --- LỖI TỪ BACKEND ---
        alert(`Lỗi đặt hàng: ${result.message || "Có lỗi xảy ra"}`);
      }
    } catch (error) {
      // --- LỖI MẠNG ---
      console.error("Error submitting order:", error);
      alert("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false); // Tắt loading dù thành công hay thất bại
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pb-10">
      {/* ... (Phần Header và Form giữ nguyên như cũ) ... */}
      
      {/* HEADER LOGO */}
      <div className="flex flex-col items-center justify-center py-6">
        <div className="mb-2">
          <a href="/">
            <img className="w-full h-[26px] sm:w-[180px] sm:h-[34px] object-contain" src={logo} alt="Logo" />
          </a>
        </div>
        <h2 className="text-2xl font-medium mt-2">THANH TOÁN</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CỘT 1: THÔNG TIN HÓA ĐƠN (Giữ nguyên code form inputs...) */}
          <div className="lg:col-span-4">
             {/* ... Copy lại phần render Form inputs của bạn vào đây ... */}
             <div className="flex items-center gap-2 mb-4">
              <span className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">1</span>
              <h3 className="text-lg font-bold">Thông tin hóa đơn</h3>
            </div>
            
            <div className="space-y-3">
                {/* FullName */}
                <div>
                   <label className="block text-sm font-medium mb-1">Họ và tên<span className="text-red-500">*</span></label>
                   <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`w-full border px-3 py-2 rounded-sm focus:outline-none focus:border-blue-500 ${errors.fullName ? "border-red-500" : "border-gray-300"}`} placeholder="Nguyễn Văn A" />
                   {errors.fullName && <p className="text-red-500 text-xs mt-1 italic">{errors.fullName}</p>}
                </div>
                
                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email<span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full border px-3 py-2 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`} placeholder="abc@gmail.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1 italic">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Điện thoại<span className="text-red-500">*</span></label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="0912345678" maxLength={10} className={`w-full border px-3 py-2 rounded-sm focus:outline-none focus:border-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 italic">{errors.phone}</p>}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-1">Địa chỉ<span className="text-red-500">*</span></label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={`w-full border px-3 py-2 rounded-sm focus:outline-none focus:border-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`} placeholder="Số nhà, tên đường" />
                    {errors.address && <p className="text-red-500 text-xs mt-1 italic">{errors.address}</p>}
                </div>

                {/* Province & District */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tỉnh/ Thành phố<span className="text-red-500">*</span></label>
                        <select name="province" value={formData.province} onChange={handleInputChange} className={`w-full border px-3 py-2 rounded-sm focus:outline-none focus:border-blue-500 bg-white ${errors.province ? "border-red-500" : "border-gray-300"}`}>
                            <option value="">Chọn Tỉnh/Thành</option>
                            {provinces.map((prov) => (<option key={prov.id} value={prov.id}>{prov.full_name}</option>))}
                        </select>
                        {errors.province && <p className="text-red-500 text-xs mt-1 italic">{errors.province}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Quận/ Huyện<span className="text-red-500">*</span></label>
                        <select name="district" value={formData.district} onChange={handleInputChange} disabled={!formData.province} className={`w-full border px-3 py-2 rounded-sm focus:outline-none focus:border-blue-500 bg-white ${errors.district ? "border-red-500" : "border-gray-300"}`}>
                            <option value="">Chọn Quận/Huyện</option>
                            {districts.map((dist) => (<option key={dist.id} value={dist.id}>{dist.full_name}</option>))}
                        </select>
                        {errors.district && <p className="text-red-500 text-xs mt-1 italic">{errors.district}</p>}
                    </div>
                </div>

                {/* Ward */}
                <div>
                    <label className="block text-sm font-medium mb-1">Phường/ Xã<span className="text-red-500">*</span></label>
                    <select name="ward" value={formData.ward} onChange={handleInputChange} disabled={!formData.district} className={`w-full border px-3 py-2 rounded-sm focus:outline-none focus:border-blue-500 bg-white ${errors.ward ? "border-red-500" : "border-gray-300"}`}>
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((w) => (<option key={w.id} value={w.id}>{w.full_name}</option>))}
                    </select>
                    {errors.ward && <p className="text-red-500 text-xs mt-1 italic">{errors.ward}</p>}
                </div>

                {/* Note */}
                <div>
                    <textarea name="note" rows="3" value={formData.note} onChange={handleInputChange} placeholder="Ghi chú đơn hàng" className="w-full border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:border-blue-500 resize-y"></textarea>
                </div>
            </div>
          </div>

          {/* CỘT 2: PHƯƠNG THỨC THANH TOÁN (Giữ nguyên) */}
          <div className="lg:col-span-4">
             {/* ... Copy lại phần Phương thức thanh toán ... */}
             <div className="flex items-center gap-2 mb-4">
              <span className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">2</span>
              <h3 className="text-lg font-bold">Phương thức thanh toán</h3>
            </div>
            <div className="space-y-4">
                <label className="flex items-start cursor-pointer">
                    <input type="radio" name="payment" className="mt-1 mr-2" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                    <span className="text-sm">Thanh toán tiền mặt khi nhận hàng (COD)</span>
                </label>
                <div>
                    <label className="flex items-start cursor-pointer">
                        <input type="radio" name="payment" className="mt-1 mr-2 text-blue-600 focus:ring-blue-500" checked={paymentMethod === "banking"} onChange={() => setPaymentMethod("banking")} />
                        <span className="text-sm">Chuyển khoản qua ngân hàng</span>
                    </label>
                    <div className="ml-6 mt-2 text-sm text-gray-800 space-y-1">
                        <p>Công Ty TNHH Thể Thao Thung Lũng Mặt Trời</p>
                        <p>Tài khoản số: 123456789</p>
                        <p>Ngân hàng TMCP Công Thương Việt Nam (Vietinbank)</p>
                        <p>Nội dung thanh toán: Số Điện Thoại + Sản Phẩm Mua</p>
                    </div>
                </div>
            </div>
          </div>

          {/* CỘT 3: THÔNG TIN GIỎ HÀNG */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">3</span>
              <h3 className="text-lg font-bold">Thông tin giỏ hàng</h3>
            </div>

            {/* List sản phẩm */}
            <div className="flex justify-between border-b border-gray-300 pb-2 mb-4 text-sm font-bold">
              <span className="flex-1">Tên sản phẩm</span>
              <span className="w-16 text-center">Size</span>
              <span className="w-16 text-center">SL</span>
              <span className="w-24 text-right">Giá</span>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-500">Giỏ hàng trống</p>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-start border-b border-gray-300 pb-4 mb-4 text-sm">
                  <div className="flex-1 pr-2 text-gray-600">{item.name}</div>
                  <div className="w-16 text-center">{item.size}</div>
                  <div className="w-16 text-center">{item.quantity}</div>
                  <div className="w-24 text-right font-medium">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))
            )}

            <div className="space-y-3 text-sm border-b border-gray-300 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="font-medium">Tạm tính</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phí vận chuyển</span>
                <span>{formatCurrency(shippingFee)}</span>
              </div>
            </div>

            <div className="flex justify-between text-base font-bold mb-6">
              <span>Tổng cộng</span>
              <span>{formatCurrency(total)}</span>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => navigate("/")}
                className="bg-black text-white text-sm font-medium py-3 hover:bg-gray-800 transition duration-200"
              >
                Tiếp tục mua hàng
              </button>
              
              {/* NÚT THANH TOÁN CÓ LOADING */}
              <button
                onClick={handleSubmit}
                disabled={isLoading} // Disable khi đang gửi
                className={`text-white text-sm font-medium py-3 transition duration-200 ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                }`}
              >
                {isLoading ? "Đang xử lý..." : "Tiến hành thanh toán"}
              </button>
            </div>

            <p className="text-xs text-gray-600 italic">
              Tôi đồng ý với <a href="#" className="underline">điều kiện và chính sách giao hàng</a> của website
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;