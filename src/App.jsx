import NavigationMenu from './components/NavigationMenu.jsx';
import Banner from './components/Banner.jsx';
import Footer from './components/Footer.jsx';
import ScrollTest from './ScrollTest.jsx';
import Panel from "./components/Panel.jsx";
import User0008 from "./components/User0008.jsx";
import Policies from './components/Policies.jsx';
import ProductPage from './ProductPage.jsx';
import { Routes, Route, Outlet } from 'react-router-dom';
import BT from './components/BT.jsx';
import Collection from './collection.jsx';
import { CartProvider } from "./components/CartContext.jsx";
// Layout cho các trang sản phẩm
const ProductLayout = () => (
  <div className="bg-white flex flex-col min-h-screen">
    <BT />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Layout cho trang chủ
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
    <NavigationMenu />
    <Banner />
    <User0008 />
    <Collection />
    <ScrollTest />
    <Policies />
    <Footer />
    <Panel />
  </>
);

function App() {
  return (
    // ✅ Bọc toàn bộ app trong CartProvider
    <CartProvider>
      <Routes>
        {/* Trang chủ */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePageContent />} />
        </Route>

        {/* Các trang sản phẩm */}
        <Route element={<ProductLayout />}>
          <Route path="/*" element={<ProductPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
