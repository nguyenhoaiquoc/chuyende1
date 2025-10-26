import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { ChevronDown, X, ChevronRight } from 'lucide-react';
import BT from './BT.jsx'; 

const menuItems = [
 { id: 'home', label: 'Trang Chủ', link: '/' },
  {
    id: 'men', label: 'Đồ Nam', 
    link: '/do-nam', 
    submenu: [ 
        { label: 'Áo', link: '/do-nam/ao' }, 
        { label: 'Quần', link: '/do-nam/quan' }, 
        { label: 'Giày chạy bộ', link: '/do-nam/giay-chay-bo' },
        { label: 'Giày địa hình', link: '/do-nam/giay-dia-hinh' }
    ]
  },
  {
    id: 'women', label: 'Đồ Nữ', 
    link: '/do-nu', 
    submenu: [ 
        { label: 'Áo', link: '/do-nu/ao' }, 
        { label: 'Quần', link: '/do-nu/quan' }, 
        { label: 'Giày chạy bộ', link: '/do-nu/giay-chay-bo' },
        { label: 'Giày địa hình', link: '/do-nu/giay-dia-hinh' }
    ]
  },
  {
    id: 'watch-earphone', label: 'Đồng Hồ', link: '/dongho',
    submenu: [ 
        { label: 'Suunto', link: '/dongho/suunto' }, 
        { label: 'Garmin', link: '/dongho/garmin' }, 
        { label: 'Coros', link: '/dongho/coros' } 
    ]
  },
  { id: 'sale', label: 'SALE', link: '/sale', highlight: true }
];

export default function NavigationMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
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
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const renderMenuItem = (item) => (
    <div
      key={item.id}
      className="relative"
      onMouseEnter={() => item.submenu && setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <Link to={item.link} className="flex items-center gap-1 text-base font-medium transition-colors cursor-pointer py-2 pr-2.5">
        <span>{item.label}</span>
        {item.submenu && <ChevronDown className="w-4 h-4" />}
      </Link>
      {item.submenu && hoveredItem === item.id && (
        <div className="absolute left-0 top-full pt-2 z-20">
          <div className="bg-white shadow-lg rounded-md py-2 min-w-[200px]">
            {item.submenu.map((subitem, index) => (
              <Link key={index} to={subitem.link} className="block px-4 py-2 text-sm font-bold text-gray-700 hover:whitespace-nowrap">
                {subitem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-sm">
      <BT onMenuToggle={handleMobileMenuToggle} />

      <div className="max-w-7xl mx-auto px-4 lg:pb-3 pl-7 pr-8">
        <nav className="hidden lg:flex items-center justify-start flex-wrap gap-x-8 gap-y-2 py-2 border-gray-200">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={handleMobileMenuToggle} />
      
      {/* Mobile Menu Panel */}
      <div ref={menuRef} className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden overflow-y-auto`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-bold">MENU</span>
          <button onClick={handleMobileMenuToggle} className="p-2"><X className="w-6 h-6" /></button>
        </div>
        <div className="relative overflow-hidden">
          <div className={`transform transition-transform duration-300 ease-in-out ${mobileSubmenu ? '-translate-x-full' : 'translate-x-0'}`}>
            {menuItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100">
                <div className="flex items-stretch justify-between">
                  <Link to={item.link} onClick={handleLinkClick} className={`flex-1 px-5 py-3.5 font-medium ${item.highlight ? 'text-red-500' : 'text-gray-800'}`}>
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <button onClick={() => handleSubmenuToggle(item.id)} className="px-5 py-3.5 text-gray-500 border-l border-gray-100">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={`absolute top-0 left-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out ${mobileSubmenu ? 'translate-x-0' : 'translate-x-full'}`}>
            {mobileSubmenu && (
              <>
                <button onClick={() => handleSubmenuToggle(null)} className="flex items-center gap-3 px-5 py-4 w-full border-b font-medium">
                  <ChevronRight className="w-5 h-5 transform rotate-180" />
                  <span>{menuItems.find((i) => i.id === mobileSubmenu)?.label}</span>
                </button>
                {menuItems.find((i) => i.id === mobileSubmenu)?.submenu?.map((subitem, index) => (
                  <Link key={index} to={subitem.link} onClick={handleLinkClick} className="block px-5 py-3.5 text-gray-700 border-b border-gray-100">
                    {subitem.label}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};