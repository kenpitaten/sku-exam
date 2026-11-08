// src/types/product.ts

export interface SpecOption {
  id: string;
  name: string;
}

export interface Spec {
  id: string;
  name: string;
  options: SpecOption[];
}

export interface Sku {
  id: number;
  specs: Record<string, string>; // 例如: { color: 'c1', size: 's1', material: 'm1' }
  stock: number;
  price: number;
  image: string;
}

export interface ProductData {
  id: number;
  title: string;
  basePrice: number;
  specs: Spec[];
  skuList: Sku[];
}

// 這是我們 Hook 最終要回傳給 UI 用的狀態介面
export interface SkuSelectorState {
  selectedSpecs: Record<string, string>; // 目前選中的規格 { color: 'c1', size: 's2' }
  availableOptions: Record<string, string[]>; // 目前各層級可選的 Option ID 集合 (用於 Lookahead 判斷)
  currentSku: Sku | null; // 若全部選完且有對應 SKU，則回傳該 SKU
  isLoading: boolean; // 模擬 API 的非同步狀態
}