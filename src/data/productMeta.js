// src/data/productMeta.js

// Loại sản phẩm theo category
export const PRODUCT_TYPE_BY_CATEGORY = {
  "men-tops": "apparel",
  "men-shorts": "apparel",
  "men-shoes-road": "shoes",
  "men-shoes-trail": "shoes",

  "women-tops": "apparel",
  "women-shorts": "apparel",
  "women-shoes-road": "shoes",
  "women-shoes-trail": "shoes",

  "watches": "watch", // 👈 đồng hồ là type riêng
};

// map (category + brand) -> id bảng size
export const SIZE_CHART_MAP = {
  // áo nam On
  "men-tops:on": "size_men_tops_on",
  // áo nữ On
  "women-tops:on": "size_women_tops_on",

  // giày nữ Hoka
  "women-shoes-road:hoka": "size_women_shoes_hoka",
  "women-shoes-trail:hoka": "size_women_shoes_hoka",

  // default áo nam nếu brand không có riêng
  "men-tops:*": "size_men_tops_default",
};

// dữ liệu bảng size (demo)
export const SIZE_CHARTS = {
  size_men_tops_on: {
    type: "table",
    columns: ["Size", "Vòng ngực (cm)", "Chiều cao (cm)"],
    rows: [
      { size: "S", chest: "88–92", height: "165–172" },
      { size: "M", chest: "92–96", height: "170–177" },
      { size: "L", chest: "96–100", height: "175–182" },
    ],
  },

  size_women_tops_on: {
    type: "table",
    columns: ["Size", "Ngực (cm)", "Eo (cm)"],
    rows: [
      { size: "XS", chest: "78–82", waist: "60–64" },
      { size: "S",  chest: "82–86", waist: "64–68" },
      { size: "M",  chest: "86–90", waist: "68–72" },
    ],
  },

  size_women_shoes_hoka: {
    type: "table",
    columns: ["EU", "US", "Chiều dài (cm)"],
    rows: [
      { eu: "36", us: "5", length: "22.5" },
      { eu: "37", us: "6", length: "23.0" },
      { eu: "38", us: "7", length: "23.5" },
    ],
  },

  size_men_tops_default: {
    type: "table",
    columns: ["Size", "Ngực (cm)"],
    rows: [
      { size: "S", chest: "88–94" },
      { size: "M", chest: "95–100" },
      { size: "L", chest: "100–106" },
    ],
  },
};
