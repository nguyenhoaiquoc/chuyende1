import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          ĐĂNG KÝ TÀI KHOẢN
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600" htmlFor="fullName">
              Họ và tên
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600" htmlFor="phone">
              Điện thoại
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="090xxxxxxx"
            />
          </div>
            <Link to="/login">
             <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
          >
            ĐĂNG KÝ
          </button>
            </Link>
            
         
        </form>
      </div>
    </div>
  );
};

export default Register;
