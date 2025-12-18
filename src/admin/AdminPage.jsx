import React, { useEffect, useMemo, useState } from "react";

/**
 * AdminPage.jsx
 * - Modern admin dashboard (Products / Categories / Subcategories / Size Types / Sizes)
 * - Works with mock data now; later replace loaders with API calls
 *
 * Notes:
 * - This file doesn't assume your exact schema. It renders "safe" columns and shows JSON details on demand.
 * - You can map fields (name/price/categoryId/subcategoryId/brand/sizes/images) once you lock schema.
 */

// ====== MOCK IMPORT (bạn đổi sang API sau) ======
// Nếu đường dẫn bạn khác thì chỉnh lại.
import { products } from "../data/products.mock";
import { categoriesType } from "../data/categoriesType";
import { subcategories } from "../data/subcategories";
import { sizeTypes } from "../data/sizeTypes";
import { sizes } from "../data/sizes";

// ====== tiny helpers ======
const cn = (...xs) => xs.filter(Boolean).join(" ");

function toMoney(v) {
  const n = Number(v);
  if (Number.isNaN(n)) return String(v ?? "");
  return n.toLocaleString("vi-VN");
}

function safeText(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function pickFirst(obj, keys) {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return "";
}

function ensureId(row) {
  // Some mocks might use _id or id or productId
  const id = pickFirst(row, ["id", "_id", "productId", "code"]);
  return id !== "" ? id : Math.random().toString(36).slice(2);
}

// ====== UI atoms (no libs) ======
function Button({ variant = "primary", className, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800",
    ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100",
    soft: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
    danger: "bg-red-600 text-white hover:bg-red-500",
  };
  return <button className={cn(base, styles[variant], className)} {...props} />;
}

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none",
        "focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100",
        className
      )}
      {...props}
    />
  );
}

function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none",
        "focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700">
      {children}
    </span>
  );
}

function Card({ children, className }) {
  return <div className={cn("rounded-2xl border border-zinc-200 bg-white shadow-sm", className)}>{children}</div>;
}

function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-200 p-4">
            <div className="text-base font-semibold text-zinc-900">{title}</div>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ====== Table ======
