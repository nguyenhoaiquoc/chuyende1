import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronUpIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

import CategoryDescription from './components/CategoryDescription';
import Gird from './components/Gird';
import Footer from './components/Footer';
import Panel from './components/Panel';
import ScrollTest from './ScrollTest';
import PriceFilter from './components/PriceFilter';
import SizeFilter from './components/SizeFilter';
import BrandFilter from './components/BrandFilter';

/* ================== MOCK DATA & CATEGORIES ================== */

const categories = [
  {
    name: 'Đồ Nam',
    path: '/do-nam',
    description: `
      <p>Đồ Chạy Bộ Nam – Sự Lựa Chọn Của Những Runner Đẳng Cấp
Bạn đang tìm kiếm trang phục và giày chạy bộ cao cấp, đáp ứng được cả yếu tố hiệu suất, sự bền bỉ và tính thời trang? Bộ sưu tập đồ chạy bộ nam tại [Tên Website] mang đến những sản phẩm tốt nhất thế giới, giúp bạn tối ưu trải nghiệm chạy và chinh phục mọi cung đường.
</p><br>
<p> 
  1. Vì sao runner cần đầu tư vào đồ chạy bộ chuyên dụng?
  ✔ Công nghệ vải tiên tiến: Thoáng khí, hút ẩm nhanh giúp cơ thể luôn khô ráo và thoải mái.
  ✔ Thiết kế tối ưu hiệu suất: Co giãn linh hoạt, ôm vừa vặn nhưng không bó chặt, hỗ trợ chuyển động tối đa.
  ✔ Trọng lượng siêu nhẹ: Giảm thiểu lực cản, giúp runner cảm thấy tự do, linh hoạt hơn trong từng bước chạy.
  ✔ Thương hiệu chạy bộ đỉnh cao: Chúng tôi chỉ mang đến các thương hiệu cao cấp đã được các vận động viên chuyên nghiệp tin dùng.
  </p><br>
  <p>
2. Bộ sưu tập đồ chạy bộ nam tại IMSPORTS 
🏃‍♂ Áo chạy bộ nam: Áo tank top, áo thun, áo dài tay thoáng khí, co giãn tốt.
🏃‍♂ Quần chạy bộ nam: Quần short siêu nhẹ, quần 2 lớp hỗ trợ tối đa, quần dài chống nắng.
🏃‍♂ Áo khoác chạy bộ nam: Giữ ấm, chống gió mà vẫn đảm bảo sự thông thoáng khi chạy.
🏃‍♂ Giày chạy bộ nam: Đệm êm, hỗ trợ tốt cho chạy đường nhựa, đường dài và thi đấu.
🏃‍♂ Giày chạy địa hình nam (trail running shoes):
    🔹 HOKA – Thương hiệu giày trail "quốc dân" với độ êm ái vượt trội, phù hợp với đa số runner Việt Nam.
    🔹 NNormal & Norda – Hai thương hiệu giày trail top 1 thế giới dành cho những người yêu thích sự bền bỉ, hiệu suất cao và độ bám vượt trội.
🏃‍♂ Dép chạy bộ nam (recovery sandals): Phục hồi chân nhanh chóng sau những buổi tập luyện cường độ cao.
🏃‍♂ Phụ kiện chạy bộ nam: Tất nén, mũ chạy bộ, găng tay giúp nâng cao trải nghiệm chạy.
</p> <br>
<p>
3. Những thương hiệu chạy bộ cao cấp tại IMSPORTS 
🔥 Giày chạy bộ nam: HOKA, NNormal, Norda, ON Running, Saucony, Xeroshoes, Salomon – những thương hiệu được các VĐV hàng đầu lựa chọn.
🔥 Trang phục chạy bộ nam: ON Running, Soar Running, 2XU, Compressport, Raidlight, T8, Runderwear – dòng sản phẩm hiệu suất cao, đảm bảo tối ưu cho từng cử động.</p>
  </p>
  <p>4. Cách chọn đồ chạy bộ nam phù hợp theo nhu cầu
✔ Chạy bộ trong thời tiết nóng ☀ → Áo thoáng khí, quần short nhẹ, giày có độ thông thoáng cao.
✔ Chạy đường dài / marathon 🏃‍♂ → Quần short có túi đựng gel, áo chống nắng, giày có độ đệm êm.
✔ Chạy địa hình (trail running) 🏔 → Giày HOKA (phù hợp cho đa số runner) hoặc NNormal/Norda (hiệu suất cao, bám địa hình cực tốt), áo khoác chống gió, quần có túi tiện lợi.
✔ Tập luyện hàng ngày & chạy cự ly ngắn 💪 → Áo thun thể thao, quần short linh hoạt, dép recovery để phục hồi.</p>    `,
    subcategories: [
      { name: 'Áo', path: '/do-nam/ao' },
      { name: 'Quần', path: '/do-nam/quan' },
      { name: 'Giày Chạy Bộ Nam', path: '/do-nam/giay-chay-bo' },
      { name: 'Giày Địa Hình Nam', path: '/do-nam/giay-dia-hinh' },
    ],
  },
  {
    name: 'Đồ Nữ',
    path: '/do-nu',
    subcategories: [
      { name: 'Áo', path: '/do-nu/ao' },
      { name: 'Quần', path: '/do-nu/quan' },
      { name: 'Giày Chạy Bộ Nữ', path: '/do-nu/giay-chay-bo' },
      { name: 'Giày Địa Hình Nữ', path: '/do-nu/giay-dia-hinh' },
    ],
  },
  { name: 'Running Gears', path: '/running-gears' },
  { name: 'Triathlon', path: '/triathlon' },
  { name: 'Đồng Hồ', path: '/dong-ho' },
];

