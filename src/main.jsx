import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detail from "./components/Detail";
import Breadcrumb from "./components/Breadcrumb";

<<<<<<< HEAD
import App from "./App";
import Gird from "./components/Product";
import Detail from "./components/Detail";

const router = createBrowserRouter([
=======
const routers = createBrowserRouter([
>>>>>>> origin
  {
    path: "/",
    children: [
      { index: true, element: <App /> }, // Trang chủ

      { path: "product/:productId", element: <Detail /> },
      { path: ":category", element: <Breadcrumb /> }, 
      { path: ":category/:subCategory", element: <Breadcrumb /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
);