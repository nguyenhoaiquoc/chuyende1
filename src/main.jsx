import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import "./index.css"
import Detail from "./components/Detail";
import Breadcrumb from "./components/Breadcrumb";
import Gird from "./components/Gird";
const routers = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <App /> },
      { path: ":category", element: <Breadcrumb /> }, 
      { path: ":category/:subCategory", element: <Breadcrumb /> },
      {
    path: "/gird",
    element: <Gird />, 
  },
      { path: "detail", element: <Detail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
);
