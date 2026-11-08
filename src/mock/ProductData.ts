import type { ProductData as ProductDataType } from "../types/product";

// 請直接複製此資料使用
export const ProductData: ProductDataType = {
  id: 1001,
  title: "全機能戶外衝鋒衣 (三層規格測試)",
  basePrice: 1200,
  // 你的程式必須能動態處理這些規格，不可寫死 id 或順序
  specs: [
    {
      id: "color",
      name: "顏色",
      options: [
        { id: "c1", name: "極夜黑" },
        { id: "c2", name: "雲霧灰" },
      ],
    },
    {
      id: "size",
      name: "尺寸",
      options: [
        { id: "s1", name: "S" },
        { id: "s2", name: "M" },
        { id: "s3", name: "L" },
      ],
    },
    {
      id: "material",
      name: "材質",
      options: [
        { id: "m1", name: "Gore-Tex" }, // 加價
        { id: "m2", name: "一般防潑水" },
      ],
    },
  ],
  // 3層規格組合 (Color + Size + Material)
  skuList: [
    // --- 極夜黑系列 (Black) ---
    // Black - S
    {
      id: 101,
      specs: { color: "c1", size: "s1", material: "m1" },
      stock: 5,
      price: 1500,
      image: "https://placehold.co/600x400?text=Black-S-GoreTex",
    },
    {
      id: 102,
      specs: { color: "c1", size: "s1", material: "m2" },
      stock: 10,
      price: 1200,
      image: "https://placehold.co/600x400?text=Black-S-Basic",
    },
    // Black - M
    {
      id: 103,
      specs: { color: "c1", size: "s2", material: "m1" },
      stock: 0,
      price: 1500,
      image: "https://placehold.co/600x400?text=Black-M-GoreTex",
    }, // 缺貨
    {
      id: 104,
      specs: { color: "c1", size: "s2", material: "m2" },
      stock: 15,
      price: 1200,
      image: "https://placehold.co/600x400?text=Black-M-Basic",
    },
    // Black - L
    {
      id: 105,
      specs: { color: "c1", size: "s3", material: "m1" },
      stock: 2,
      price: 1500,
      image: "https://placehold.co/600x400?text=Black-L-GoreTex",
    },
    {
      id: 106,
      specs: { color: "c1", size: "s3", material: "m2" },
      stock: 0,
      price: 1200,
      image: "https://placehold.co/600x400?text=Black-L-Basic",
    }, // 缺貨
    // --- 雲霧灰系列 (Gray) - 只有部分尺寸 ---
    // Gray - S
    {
      id: 201,
      specs: { color: "c2", size: "s1", material: "m1" },
      stock: 0,
      price: 1500,
      image: "https://placehold.co/600x400?text=Gray-S-GoreTex",
    }, // 缺貨
    {
      id: 202,
      specs: { color: "c2", size: "s1", material: "m2" },
      stock: 8,
      price: 1200,
      image: "https://placehold.co/600x400?text=Gray-S-Basic",
    },
    // Gray - M
    {
      id: 203,
      specs: { color: "c2", size: "s2", material: "m1" },
      stock: 0,
      price: 1500,
      image: "https://placehold.co/600x400?text=Gray-M-GoreTex",
    }, // 缺貨
    {
      id: 204,
      specs: { color: "c2", size: "s2", material: "m2" },
      stock: 12,
      price: 1200,
      image: "https://placehold.co/600x400?text=Gray-M-Basic",
    },
    // Gray - L (全線缺貨)
    {
      id: 205,
      specs: { color: "c2", size: "s3", material: "m1" },
      stock: 0,
      price: 1500,
      image: "https://placehold.co/600x400?text=Gray-L-GoreTex",
    },
    {
      id: 206,
      specs: { color: "c2", size: "s3", material: "m2" },
      stock: 0,
      price: 1200,
      image: "https://placehold.co/600x400?text=Gray-L-Basic",
    },
  ],
};
