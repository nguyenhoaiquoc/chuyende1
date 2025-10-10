import React, { useState, useEffect, useRef } from 'react';
import BT from './compoments/BT.jsx';
import NavigationMenu from './compoments/NavigationMenu.jsx';
import Banner from './compoments/Banner.jsx';
import Footer from './compoments/Footer.jsx';
import ScrollTest from './ScrollTest.jsx';
import Panel from "./compoments/Panel.jsx";
import User0008 from "./compoments/User0008.jsx";


const menuItems = [
  { id: 'intro', label: 'Giới Thiệu', link: '#' },
  {
    id: 'men', label: 'Đồ Nam', link: '#',
    submenu: [ { label: 'Áo', link: '#' }, { label: 'Quần', link: '#' }, { label: 'Giày chạy bộ', link: '#' }, { label: 'Giày địa hình', link: '#' } ]
  },
  {
    id: 'women', label: 'Đồ Nữ', link: '#',
    submenu: [ { label: 'Áo', link: '#' }, { label: 'Quần', link: '#' }, { label: 'Giày chạy bộ', link: '#' }, { label: 'Giày địa hình', link: '#' } ]
  },
  {
    id: 'watch-earphone', label: 'Đồng Hồ', link: '#',
    submenu: [ { label: 'Suunto', link: '#' }, { label: 'Garmin', link: '#' }, { label: 'Coros', link: '#' } ]
  },
  { id: 'brands', label: 'Thương Hiệu', link: '#' },
  { id: 'sale', label: 'SALE 10.10', link: '#sale', highlight: true }
];

function App() {
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
      <header className=" bg-white shadow-sm ">
        <div className="">
            <BT onMenuToggle={handleMobileMenuToggle} />
        </div>
        <div className="pl-7 pr-8 ">
          <NavigationMenu 
            isMobileMenuOpen={isMobileMenuOpen}
            mobileSubmenu={mobileSubmenu}
            menuRef={menuRef}
            menuItems={menuItems}
            handleMobileMenuToggle={handleMobileMenuToggle}
            handleSubmenuToggle={handleSubmenuToggle}
            handleLinkClick={handleLinkClick}
          />
        </div>
      </header>
      
      {/* Banner */}
      <Banner /> 

      <User0008/>
      <ScrollTest />

      <Footer />

      {/* Panel cố định dưới cùng */}
      <Panel />
    </div>
  );
}

export default App;