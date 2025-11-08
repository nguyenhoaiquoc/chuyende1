import React, { useState, useEffect, useRef } from 'react';
import BT from './components/BT.jsx';
import NavigationMenu from './components/NavigationMenu.jsx';
import Banner from './components/Banner.jsx';
import Footer from './components/Footer.jsx';
import ScrollTest from './ScrollTest.jsx';
import Panel from "./components/Panel.jsx";
import User0008 from "./components/User0008.jsx";
import Policies from './components/Policies.jsx';
import ProductPage from './ProductPage.jsx';
import { Routes, Route, Outlet } from 'react-router-dom';
import Detail from "./components/Detail.jsx";
import ProductPopup from './components/ProductPopup.jsx';
import Collection from './collection.jsx';
const ProductLayout = () => (

  <div className="bg-white flex flex-col min-h-screen">

    <BT />

    <main className="flex-grow">

      <Outlet />

    </main>

    <Footer />

  </div>

);



// Layout cho Home Page

const HomeLayout = () => (

  <div className="bg-white flex flex-col min-h-screen">

    <main className="flex-grow">

      <Outlet />

    </main>

    <Panel />

  </div>

);



// Nội dung trang chủ

const HomePageContent = () => (

  <>

     <NavigationMenu/>

    <Banner />

    <User0008 />

    <Collection/>

    <ScrollTest />

    <Policies />

    <Footer/>

    <Panel/>

  </>

);



function App() {

  return (

    <Routes>

      {/* Trang chủ dùng HomeLayout */}

      <Route element={<HomeLayout />}>

        <Route path="/" element={<HomePageContent />} />

      </Route>



      {/* Các trang sản phẩm dùng ProductLayout */}

      <Route element={<ProductLayout />}>
       <Route path="/product/:id" element={<Detail />} />
        <Route path="/*" element={<ProductPage />} />

      </Route>

    </Routes>

  );

}
export default App;