const ALL_PRODUCTS = [
  // === GIÀY NAM ===
  { id: 1, code: "SV-001", name: "Giày A", price: 1200000, sizes: ["38","39 1/3","40"], brand: "HOKA",        categoryPath: "/do-nam/giay-chay-bo" },
  { id: 2, code: "SV-002", name: "Giày B", price: 2500000, sizes: ["38 2/3","40.5"],    brand: "On Running",  categoryPath: "/do-nam/giay-chay-bo" },
  { id: 3, code: "SV-003", name: "Giày C", price:  600000, sizes: ["38","40 2/3"],      brand: "Salomon",     categoryPath: "/do-nam/giay-chay-bo" },
  { id: 4, code: "SV-004", name: "Giày D", price:18000000, sizes: ["8","8.5"],          brand: "NNormal",     categoryPath: "/do-nam/giay-dia-hinh" },

  // === ÁO NAM (đã bơm nhiều brand để chắc chắn có scrollbar) ===
  { id: 101, code: "TS-NA-001", name: "Áo thun AeroDry",       price: 450000,  sizes: ["S","M","L","XL"],      brand: "2XU",            categoryPath: "/do-nam/ao" },
  { id: 102, code: "JK-NA-002", name: "Áo khoác WindLite",     price: 1290000, sizes: ["S","M","L","XL"],      brand: "Raidlight",      categoryPath: "/do-nam/ao" },
  { id: 103, code: "LS-NA-003", name: "Áo dài tay CoolTouch",  price: 690000,  sizes: ["S","M","L","XL","XXL"],brand: "Compressport",   categoryPath: "/do-nam/ao" },
  { id: 120, code: "TS-NA-007", name: "Áo Aero Mesh",          price: 520000,  sizes: ["S","M","L","XL"],      brand: "Saucony",        categoryPath: "/do-nam/ao" },
  { id: 121, code: "TS-NA-008", name: "Áo Dry Lite",           price: 490000,  sizes: ["S","M","L","XL"],      brand: "Xeroshoes",      categoryPath: "/do-nam/ao" },
  { id: 122, code: "TS-NA-009", name: "Áo UltraVent",          price: 610000,  sizes: ["S","M","L","XL"],      brand: "Altra",          categoryPath: "/do-nam/ao" },
  { id: 123, code: "TS-NA-010", name: "Áo Run Fast",           price: 570000,  sizes: ["S","M","L","XL"],      brand: "Brooks",         categoryPath: "/do-nam/ao" },
  { id: 124, code: "TS-NA-011", name: "Áo Coolmax Pro",        price: 630000,  sizes: ["S","M","L","XL"],      brand: "ASICS",          categoryPath: "/do-nam/ao" },
  { id: 125, code: "TS-NA-012", name: "Áo Breeze Tee",         price: 540000,  sizes: ["S","M","L","XL"],      brand: "New Balance",    categoryPath: "/do-nam/ao" },
  { id: 126, code: "TS-NA-013", name: "Áo Trail Grid",         price: 650000,  sizes: ["S","M","L","XL"],      brand: "Inov-8",         categoryPath: "/do-nam/ao" },
  { id: 127, code: "TS-NA-014", name: "Áo Mountain Air",       price: 690000,  sizes: ["S","M","L","XL"],      brand: "La Sportiva",    categoryPath: "/do-nam/ao" },
  { id: 128, code: "TS-NA-015", name: "Áo CloudFeel",          price: 590000,  sizes: ["S","M","L","XL"],      brand: "Patagonia",      categoryPath: "/do-nam/ao" },
  { id: 129, code: "TS-NA-016", name: "Áo Buff Dry",           price: 450000,  sizes: ["S","M","L","XL"],      brand: "Buff",           categoryPath: "/do-nam/ao" },
  { id: 130, code: "TS-NA-017", name: "Áo Craft Core",         price: 560000,  sizes: ["S","M","L","XL"],      brand: "Craft",          categoryPath: "/do-nam/ao" },
  { id: 131, code: "TS-NA-018", name: "Áo Move Light",         price: 520000,  sizes: ["S","M","L","XL"],      brand: "Mizuno",         categoryPath: "/do-nam/ao" },
  { id: 132, code: "TS-NA-019", name: "Áo UA Run",             price: 520000,  sizes: ["S","M","L","XL"],      brand: "Under Armour",   categoryPath: "/do-nam/ao" },
  { id: 133, code: "TS-NA-020", name: "Áo Nike Dri-FIT",       price: 690000,  sizes: ["S","M","L","XL"],      brand: "Nike Running",   categoryPath: "/do-nam/ao" },
  { id: 134, code: "TS-NA-021", name: "Áo adidas AEROREADY",   price: 650000,  sizes: ["S","M","L","XL"],      brand: "Adidas Running", categoryPath: "/do-nam/ao" },
  { id: 135, code: "TS-NA-022", name: "Áo Alpine Light",       price: 720000,  sizes: ["S","M","L","XL"],      brand: "Salewa",         categoryPath: "/do-nam/ao" },
  { id: 136, code: "TS-NA-023", name: "Áo Montane Dry",        price: 610000,  sizes: ["S","M","L","XL"],      brand: "Montane",        categoryPath: "/do-nam/ao" },
  { id: 137, code: "TS-NA-024", name: "Áo Dynafit Air",        price: 740000,  sizes: ["S","M","L","XL"],      brand: "Dynafit",        categoryPath: "/do-nam/ao" },

  // === QUẦN NAM ===
  { id: 111, code: "SH-NA-004", name: "Quần short Sprint",     price: 590000,  sizes: ["S","M","L","XL"],      brand: "On Running",     categoryPath: "/do-nam/quan" },
  { id: 112, code: "TI-NA-005", name: "Quần dài Thermal",      price: 990000,  sizes: ["S","M","L","XL"],      brand: "2XU",            categoryPath: "/do-nam/quan" },
  { id: 113, code: "TS-NA-006", name: "Quần short Pace",       price: 740000,  sizes: ["S","M","L","XL"],      brand: "T8",             categoryPath: "/do-nam/quan" },

  // === ÁO NỮ ===
  { id: 201, code: "TS-NU-001", name: "Áo thun Nữ AeroDry",    price: 420000,  sizes: ["XS","S","M","L"],      brand: "2XU",            categoryPath: "/do-nu/ao" },
  { id: 202, code: "JK-NU-002", name: "Áo khoác Nữ WindLite",  price: 1190000, sizes: ["XS","S","M","L"],      brand: "Raidlight",      categoryPath: "/do-nu/ao" },
  { id: 203, code: "BR-NU-003", name: "Áo bra Support+",       price: 650000,  sizes: ["XS","S","M","L"],      brand: "Runderwear",     categoryPath: "/do-nu/ao" },

  // === QUẦN NỮ ===
  { id: 211, code: "SH-NU-004", name: "Quần short Sprint",     price: 560000,  sizes: ["XS","S","M","L"],      brand: "On Running",     categoryPath: "/do-nu/quan" },
  { id: 212, code: "LG-NU-005", name: "Quần legging Flex",     price: 890000,  sizes: ["XS","S","M","L"],      brand: "2XU",            categoryPath: "/do-nu/quan" },
  { id: 213, code: "TI-NU-006", name: "Quần dài Thermal",      price: 940000,  sizes: ["XS","S","M","L"],      brand: "Compressport",   categoryPath: "/do-nu/quan" },
];


