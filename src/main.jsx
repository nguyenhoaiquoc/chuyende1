import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import{createBrowserRouter, RouterProvider} from 'react-router-dom'
import Detail from "./compoments/Detail";

const routers = createBrowserRouter([
  
 {
    path: "/",
    children: [
      {
        index: true,    
        element: <App/>,
      },
        {
        path: "detail",
        element: <Detail />,
      },
     
    ],
  },
  
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
       <RouterProvider router={routers}/>
  </React.StrictMode>
);