function DataTable({ columns, rows, onRowClick }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200">
      <table className="w-full border-collapse">
        <thead className="bg-zinc-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="whitespace-nowrap border-b border-zinc-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500"
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-sm text-zinc-500" colSpan={columns.length}>
                Không có dữ liệu.
              </td>
            </tr>
          ) : (
            rows.map((r, idx) => (
              <tr
                key={r.__key ?? idx}
                className={cn(
                  "border-b border-zinc-100 hover:bg-zinc-50",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(r)}
              >
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-sm text-zinc-800">
                    {c.render ? c.render(r) : safeText(r[c.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ====== Main ======
const NAV = [
  { key: "products", label: "Products" },
  { key: "categories", label: "Categories" },
  { key: "subcategories", label: "Subcategories" },
  { key: "sizeTypes", label: "Size Types" },
  { key: "sizes", label: "Sizes" },
];

export default function AdminPage() {
  const [section, setSection] = useState("products");

  // Local state (mock first). Later replace with API loaders.
  const [productsState, setProductsState] = useState([]);
  const [categoriesState, setCategoriesState] = useState([]);
  const [subcategoriesState, setSubcategoriesState] = useState([]);
  const [sizeTypesState, setSizeTypesState] = useState([]);
  const [sizesState, setSizesState] = useState([]);

  // UI state
  const [q, setQ] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [detailRow, setDetailRow] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState("create"); // create | edit
  const [editorDraft, setEditorDraft] = useState({}); // generic draft

  useEffect(() => {
    // init from mocks
    setProductsState(Array.isArray(products) ? products.map((p) => ({ ...p, id: ensureId(p) })) : []);
    setCategoriesState(Array.isArray(categoriesType) ? categoriesType.map((c) => ({ ...c, id: ensureId(c) })) : []);
    setSubcategoriesState(Array.isArray(subcategories) ? subcategories.map((s) => ({ ...s, id: ensureId(s) })) : []);
    setSizeTypesState(Array.isArray(sizeTypes) ? sizeTypes.map((s) => ({ ...s, id: ensureId(s) })) : []);
    setSizesState(Array.isArray(sizes) ? sizes.map((s) => ({ ...s, id: ensureId(s) })) : []);
  }, []);

  const stats = useMemo(() => {
    return {
      products: productsState.length,
      categories: categoriesState.length,
      subcategories: subcategoriesState.length,
      sizeTypes: sizeTypesState.length,
      sizes: sizesState.length,
    };
  }, [productsState, categoriesState, subcategoriesState, sizeTypesState, sizesState]);

  const categoryOptions = useMemo(() => {
    return categoriesState.map((c) => ({
      id: ensureId(c),
      name: pickFirst(c, ["name", "title", "label"]) || `Category ${ensureId(c)}`,
    }));
  }, [categoriesState]);

  const subcategoryOptions = useMemo(() => {
    return subcategoriesState.map((s) => ({
      id: ensureId(s),
      name: pickFirst(s, ["name", "title", "label"]) || `Subcategory ${ensureId(s)}`,
      categoryId: pickFirst(s, ["categoryId", "category_id", "parentId", "typeId"]),
    }));
  }, [subcategoriesState]);

  const filteredSubcategoryOptions = useMemo(() => {
    if (!filterCategory) return subcategoryOptions;
    return subcategoryOptions.filter((s) => String(s.categoryId) === String(filterCategory));
  }, [subcategoryOptions, filterCategory]);

  // ====== derived rows per section ======
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();

    if (section === "products") {
      let r = productsState;

      if (filterCategory) {
        r = r.filter((p) => String(p.categoryId ?? p.category_id ?? p.typeId ?? p.type_id) === String(filterCategory));
      }
      if (filterSubcategory) {
        r = r.filter((p) => String(p.subcategoryId ?? p.subcategory_id) === String(filterSubcategory));
      }

      if (needle) {
        r = r.filter((p) => {
          const name = pickFirst(p, ["name", "title", "productName"]).toLowerCase();
          const brand = pickFirst(p, ["brand", "brandName"]).toLowerCase();
          const id = String(ensureId(p)).toLowerCase();
          return name.includes(needle) || brand.includes(needle) || id.includes(needle);
        });
      }
      return r.map((x) => ({ ...x, __key: ensureId(x) }));
    }

    if (section === "categories") {
      let r = categoriesState;
      if (needle) {
        r = r.filter((c) => {
          const name = pickFirst(c, ["name", "title", "label"]).toLowerCase();
          const id = String(ensureId(c)).toLowerCase();
          return name.includes(needle) || id.includes(needle);
        });
      }
      return r.map((x) => ({ ...x, __key: ensureId(x) }));
    }

    if (section === "subcategories") {
      let r = subcategoriesState;
      if (filterCategory) {
        r = r.filter((s) => String(s.categoryId ?? s.category_id ?? s.parentId ?? s.typeId) === String(filterCategory));
      }
      if (needle) {
        r = r.filter((s) => {
          const name = pickFirst(s, ["name", "title", "label"]).toLowerCase();
          const id = String(ensureId(s)).toLowerCase();
          return name.includes(needle) || id.includes(needle);
        });
      }
      return r.map((x) => ({ ...x, __key: ensureId(x) }));
    }

    if (section === "sizeTypes") {
      let r = sizeTypesState;
      if (needle) {
        r = r.filter((s) => {
          const name = pickFirst(s, ["name", "title", "label"]).toLowerCase();
          const id = String(ensureId(s)).toLowerCase();
          return name.includes(needle) || id.includes(needle);
        });
      }
      return r.map((x) => ({ ...x, __key: ensureId(x) }));
    }

    // sizes
    let r = sizesState;
    if (needle) {
      r = r.filter((s) => {
        const name = pickFirst(s, ["name", "title", "label", "value"]).toLowerCase();
        const id = String(ensureId(s)).toLowerCase();
        return name.includes(needle) || id.includes(needle);
      });
    }
    return r.map((x) => ({ ...x, __key: ensureId(x) }));
  }, [section, q, filterCategory, filterSubcategory, productsState, categoriesState, subcategoriesState, sizeTypesState, sizesState]);

  // ====== columns per section ======
  const columns = useMemo(() => {
    if (section === "products") {
      return [
        {
          key: "id",
          title: "ID",
          render: (p) => <span className="font-mono text-xs text-zinc-600">{String(ensureId(p))}</span>,
        },
        {
          key: "name",
          title: "Name",
          render: (p) => {
            const name = pickFirst(p, ["name", "title", "productName"]) || "(no name)";
            const brand = pickFirst(p, ["brand", "brandName"]);
            return (
              <div className="min-w-[220px]">
                <div className="font-medium text-zinc-900">{name}</div>
                {brand ? <div className="text-xs text-zinc-500">{brand}</div> : null}
              </div>
            );
          },
        },
        {
          key: "price",
          title: "Price",
          render: (p) => {
            const price = pickFirst(p, ["price", "basePrice", "originalPrice"]);
            const sale = pickFirst(p, ["sale", "discount", "salePercent", "salePrice"]);
            return (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{toMoney(price)}</span>
                {sale ? <Pill>Sale</Pill> : null}
              </div>
            );
          },
        },
        {
          key: "category",
          title: "Category",
          render: (p) => {
            const cId = pickFirst(p, ["categoryId", "category_id", "typeId", "type_id"]);
            const match = categoryOptions.find((c) => String(c.id) === String(cId));
            return match ? <Pill>{match.name}</Pill> : <span className="text-zinc-500">—</span>;
          },
        },
        {
          key: "subcategory",
          title: "Subcategory",
          render: (p) => {
            const sId = pickFirst(p, ["subcategoryId", "subcategory_id"]);
            const match = subcategoryOptions.find((s) => String(s.id) === String(sId));
            return match ? <Pill>{match.name}</Pill> : <span className="text-zinc-500">—</span>;
          },
        },
        {
          key: "status",
          title: "Status",
          render: () => <Pill>Active</Pill>,
        },
      ];
    }

    if (section === "categories") {
      return [
        { key: "id", title: "ID", render: (c) => <span className="font-mono text-xs text-zinc-600">{String(ensureId(c))}</span> },
        {
          key: "name",
          title: "Name",
          render: (c) => <span className="font-medium text-zinc-900">{pickFirst(c, ["name", "title", "label"]) || "(no name)"}</span>,
        },
        { key: "meta", title: "Meta", render: (c) => <span className="text-zinc-500">{Object.keys(c ?? {}).length} fields</span> },
      ];
    }

    if (section === "subcategories") {
      return [
        { key: "id", title: "ID", render: (s) => <span className="font-mono text-xs text-zinc-600">{String(ensureId(s))}</span> },
        {
          key: "name",
          title: "Name",
          render: (s) => <span className="font-medium text-zinc-900">{pickFirst(s, ["name", "title", "label"]) || "(no name)"}</span>,
        },
        {
          key: "categoryId",
          title: "Category",
          render: (s) => {
            const cId = pickFirst(s, ["categoryId", "category_id", "parentId", "typeId"]);
            const match = categoryOptions.find((c) => String(c.id) === String(cId));
            return match ? <Pill>{match.name}</Pill> : <span className="text-zinc-500">—</span>;
          },
        },
        { key: "meta", title: "Meta", render: (s) => <span className="text-zinc-500">{Object.keys(s ?? {}).length} fields</span> },
      ];
    }

    if (section === "sizeTypes") {
      return [
        { key: "id", title: "ID", render: (s) => <span className="font-mono text-xs text-zinc-600">{String(ensureId(s))}</span> },
        {
          key: "name",
          title: "Name",
          render: (s) => <span className="font-medium text-zinc-900">{pickFirst(s, ["name", "title", "label"]) || "(no name)"}</span>,
        },
        { key: "meta", title: "Meta", render: (s) => <span className="text-zinc-500">{Object.keys(s ?? {}).length} fields</span> },
      ];
    }

    // sizes
    return [
      { key: "id", title: "ID", render: (s) => <span className="font-mono text-xs text-zinc-600">{String(ensureId(s))}</span> },
      {
        key: "value",
        title: "Value",
        render: (s) => <span className="font-medium text-zinc-900">{pickFirst(s, ["name", "title", "label", "value"]) || "(no value)"}</span>,
      },
      {
        key: "sizeTypeId",
        title: "Size Type",
        render: (s) => {
          const stId = pickFirst(s, ["sizeTypeId", "size_type_id", "typeId"]);
          const match = sizeTypesState.find((x) => String(ensureId(x)) === String(stId));
          const nm = match ? pickFirst(match, ["name", "title", "label"]) : "";
          return nm ? <Pill>{nm}</Pill> : <span className="text-zinc-500">—</span>;
        },
      },
      { key: "meta", title: "Meta", render: (s) => <span className="text-zinc-500">{Object.keys(s ?? {}).length} fields</span> },
    ];
  }, [section, categoryOptions, subcategoryOptions, sizeTypesState]);

  function resetFilters() {
    setQ("");
    setFilterCategory("");
    setFilterSubcategory("");
  }

  function openCreate() {
    setEditorMode("create");
    setEditorDraft({});
    setEditorOpen(true);
  }

  function openEdit(row) {
    setEditorMode("edit");
    setEditorDraft({ ...row });
    setEditorOpen(true);
  }

  function applySave() {
    // Mock save to state only (no API yet)
    const id = ensureId(editorDraft);

    if (section === "products") {
      if (editorMode === "create") {
        setProductsState((prev) => [{ ...editorDraft, id }, ...prev]);
      } else {
        setProductsState((prev) => prev.map((p) => (String(ensureId(p)) === String(id) ? { ...editorDraft, id } : p)));
      }
    } else if (section === "categories") {
      if (editorMode === "create") setCategoriesState((prev) => [{ ...editorDraft, id }, ...prev]);
      else setCategoriesState((prev) => prev.map((c) => (String(ensureId(c)) === String(id) ? { ...editorDraft, id } : c)));
    } else if (section === "subcategories") {
      if (editorMode === "create") setSubcategoriesState((prev) => [{ ...editorDraft, id }, ...prev]);
      else setSubcategoriesState((prev) => prev.map((s) => (String(ensureId(s)) === String(id) ? { ...editorDraft, id } : s)));
    } else if (section === "sizeTypes") {
      if (editorMode === "create") setSizeTypesState((prev) => [{ ...editorDraft, id }, ...prev]);
      else setSizeTypesState((prev) => prev.map((s) => (String(ensureId(s)) === String(id) ? { ...editorDraft, id } : s)));
    } else if (section === "sizes") {
      if (editorMode === "create") setSizesState((prev) => [{ ...editorDraft, id }, ...prev]);
      else setSizesState((prev) => prev.map((s) => (String(ensureId(s)) === String(id) ? { ...editorDraft, id } : s)));
    }

    setEditorOpen(false);
  }

  function applyDelete(row) {
    const id = ensureId(row);
    if (!window.confirm(`Xoá item ID ${id}?`)) return;

    if (section === "products") setProductsState((prev) => prev.filter((p) => String(ensureId(p)) !== String(id)));
    if (section === "categories") setCategoriesState((prev) => prev.filter((c) => String(ensureId(c)) !== String(id)));
    if (section === "subcategories") setSubcategoriesState((prev) => prev.filter((s) => String(ensureId(s)) !== String(id)));
    if (section === "sizeTypes") setSizeTypesState((prev) => prev.filter((s) => String(ensureId(s)) !== String(id)));
    if (section === "sizes") setSizesState((prev) => prev.filter((s) => String(ensureId(s)) !== String(id)));
  }

  const headerTitle = useMemo(() => {
    const item = NAV.find((n) => n.key === section);
    return item?.label ?? "Admin";
  }, [section]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 h-screen w-[260px] border-r border-zinc-200 bg-white">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-zinc-900" />
              <div>
                <div className="text-sm font-semibold text-zinc-900">Shop Admin</div>
                <div className="text-xs text-zinc-500">Dashboard</div>
              </div>
            </div>
          </div>

          <nav className="px-2">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => {
                  setSection(n.key);
                  resetFilters();
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm",
                  section === n.key ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
                )}
              >
                <span>{n.label}</span>
                <span className={cn("text-xs", section === n.key ? "text-white/70" : "text-zinc-400")}>
                  {stats[n.key] ?? ""}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Topbar */}
          <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="text-lg font-semibold text-zinc-900">{headerTitle}</div>
                <div className="text-sm text-zinc-500">Quản lý dữ liệu cửa hàng (mock → API sau)</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="soft" onClick={() => setDetailRow(null)}>
                  Clear Detail
                </Button>
                <Button onClick={openCreate}>+ Create</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 px-6 py-6">
            {/* Controls + Table */}
            <div className="col-span-12 xl:col-span-8">
              <Card className="p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={`Search in ${headerTitle}...`}
                    />
                    <Button variant="soft" onClick={resetFilters}>
                      Reset
                    </Button>
                  </div>

                  {(section === "products" || section === "subcategories") && (
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <div className="w-full md:w-52">
                        <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                          <option value="">All Categories</option>
                          {categoryOptions.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </Select>
                      </div>

                      {section === "products" && (
                        <div className="w-full md:w-52">
                          <Select value={filterSubcategory} onChange={(e) => setFilterSubcategory(e.target.value)}>
                            <option value="">All Subcategories</option>
                            {filteredSubcategoryOptions.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <DataTable
                    columns={[
                      ...columns,
                      {
                        key: "__actions",
                        title: "",
                        render: (r) => (
                         <div className="flex items-center justify-end gap-2">
  <button
    className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
    onClick={(e) => {
      e.stopPropagation();
      openEdit(r);
    }}
  >
    Edit
  </button>

  <button
    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
    onClick={(e) => {
      e.stopPropagation();
      applyDelete(r);
    }}
  >
    Delete
  </button>
</div>

                        ),
                      },
                    ]}
                    rows={rows}
                    onRowClick={(r) => setDetailRow(r)}
                  />
                </div>
              </Card>
            </div>

            {/* Detail panel */}
            <div className="col-span-12 xl:col-span-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-zinc-900">Detail</div>
                  {detailRow ? (
                    <div className="flex items-center gap-2">
                      <Button variant="soft" onClick={() => openEdit(detailRow)}>
                        Edit
                      </Button>
                      <Button variant="ghost" onClick={() => setDetailRow(null)}>
                        Close
                      </Button>
                    </div>
                  ) : null}
                </div>

                {!detailRow ? (
                  <div className="mt-4 text-sm text-zinc-500">
                    Click vào 1 dòng trong bảng để xem chi tiết.
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      <Pill>ID: {String(ensureId(detailRow))}</Pill>
                      <Pill>Section: {headerTitle}</Pill>
                    </div>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Raw JSON
                    </div>
                    <pre className="mt-2 max-h-[420px] overflow-auto rounded-xl bg-zinc-950 p-3 text-xs text-zinc-100">
{JSON.stringify(detailRow, null, 2)}
                    </pre>
                  </div>
                )}
              </Card>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="text-xs font-semibold text-zinc-500">Products</div>
                  <div className="mt-1 text-2xl font-semibold text-zinc-900">{stats.products}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs font-semibold text-zinc-500">Categories</div>
                  <div className="mt-1 text-2xl font-semibold text-zinc-900">{stats.categories}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs font-semibold text-zinc-500">Subcategories</div>
                  <div className="mt-1 text-2xl font-semibold text-zinc-900">{stats.subcategories}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs font-semibold text-zinc-500">Sizes</div>
                  <div className="mt-1 text-2xl font-semibold text-zinc-900">{stats.sizes}</div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Editor modal */}
      <Modal
        open={editorOpen}
        title={`${editorMode === "create" ? "Create" : "Edit"} ${headerTitle}`}
        onClose={() => setEditorOpen(false)}
      >
        <div className="grid grid-cols-12 gap-4">
          {/* Generic editor: user can paste JSON or edit common fields */}
          <div className="col-span-12 md:col-span-6">
            <div className="text-sm font-semibold text-zinc-900">Common fields</div>
            <div className="mt-3 space-y-3">
              <div>
                <div className="mb-1 text-xs font-medium text-zinc-600">Name</div>
                <Input
                  value={pickFirst(editorDraft, ["name", "title", "label"]) || ""}
                  onChange={(e) => setEditorDraft((d) => ({ ...d, name: e.target.value }))}
                  placeholder="name/title/label..."
                />
              </div>

              {section === "products" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="mb-1 text-xs font-medium text-zinc-600">Price</div>
                      <Input
                        value={pickFirst(editorDraft, ["price", "basePrice", "originalPrice"]) || ""}
                        onChange={(e) => setEditorDraft((d) => ({ ...d, price: e.target.value }))}
                        placeholder="199000"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-medium text-zinc-600">Brand</div>
                      <Input
                        value={pickFirst(editorDraft, ["brand", "brandName"]) || ""}
                        onChange={(e) => setEditorDraft((d) => ({ ...d, brand: e.target.value }))}
                        placeholder="Nike/Adidas/..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="mb-1 text-xs font-medium text-zinc-600">Category</div>
                      <Select
                        value={pickFirst(editorDraft, ["categoryId", "typeId", "category_id"]) || ""}
                        onChange={(e) => setEditorDraft((d) => ({ ...d, categoryId: e.target.value }))}
                      >
                        <option value="">Select...</option>
                        {categoryOptions.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <div className="mb-1 text-xs font-medium text-zinc-600">Subcategory</div>
                      <Select
                        value={pickFirst(editorDraft, ["subcategoryId", "subcategory_id"]) || ""}
                        onChange={(e) => setEditorDraft((d) => ({ ...d, subcategoryId: e.target.value }))}
                      >
                        <option value="">Select...</option>
                        {subcategoryOptions.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {section === "subcategories" && (
                <div>
                  <div className="mb-1 text-xs font-medium text-zinc-600">Category</div>
                  <Select
                    value={pickFirst(editorDraft, ["categoryId", "parentId", "typeId", "category_id"]) || ""}
                    onChange={(e) => setEditorDraft((d) => ({ ...d, categoryId: e.target.value }))}
                  >
                    <option value="">Select...</option>
                    {categoryOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {section === "sizes" && (
                <div>
                  <div className="mb-1 text-xs font-medium text-zinc-600">Size Type</div>
                  <Select
                    value={pickFirst(editorDraft, ["sizeTypeId", "typeId", "size_type_id"]) || ""}
                    onChange={(e) => setEditorDraft((d) => ({ ...d, sizeTypeId: e.target.value }))}
                  >
                    <option value="">Select...</option>
                    {sizeTypesState.map((st) => (
                      <option key={ensureId(st)} value={ensureId(st)}>
                        {pickFirst(st, ["name", "title", "label"]) || ensureId(st)}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="text-sm font-semibold text-zinc-900">Raw JSON editor</div>
            <div className="mt-3">
              <textarea
                className={cn(
                  "h-[360px] w-full resize-none rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-mono outline-none",
                  "focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                )}
                value={JSON.stringify(editorDraft, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setEditorDraft(parsed);
                  } catch {
                    // ignore invalid json while typing
                  }
                }}
              />
              <div className="mt-2 text-xs text-zinc-500">
                Tip: bạn có thể paste object từ mock vào đây rồi Save.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={() => setEditorOpen(false)}>
            Cancel
          </Button>
          <Button onClick={applySave}>Save</Button>
        </div>
      </Modal>
    </div>
  );
}
