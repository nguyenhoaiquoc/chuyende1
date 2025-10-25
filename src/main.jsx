import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Gird from "./components/Product";
import Detail from "./components/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // Trang chủ
  },
  {
    path: "/gird",
    element: <Gird />,  // Trang Gird
  },
  {
    path: "/detail",
    element: <Detail />, // Trang chi tiết (nếu có)
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
