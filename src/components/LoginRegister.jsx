import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
        </h2>

        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            {isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
          </button>

          <div className="mt-4 text-center text-gray-600">
            {isLogin ? (
              <>
                Bạn chưa có tài khoản?{' '}
                <Link to="/register">
                <button
                  type="button"
                  className="text-blue-600"
                  onClick={() => setIsLogin(false)}
                >
                  Đăng ký
                </button>
                </Link>
                
              </>
            ) : (
              <>
                Đã có tài khoản?{' '}
                <Link to ="/">
                   <button
                  type="button"
                  className="text-blue-600"
                  onClick={() => setIsLogin(true)}
                >
                  Đăng nhập
                </button>
                </Link>
             
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