/* ================== UTILS ================== */

// Chuẩn hoá path: bỏ dấu "/" ở cuối để so sánh ổn định
const norm = (s = '') => s.replace(/\/+$/, '');

/* ================== BREADCRUMB (nếu cần bật lại) ================== */

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.slice(1).split('/').filter(Boolean);
  if (pathnames.length === 0) return null;

  const findPathData = (pathSegment, index) => {
    const fullPath = `/${pathnames.slice(0, index + 1).join('/')}`;
    for (const cat of categories) {
      if (cat.path === fullPath) return { name: cat.name, path: cat.path };
      if (cat.subcategories) {
        const sub = cat.subcategories.find(s => s.path === fullPath);
        if (sub) return { name: sub.name, path: sub.path };
      }
    }
    return { name: pathSegment.replace(/-/g, ' '), path: fullPath };
  };

  // Nếu muốn hiển thị, bỏ comment block dưới
  // return (
  //   <nav className="text-sm text-gray-500 capitalize">
  //     <Link to="/" className="hover:text-purple-500 transition-colors">Trang chủ</Link>
  //     {pathnames.map((value, index) => {
  //       const pathData = findPathData(value, index);
  //       const isValidLink = categories.some(cat => cat.path === pathData.path || cat.subcategories?.some(sub => sub.path === pathData.path));
  //       if (!isValidLink) return null;
  //       return (
  //         <span key={pathData.path}>
  //           <span className="mx-2 text-gray-400">/</span>
  //           <Link to={pathData.path} className="hover:text-purple-500 transition-colors">{pathData.name}</Link>
  //         </span>
  //       );
  //     })}
  //   </nav>
  // );
  return null;
};

