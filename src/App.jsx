import NavigationMenu from './compoments/NavigationMenu.jsx';
import Banner from './compoments/Banner.jsx';
import Footer from './compoments/Footer.jsx';
import ScrollTest from './ScrollTest.jsx';
import Panel from "./compoments/Panel.jsx";
import User0008 from "./compoments/User0008.jsx";
import Policies from './compoments/Policies.jsx';
import ProductPage from './ProductPage.jsx';
import { Routes, Route, Outlet } from 'react-router-dom';
import BT from './compoments/BT.jsx';

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
    <ScrollTest />
    <Policies />
    <Footer/>
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
        <Route path="/*" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export default App;
