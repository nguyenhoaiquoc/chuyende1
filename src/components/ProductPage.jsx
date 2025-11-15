import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronUpIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import CategoryDescription from "./CategoryDescription";
import Gird from "./Gird";
import Footer from "./Footer";
import Panel from "./Panel";
import ScrollTest from "../ScrollTest";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import BrandFilter from "./BrandFilter";

import { categoriesType } from "../data/categoriesType";
import { subcategories } from "../data/subcategories";
import { products } from "../data/products.mock";

import NavigationMenu from "./NavigationMenu";

/* ================== CATEGORIES (THEO PATH) ================== */

const categories = categoriesType.map((cat) => ({
  ...cat,
  subcategories: subcategories.filter((s) => s.categoryTypeId === cat.id)
}));


/* ================== UTILS ================== */

// Chuẩn hoá path: bỏ dấu "/" ở cuối để so sánh ổn định
const norm = (s = "") => s.replace(/\/+$/, "");

/* ================== BREADCRUMB (nếu cần bật lại) ================== */

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.slice(1).split("/").filter(Boolean);
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

  // đang tắt breadcrumb
  return null;
};

/* ================== SIDEBAR ================== */

const CategorySidebar = ({ onLinkClick }) => {
  const MenuItem = ({ item }) => {
    const location = useLocation();
    const isParentActive = norm(location.pathname).startsWith(norm(item.path));
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const shouldOpen =
        isParentActive &&
        item.subcategories?.some(
          (sub) => norm(location.pathname) === norm(sub.path)
        );
      setIsOpen(shouldOpen);
    }, [isParentActive, item.subcategories, location.pathname]);

    return (
      <li className="mb-1 text-[14px]">
        <div className="flex justify-between items-center group py-1">
          <Link
            to={item.path}
            onClick={onLinkClick}
            className={`flex-grow pr-2 group-hover:text-purple-600 transition-colors duration-150 ${
              isParentActive
                ? "font-semibold text-purple-600"
                : "text-gray-700"
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
              const isSubActive = norm(location.pathname) === norm(sub.path);
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
        <ul>{categories.map((item) => <MenuItem key={item.path} item={item} />)}</ul>
      </div>
    </aside>
  );
};

/* ================== PAGE CHÍNH ================== */

export default function ProductPage() {
  const location = useLocation();

  // Xác định các path đang active: nếu đang ở cha (có sub) -> gom cả sub; ngược lại -> chỉ đúng path hiện tại
  const activePaths = useMemo(() => {
    const curr = norm(location.pathname);
    const cat = categories.find((c) => norm(c.path) === curr);
    if (cat?.subcategories?.length) {
      return [curr, ...cat.subcategories.map((s) => norm(s.path))];
    }
    return [curr];
  }, [location.pathname]);

  // Lọc sản phẩm thuộc danh mục hiện tại
const productsInCategory = useMemo(() => {
  const curr = norm(location.pathname);
  const isParent = categories.some(
    (c) => norm(c.path) === curr && c.subcategories?.length
  );

  if (isParent) {
    return products.filter((p) => {
      const pPath = norm(p.categoryPath);
      return pPath === curr || pPath.startsWith(curr + "/");
    });
  }

  return products.filter((p) => norm(p.categoryPath) === curr);
}, [products, location.pathname]);
;


  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Đóng sidebar khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const toggleButton = document.querySelector(
          'button[aria-label="Mở bộ lọc"]'
        );
        if (toggleButton && toggleButton.contains(event.target)) return;
        setSidebarOpen(false);
      }
    };
    if (isSidebarOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        if (sub)
          return {
            name: sub.name,
            description: sub.description || cat.description || null,
          };
      }
    }
    return { name: getPageTitle(pathname), description: null };
  };

  const currentCategory = getCurrentCategoryData(location.pathname);
  const pageDescription = currentCategory.description;

  return (
    <div className="">
      <NavigationMenu/>
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
          className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden={!isSidebarOpen}
        />

        {/* Sidebar Mobile */}
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
              <SizeFilter products={productsInCategory} />
            </div>
            <div className="mt-6">
              <BrandFilter products={productsInCategory} />
            </div>
          </div>

          <main className="flex-1">
            {/* TODO: nếu Gird nhận props, truyền productsInCategory vào */}
            <div className="min-h-[60vh] rounded-md flex items-center justify-center">
              <Gird products={productsInCategory} />
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