/* ================== SIDEBAR ================== */

const CategorySidebar = ({ onLinkClick }) => {
  const MenuItem = ({ item }) => {
    const location = useLocation();
    const isParentActive = norm(location.pathname).startsWith(norm(item.path));
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const shouldOpen = isParentActive && item.subcategories?.some(sub => norm(location.pathname) === norm(sub.path));
      setIsOpen(shouldOpen);
    }, [isParentActive, item.subcategories, location.pathname]);

    return (
      <li className="mb-1 text-[14px]">
        <div className="flex justify-between items-center group py-1">
          <Link
            to={item.path}
            onClick={onLinkClick}
            className={`flex-grow pr-2 group-hover:text-purple-600 transition-colors duration-150 ${isParentActive ? 'font-semibold text-purple-600' : 'text-gray-700'}`}
          >
            {item.name}
          </Link>
          {item.subcategories && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
              aria-expanded={isOpen}
              aria-label={`Mở rộng ${item.name}`}
            >
              <ChevronUpIcon className={`w-3 h-3 transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`} />
            </button>
          )}
        </div>

        {isOpen && item.subcategories && (
          <ul className="pl-4 mt-1 border-l ml-[5px] border-gray-200 animate-fade-in">
            {item.subcategories.map(sub => {
              const isSubActive = norm(location.pathname) === norm(sub.path);
              return (
                <li
                  key={sub.path}
                  className="py-1 pl-3 group relative before:content-[''] before:absolute before:left-[-1px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[1px] before:bg-gray-300"
                >
                  <Link
                    to={sub.path}
                    onClick={onLinkClick}
                    className={`block group-hover:text-purple-600 transition-colors duration-150 ${isSubActive ? 'text-purple-600 font-semibold' : 'text-gray-600'}`}
                  >
                    {sub.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="w-full text-sm space-y-6">
      <div>
        <h3 className="font-bold uppercase text-[18px] mb-2 text-gray-800 border-b pb-1">Danh mục</h3>
        <ul>{categories.map(item => <MenuItem key={item.path} item={item} />)}</ul>
      </div>
    </aside>
  );
};

/* ================== PAGE CHÍNH ================== */

export default function ProductPage() {
  const location = useLocation();
  const [products] = useState(ALL_PRODUCTS);

  // Xác định các path đang active: nếu đang ở cha (có sub) -> gom cả sub; ngược lại -> chỉ đúng path hiện tại
  const activePaths = useMemo(() => {
    const curr = norm(location.pathname);
    const cat = categories.find(c => norm(c.path) === curr);
    if (cat?.subcategories?.length) {
      return [curr, ...cat.subcategories.map(s => norm(s.path))];
    }
    return [curr];
  }, [location.pathname]);

  // Lọc sản phẩm thuộc danh mục hiện tại (chuẩn hoá để so sánh bền)
  const productsInCategory = useMemo(() => {
    // Nếu đứng ở cha: lấy tất cả sản phẩm có path bắt đầu bằng `curr + /`
    const curr = norm(location.pathname);
    const isParent = categories.some(c => norm(c.path) === curr && c.subcategories?.length);
    if (isParent) {
      return products.filter(p => norm(p.categoryPath).startsWith(curr + '/'));
    }
    // Còn lại: exact match
    return products.filter(p => norm(p.categoryPath) === curr);
  }, [products, location.pathname]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Đóng sidebar khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const toggleButton = document.querySelector('button[aria-label="Mở bộ lọc"]');
        if (toggleButton && toggleButton.contains(event.target)) return;
        setSidebarOpen(false);
      }
    };
    if (isSidebarOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const getPageTitle = (pathname) => {
    for (const cat of categories) {
      if (cat.path === pathname) return cat.name;
      if (cat.subcategories) {
        const sub = cat.subcategories.find(s => s.path === pathname);
        if (sub) return sub.name;
      }
    }
    return 'Sản phẩm';
  };

  const getCurrentCategoryData = (pathname) => {
    if (pathname === '/') return { name: 'Trang Chủ', description: null };
    for (const cat of categories) {
      if (cat.path === pathname) return { name: cat.name, description: cat.description || null };
      if (cat.subcategories) {
        const sub = cat.subcategories.find(s => s.path === pathname);
        if (sub) return { name: sub.name, description: sub.description || cat.description || null };
      }
    }
    return { name: getPageTitle(pathname), description: null };
  };

  const currentCategory = getCurrentCategoryData(location.pathname);
  const pageDescription = currentCategory.description;

  return (
    <div className="">
      <div className="container mx-auto px-4 py-6 md:py-6">
        {/* Mobile Sidebar Toggle */}
        {!isSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-1/2 right-0 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-l-lg shadow-lg transform -translate-y-1/2 transition-all duration-300 md:hidden"
            aria-label="Mở bộ lọc"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        )}

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden={!isSidebarOpen}
        />

        {/* Sidebar Mobile */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-heading-mobile"
        >
          {isSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-1/2 -left-10 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-r-lg shadow-md transform -translate-y-1/2 transition-all duration-300"
              aria-label="Đóng bộ lọc"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}

          <div className="p-4 overflow-y-auto h-full">
            <CategorySidebar onLinkClick={() => setSidebarOpen(false)} />
            <div className="mt-6">
              <PriceFilter />
            </div>
            <div className="mt-6">
              <SizeFilter products={productsInCategory} />
            </div>
             <div className="mt-6">
            <BrandFilter products={productsInCategory} />
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="hidden md:block w-60 lg:w-64 flex-shrink-0">
            <CategorySidebar />
            <div className="mt-6">
              <PriceFilter />
            </div>
            <div className="mt-6">
              {/* TRỌNG TÂM: truyền sản phẩm theo danh mục hiện tại */}
              <SizeFilter products={productsInCategory} />
            </div>
             <div className="mt-6">
              {/* TRỌNG TÂM: truyền sản phẩm theo danh mục hiện tại */}
              <BrandFilter products={productsInCategory} />
            </div>
          </div>

          <main className="flex-1">
            {/* Bạn có thể truyền filtered products vào Gird nếu Gird hỗ trợ props */}
            <div className="min-h-[60vh] rounded-md flex items-center justify-center">
              <Gird />
            </div>

            <CategoryDescription description={pageDescription} />
          </main>
        </div>
      </div>

      <Footer />
      <Panel />
      <ScrollTest />
    </div>
  );
}
