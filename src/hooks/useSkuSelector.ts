// src/hooks/useSkuSelector.ts
import { useState, useMemo, useCallback, useEffect } from "react";
import type { ProductData, Sku, SkuSelectorState } from "../types/product";

export function useSkuSelector(product: ProductData) {
  // 1. 記錄使用者目前選中的規格
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  
  // 2. 模擬非同步 API 的 Loading 狀態
  const [isLoading, setIsLoading] = useState(false);
  
  // 3. (準備實作) 建立 Lookup Table，這段只會在 product 改變時執行一次
  const pathDictionary = useMemo(() => {
    const dict = new Set<string>();
    // TODO: 稍後我們要在這裡把 stock > 0 的 SKU 拆解成所有可能路徑組合存入 dict
    return dict;
  }, [product.skuList]);

  // 4. (準備實作) 點擊選項的處理邏輯
  const handleOptionSelect = useCallback((specId: string, optionId: string) => {
    // TODO: 處理選中、取消選中、以及連動清除下層無效選項的邏輯
  }, []);

  return {
    selectedSpecs,
    isLoading,
    handleOptionSelect,
    // TODO: 回傳預判過後的可選選項、當前算出的價格與圖片等...
  };
}