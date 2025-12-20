import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";

export default function Breadcrumb() {
  const { category, subCategory } = useParams();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetch("https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    fetch("https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api/SubCategories")
      .then((res) => res.json())
      .then(setSubcategories)
      .catch(console.error);
  }, []);

  /* ================= CATEGORY LABEL ================= */
  const categoryTree = useMemo(() => {
  return categories.map(cat => ({
    id: cat.category_id,
    name: cat.name,
    slug: cat.slug,
    subcategories: subcategories.filter(
      sub => sub.categoryTypeId === cat.category_id
    )
  }));
}, [categories, subcategories]);


 const categoryLabel = useMemo(() => {
  if (!category) return null;
  const found = categories.find(c => c.slug === category);
  return found?.name || null;
}, [category, categories]);

  /* ================= SUBCATEGORY LABEL ================= */

const subCategoryLabel = useMemo(() => {
  if (!category || !subCategory) return null;

  const parent = categoryTree.find(c => c.slug === category);
  if (!parent) return null;

  const sub = parent.subcategories.find(s => s.slug === subCategory);
  return sub?.name || null;
}, [category, subCategory, categoryTree]);


  if (!categoryLabel) return null;

  return (
    <>
      <NavigationMenu />

      <header className="bg-gray-100 px-4 py-10">
        <nav className="max-w-7xl mx-auto flex items-center text-lg text-gray-700 select-none">
          {/* Trang chủ */}
          <Link to="/" className="hover:text-purple-600">
            Trang chủ
          </Link>

          {/* Category */}
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/${category}`} className="hover:text-purple-600">
            {categoryLabel}
          </Link>

          {/* SubCategory */}
          {subCategoryLabel && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium">
                {subCategoryLabel}
              </span>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
