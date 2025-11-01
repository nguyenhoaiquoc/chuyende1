import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronUpIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import CategoryDescription from "./components/CategoryDescription";
import Gird from "./components/Gird";
import Footer from "./components/Footer";
import Panel from "./components/Panel";
import ScrollTest from "./ScrollTest";

const categories = [
  {
    name: "Đồ Nam",
    path: "/do-nam",
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
      { name: "Áo", path: "/do-nam/ao" },
      { name: "Quần", path: "/do-nam/quan" },
      { name: "Giày Chạy Bộ Nam", path: "/do-nam/giay-chay-bo" },
      { name: "Giày Địa Hình Nam", path: "/do-nam/giay-dia-hinh" },
    ],
  },
  {
    name: "Đồ Nữ",
    path: "/do-nu",
    subcategories: [
      { name: "Áo", path: "/do-nu/ao" },
      { name: "Quần", path: "/do-nu/quan" },
      { name: "Giày Chạy Bộ Nữ", path: "/do-nu/giay-chay-bo" },
      { name: "Giày Địa Hình Nữ", path: "/do-nu/giay-dia-hinh" },
    ],
  },
  { name: "Running Gears", path: "/running-gears" },
  { name: "Triathlon", path: "/triathlon" },
  { name: "Đồng Hồ", path: "/dong-ho" },
];

// --- COMPONENT BREADCRUMB ---
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .slice(1)
    .split("/")
    .filter((x) => x);
  if (pathnames.length === 0) return null;
  const findPathData = (pathSegment, index) => {
    const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;
    for (const cat of categories) {
      if (cat.path === fullPath) return { name: cat.name, path: cat.path };
      if (cat.subcategories) {
        const sub = cat.subcategories.find((s) => s.path === fullPath);
        if (sub) return { name: sub.name, path: sub.path };
      }
    }
    return { name: pathSegment.replace(/-/g, " "), path: fullPath };
  };
  // return (
  // <nav className="text-sm text-gray-500 capitalize">
  //   <Link to="/" className="hover:text-purple-500 transition-colors">Trang chủ</Link>
  //   {pathnames.map((value, index) => {
  //     const pathData = findPathData(value, index);
  //      const isValidLink = categories.some(cat => cat.path === pathData.path || cat.subcategories?.some(sub => sub.path === pathData.path));
  //      if (!isValidLink) return null;
  //     return (
  //       <span key={pathData.path}>
  //         <span className="mx-2 text-gray-400">/</span>
  //         <Link to={pathData.path} className="hover:text-purple-500 transition-colors">{pathData.name}</Link>
  //       </span>
  //     );
  //   })}
  // </nav>
  // );
};

// --- COMPONENT SIDEBAR ---
const CategorySidebar = ({ onLinkClick }) => {
  const MenuItem = ({ item }) => {
    const location = useLocation();
    const isParentActive = location.pathname.startsWith(item.path);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
      const shouldOpen =
        isParentActive &&
        item.subcategories?.some((sub) => location.pathname === sub.path);
      setIsOpen(shouldOpen);
    }, [isParentActive, item.subcategories, location.pathname]);
    return (
      <li className="mb-1 text-[14px]">
        <div className="flex justify-between items-center group py-1">
          <Link
            to={item.path}
            onClick={onLinkClick}
            className={`flex-grow pr-2 group-hover:text-purple-600 transition-colors duration-150 ${
              isParentActive ? "font-semibold text-purple-600" : "text-gray-700"
            }`}
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
              <ChevronUpIcon
                className={`w-3 h-3 transition-transform duration-200 ${
                  isOpen ? "" : "rotate-180"
                }`}
              />
            </button>
          )}
        </div>
        {isOpen && item.subcategories && (
          <ul className="pl-4 mt-1 border-l ml-[5px] border-gray-200 animate-fade-in">
            {item.subcategories.map((sub) => {
              const isSubActive = location.pathname === sub.path;
              return (
                <li
                  key={sub.path}
                  className="py-1 pl-3 group relative before:content-[''] before:absolute before:left-[-1px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[1px] before:bg-gray-300"
                >
                  <Link
                    to={sub.path}
                    onClick={onLinkClick}
                    className={`block group-hover:text-purple-600 transition-colors duration-150 ${
                      isSubActive
                        ? "text-purple-600 font-semibold"
                        : "text-gray-600"
                    }`}
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
        <h3 className="font-bold uppercase text-[18px] mb-2 text-gray-800 border-b pb-1">
          Danh mục
        </h3>
        <ul>
          {categories.map((item) => (
            <MenuItem key={item.path} item={item} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

// --- COMPONENT PAGE CHÍNH ---
export default function ProductPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);

  // Đóng sidebar khi click ra ngoài (giữ nguyên)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const toggleButton = document.querySelector(
          'button[aria-label="Mở bộ lọc"]'
        );
        if (toggleButton && toggleButton.contains(event.target)) {
          return;
        }
        setSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const getPageTitle = (pathname) => {
    for (const cat of categories) {
      if (cat.path === pathname) return cat.name;
      if (cat.subcategories) {
        const sub = cat.subcategories.find((s) => s.path === pathname);
        if (sub) return sub.name;
      }
    }
    return "Sản phẩm";
  };

  const getCurrentCategoryData = (pathname) => {
    if (pathname === "/") return { name: "Trang Chủ", description: null };
    for (const cat of categories) {
      if (cat.path === pathname)
        return { name: cat.name, description: cat.description || null };
      if (cat.subcategories) {
        const sub = cat.subcategories.find((s) => s.path === pathname);
        // Ưu tiên sub description, fallback về cat description
        if (sub)
          return {
            name: sub.name,
            description: sub.description || cat.description || null,
          };
      }
    }
    // Trả về mặc định nếu không tìm thấy (App.jsx sẽ xử lý 404 dựa vào getPageTitle)
    return { name: getPageTitle(pathname), description: null };
  };

  const currentCategory = getCurrentCategoryData(location.pathname);
  const pageTitle = getPageTitle(location.pathname);
  const pageDescription = currentCategory.description;
  // Render giao diện trang danh mục sản phẩm
  return (
    <div className="">
      <div className="container mx-auto px-4 py-6 md:py-6">
        {/* --- Mobile Sidebar Logic --- */}
        {!isSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-1/2 right-0 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-l-lg shadow-lg transform -translate-y-1/2 transition-all duration-300 md:hidden"
            aria-label="Mở bộ lọc"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        )}

        <div
          className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden={!isSidebarOpen}
        />

        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
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
          </div>
        </div>

        {/* --- End Mobile Sidebar --- */}

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="hidden md:block w-60 lg:w-64 flex-shrink-0">
            <CategorySidebar />
          </div>
          <main className="flex-1">
            {/* Khu vực hiển thị sản phẩm (hiện tại để trống theo yêu cầu) */}
            <div className=" min-h-[60vh] rounded-md flex items-center justify-center">
              <Gird />
            </div>
            {/* Nếu muốn hiển thị placeholder sản phẩm, thêm lại grid ở đây */}
            <CategoryDescription
              key={location.pathname}
              description={pageDescription}
            />
          </main>
        </div>
      </div>
      <ScrollTest />
      <Footer />
      <Panel />
    </div>
  );
}
