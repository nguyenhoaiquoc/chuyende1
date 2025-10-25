import React, { useState, useEffect, useRef } from 'react';
import BT from './components/BT.jsx';
import NavigationMenu from './components/NavigationMenu.jsx';
import Banner from './components/Banner.jsx';
import Footer from './components/Footer.jsx';
import ScrollTest from './ScrollTest.jsx';
import Panel from "./components/Panel.jsx";
import User0008 from "./components/User0008.jsx";
import Policies from './components/Policies.jsx';

const menuItems = [
  { id: "intro", label: "Giới Thiệu", link: "#" },
  {
    id: "men",
    label: "Đồ Nam",
    link: "/do-nam",
    submenu: [
      { label: "Áo", link: "/do-nam/ao" },
      { label: "Quần", link: "/do-nam/quan" },
      { label: "Giày chạy bộ", link: "/do-nam/giay-chay-bo" },
      { label: "Giày địa hình", link: "/do-nam/giay-dia-hinh" },
    ],
  },
  {
    id: "women",
    label: "Đồ Nữ",
    link: "/do-nu", // ✅ thêm đường dẫn đúng
    submenu: [
      { label: "Áo", link: "/do-nu/ao" },
      { label: "Quần", link: "/do-nu/quan" },
      { label: "Giày chạy bộ", link: "/do-nu/giay-chay-bo" },
      { label: "Giày địa hình", link: "/do-nu/giay-dia-hinh" },
    ],
  },
  {
    id: "watch-earphone",
    label: "Đồng Hồ",
    link: "/dong-ho",
    submenu: [
      { label: "Suunto", link: "/dong-ho/suunto" },
      { label: "Garmin", link: "/dong-ho/garmin" },
      { label: "Coros", link: "/dong-ho/coros" },
    ],
  },
  { id: "brands", label: "Thương Hiệu", link: "/thuong-hieu" },
  { id: "sale", label: "SALE 10.10", link: "/sale", highlight: true },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setMobileSubmenu(null);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileSubmenu(null);
  };

  const handleSubmenuToggle = (itemId) => {
    setMobileSubmenu(mobileSubmenu === itemId ? null : itemId);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMobileSubmenu(null);
  };

  return (
    <div className="bg-white">
      <header className="bg-white shadow-sm">
        <BT onMenuToggle={handleMobileMenuToggle} />
        <NavigationMenu
          isMobileMenuOpen={isMobileMenuOpen}
          mobileSubmenu={mobileSubmenu}
          menuRef={menuRef}
          menuItems={menuItems}
          handleMobileMenuToggle={handleMobileMenuToggle}
          handleSubmenuToggle={handleSubmenuToggle}
          handleLinkClick={handleLinkClick}
        />
      </header>

      <Banner />
      <User0008 />
      <ScrollTest />
      <Policies />
      <Footer />
      <Panel />
    </div>
  );
}
