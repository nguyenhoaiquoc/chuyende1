import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detail from "./components/Detail";
import CartPage from "./components/CartPage";
import ProductPage from "./components/ProductPage";
import AdminPage from "./admin/AdminPage";

const routers = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <App /> }, // Trang chủ
      { path: "product/:productId", element: <Detail /> },
      
      { path: "cart", element: <CartPage /> },
      
      { path: ":category", element: <ProductPage /> }, 
      { path: ":category/:subCategory", element: <ProductPage /> },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
);