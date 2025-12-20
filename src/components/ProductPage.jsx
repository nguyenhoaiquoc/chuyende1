// src/components/ProductPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import NavigationMenu from "./NavigationMenu";
import Grid from "./Gird";
import Footer from "./Footer";
import Panel from "./Panel";
import ScrollTest from "../ScrollTest";
import CategoryDescription from "./CategoryDescription";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import BrandFilter from "./BrandFilter";

/* ================== UTILS ================== */
const norm = (s = "") => s.replace(/\/+$/, "");

/* ================== CATEGORY SIDEBAR ================== */
function CategorySidebar({ categories, onLinkClick }) {
  const location = useLocation();

  return (
    <aside className="w-full text-sm">
      <h3 className="font-bold uppercase text-[18px] mb-2 border-b pb-1">
        Danh mục
      </h3>

      <ul>
        {categories.map((cat) => {
          const isParentActive = norm(location.pathname).startsWith(norm(cat.path));

          return (
            <li key={cat.id} className="mb-2">
              <Link
                to={cat.path}
                onClick={onLinkClick}
                className={`block py-1 ${
                  isParentActive ? "text-purple-600 font-semibold" : "text-gray-700"
                }`}
              >
                {cat.name}
              </Link>

              {isParentActive && cat.subcategories?.length > 0 && (
                <ul className="pl-4 mt-1 border-l">
                  {cat.subcategories.map((sub) => {
                    const isSubActive = norm(location.pathname) === norm(sub.path);

                    return (
                      <li key={sub.id} className="py-1">
                        <Link
                          to={sub.path}
                          onClick={onLinkClick}
                          className={`block ${
                            isSubActive ? "text-purple-600 font-semibold" : "text-gray-600"
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
        })}
      </ul>
    </aside>
  );
}

/* ================== PRODUCT PAGE ================== */
export default function ProductPage() {
  const location = useLocation();

  const [apiCategories, setApiCategories] = useState([]);
  const [apiSubcategories, setApiSubcategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [priceRange, setPriceRange] = useState([null, null]);
  const [sizeCodes, setSizeCodes] = useState(null);
  const [brandFilter, setBrandFilter] = useState(null);

  const API = "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api";

  /* ================== FETCH CATEGORY + SUBCATEGORY ================== */
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, subRes, prodRes] = await Promise.all([
          fetch(`${API}/categories`),
          fetch(`${API}/SubCategories`),
          fetch(`${API}/products`), // lấy tất cả sản phẩm
        ]);

        const cats = await catRes.json();
        const subs = await subRes.json();
        const products = await prodRes.json();

        setApiCategories(cats);
        setApiSubcategories(subs);
        setAllProducts(products);
      } catch (err) {
        console.error("Fetch data error:", err);
      }
    }

    fetchData();
  }, []);

  /* ================== BUILD MENU TREE ================== */
  const categories = useMemo(() => {
    return apiCategories.map((cat) => ({
      id: cat.category_id,
      name: cat.name,
      slug: cat.slug,
      path: `/${cat.slug}`,
      subcategories: apiSubcategories
        .filter((sub) => sub.categoryTypeId === cat.category_id)
        .map((sub) => ({
          id: sub.id,
          name: sub.name,
          slug: sub.slug || sub.path.split("/").pop(),
          path: sub.path,
          description: sub.description,
        })),
    }));
  }, [apiCategories, apiSubcategories]);

  /* ================== CURRENT CATEGORY ================== */
  const currentCategory = useMemo(() => {
    const path = norm(location.pathname);

    // 👉 Nếu đang ở trang /sale thì không cần category/subcategory
    if (path === "/sale") {
      return { type: "sale" };
    }

    for (const cat of categories) {
      if (norm(cat.path) === path) return { type: "category", data: cat };

      const sub = cat.subcategories?.find((s) => norm(s.path) === path);
      if (sub)
        return {
          type: "subcategory",
          data: sub,
          parent: cat,
        };
    }

    return null;
  }, [location.pathname, categories]);

  /* ================== FILTER PRODUCTS BY CATEGORY ================== */
  const productsInCategory = useMemo(() => {
    if (!currentCategory) return [];

    if (currentCategory.type === "sale") {
      // 👉 chỉ lấy sản phẩm có sale > 0
      return allProducts.filter((p) => p.sale > 0 && p.status === "Active");
    }

    if (currentCategory.type === "subcategory") {
      return allProducts.filter(
        (p) => p.subcategoryId === currentCategory.data.id && p.status === "Active"
      );
    }

    return allProducts.filter(
      (p) => p.categoryId === currentCategory.data.id && p.status === "Active"
    );
  }, [currentCategory, allProducts]);

  /* ================== FILTER ================== */
  const filteredProducts = useMemo(() => {
    const [min, max] = priceRange;

    return productsInCategory.filter((p) => {
      if (min != null && p.price < min) return false;
      if (max != null && p.price > max) return false;

      if (sizeCodes?.length) {
        const code = p.code || String(p.product_id || p.id);
        if (!sizeCodes.includes(code)) return false;
      }

      if (brandFilter?.length) {
        if (!brandFilter.includes(p.brand)) return false;
      }

      return true;
    });
  }, [productsInCategory, priceRange, sizeCodes, brandFilter]);

  const pageDescription =
    currentCategory?.type === "sale"
      ? "Danh sách sản phẩm đang giảm giá"
      : currentCategory?.data?.description || null;

  /* ================== RENDER ================== */
  return (
    <>
      <NavigationMenu />

      <div className="container mx-auto px-4 py-6">
        {/* Mobile toggle */}
        <button
          className="md:hidden fixed right-0 top-1/2 z-50 bg-purple-600 text-white p-3 rounded-l"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/40">
            <div
              ref={sidebarRef}
              className="absolute right-0 top-0 h-full w-[300px] bg-white p-4"
            >
              <button
                className="absolute left-[-40px] top-1/2 bg-purple-600 text-white p-2"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <CategorySidebar
                categories={categories}
                onLinkClick={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden md:block w-64">
            <CategorySidebar categories={categories} />
            {currentCategory?.type !== "sale" && (
              <>
                <PriceFilter onSearch={setPriceRange} />
                <SizeFilter
                  products={productsInCategory}
                  onChange={(_, codes) => setSizeCodes(codes?.length ? codes : null)}
                />
                <BrandFilter
                  products={productsInCategory}
                  onChange={(brands) => setBrandFilter(brands.length ? brands : null)}
                />
              </>
            )}
          </div>

          {/* Main */}
          <main className="flex-1">
            <Grid products={filteredProducts} />
            <CategoryDescription description={pageDescription} />
          </main>
        </div>
      </div>

      <Footer />
      <Panel />
      <ScrollTest />
    </>
  );
}
