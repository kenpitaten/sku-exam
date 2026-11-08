// src/hooks/useSkuSelector.ts
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { ProductData, Sku, SkuSelectorState } from "../types/product";

// 輔助函式：將規格物件依 specs 順序轉為固定格式的字串 Key，例如 "color:c1|size:s1"
function serializeSpecs(
  specOrder: string[],
  specsObj: Record<string, string>,
): string {
  return specOrder
    .filter((specId) => Boolean(specsObj[specId]))
    .map((specId) => `${specId}:${specsObj[specId]}`)
    .join("|");
}

// 模擬後端 API 請求：延遲 800ms 後回傳對應的 SKU、顯示價格與圖片 (Story #3 AC1)
function simulateFetchSkuApi(
  product: ProductData,
  specOrder: string[],
  selectedSpecs: Record<string, string>,
): Promise<{ matchedSku: Sku | null; price: number; image: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selectedKeys = specOrder.filter((key) =>
        Boolean(selectedSpecs[key]),
      );

      // 若完全沒選任何規格，回傳預設價格與第一張圖
      if (selectedKeys.length === 0) {
        resolve({
          matchedSku: null,
          price: product.basePrice,
          image: product.skuList[0]?.image || "",
        });
        return;
      }

      // 找出符合目前已選條件的第一筆 SKU（用於預覽圖片）
      const previewSku =
        product.skuList.find((sku) =>
          selectedKeys.every((key) => sku.specs[key] === selectedSpecs[key]),
        ) ?? null;

      // 若已選滿所有層級，則 matchedSku 為最終確定的 SKU
      const isAll = selectedKeys.length === specOrder.length;
      const exactSku = isAll ? previewSku : null;

      resolve({
        matchedSku: exactSku,
        price: exactSku ? exactSku.price : product.basePrice,
        image: previewSku?.image || product.skuList[0]?.image || "",
      });
    }, 800);
  });
}

export function useSkuSelector(product: ProductData) {
  // 1. 記錄使用者目前選中的規格，例如 { color: 'c1', size: 's1' }
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  // 由非同步 API 更新的狀態（確保快速連點時只顯示最後一次請求的結果）
  const [currentSku, setCurrentSku] = useState<Sku | null>(null);
  const [displayPrice, setDisplayPrice] = useState<number>(product.basePrice);
  const [displayImage, setDisplayImage] = useState<string>(
    product.skuList[0]?.image || "",
  );

  // 用於追蹤是否是第一次載入（初始載入不需轉圈圈，切換規格時才轉圈圈）
  const isFirstRender = useRef(true);
  // 用於記錄最新一次 API 請求的 ID，雙重防止 Race Condition
  const latestRequestIdRef = useRef(0);

  // 取得規格層級的 ID 順序，例如 ['color', 'size', 'material']
  const specOrder = useMemo(
    () => product.specs.map((spec) => spec.id),
    [product.specs],
  );

  // 2. 建立 Lookup Table (Challenge #1)：將所有 stock > 0 的 SKU 拆解出所有子路徑存入 Set
  // 建立有貨路徑字典 (stock > 0)
  const pathDictionary = useMemo(() => {
    const dict = new Set<string>();

    product.skuList.forEach((sku) => {
      if (sku.stock <= 0) return;

      const entries = specOrder.map(
        (specId) => `${specId}:${sku.specs[specId]}`,
      );

      // 遞迴產生該 SKU 的所有規格子集組合 (2^N 種可能路徑)
      const generateSubPaths = (index: number, currentPath: string[]) => {
        if (index === entries.length) {
          if (currentPath.length > 0) {
            dict.add(currentPath.join("|"));
          }
          return;
        }
        // 分支 1：包含當前層級規格
        generateSubPaths(index + 1, [...currentPath, entries[index]]);
        // 分支 2：不包含當前層級規格
        generateSubPaths(index + 1, currentPath);
      };

      generateSubPaths(0, []);
    });

    return dict;
  }, [product.skuList, specOrder]);

  // 3. Story #2 AC2 (路徑預判)：計算每一層有哪些 option ID 是有庫存可選的
  const availableOptions = useMemo(() => {
    const result: Record<string, string[]> = {};

    product.specs.forEach((spec, specIndex) => {
      // 收集當前層級「上層 (0 ~ specIndex - 1)」已選的規格作為基礎條件
      const upperConditions: Record<string, string> = {};
      for (let i = 0; i < specIndex; i++) {
        const upperSpecId = specOrder[i];
        if (selectedSpecs[upperSpecId]) {
          upperConditions[upperSpecId] = selectedSpecs[upperSpecId];
        }
      }

      // 檢查該層的每個選項，搭配上層條件後是否存在於有貨字典中
      result[spec.id] = spec.options
        .filter((option) => {
          const testPath = serializeSpecs(specOrder, {
            ...upperConditions,
            [spec.id]: option.id,
          });
          return pathDictionary.has(testPath);
        })
        .map((option) => option.id);
    });

    return result;
  }, [product.specs, specOrder, selectedSpecs, pathDictionary]);

  // 4. Story #2 AC3 (點選與自動清除不合法下層選項)
  const handleOptionSelect = useCallback(
    (specId: string, optionId: string) => {
      const clickedIndex = specOrder.indexOf(specId);

      setSelectedSpecs((prev) => {
        const next = { ...prev };

        // 若點擊已選中的項目則取消選取，否則更新選取
        if (next[specId] === optionId) {
          delete next[specId];
        } else {
          next[specId] = optionId;
        }

        // 從上到下逐層檢查：若下層已選項目在新的上層條件下無庫存，自動清除該下層選擇
        const validSelections: Record<string, string> = {};
        specOrder.forEach((currentSpecId, index) => {
          const selectedOptId = next[currentSpecId];
          if (!selectedOptId) return;

          // 被點擊的那一層、以及它上面的層級，直接保留使用者點擊的結果（包含直接點選缺貨項目）
          if (index <= clickedIndex) {
            validSelections[currentSpecId] = selectedOptId;
            return;
          }

          // 針對被點擊層級「更下層 (index > clickedIndex)」的已選項：
          // 檢查搭配新的上層條件後是否還有庫存，若無庫存則自動清除 (Story #2 AC3)
          const testPath = serializeSpecs(specOrder, {
            ...validSelections,
            [currentSpecId]: selectedOptId,
          });

          if (pathDictionary.has(testPath)) {
            validSelections[currentSpecId] = selectedOptId;
          }
        });

        return validSelections;
      });
    },
    [specOrder, pathDictionary],
  );

  // Story #3 AC1 & AC2: 監聽規格切換，觸發 800ms 非同步請求並處理 Race Condition
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let isCancelled = false;
    const currentRequestId = ++latestRequestIdRef.current;

    setIsLoading(true);

    simulateFetchSkuApi(product, specOrder, selectedSpecs).then((res) => {
      // 若在 800ms 內使用者又點了其他選項，isCancelled 會變成 true，舊請求直接丟棄不更新 UI
      if (isCancelled || currentRequestId !== latestRequestIdRef.current) {
        return;
      }

      setCurrentSku(res.matchedSku);
      setDisplayPrice(res.price);
      setDisplayImage(res.image);
      setIsLoading(false);
    });

    // Cleanup function：當 selectedSpecs 在 800ms 內再次改變時，立刻標記前一次請求作廢
    return () => {
      isCancelled = true;
    };
  }, [product, specOrder, selectedSpecs]);

  // 判斷是否所有層級的規格都已經選擇完畢
  const isAllSelected = useMemo(
    () => specOrder.every((specId) => Boolean(selectedSpecs[specId])),
    [specOrder, selectedSpecs],
  );

  // 5. 計算當前完整選中的 SKU（當所有規格都選齊時）
  // const currentSku: Sku | null = useMemo(() => {
  //   if (!isAllSelected) return null;

  //   return (
  //     product.skuList.find((sku) =>
  //       specOrder.every(
  //         (specId) => sku.specs[specId] === selectedSpecs[specId],
  //       ),
  //     ) ?? null
  //   );
  // }, [product.skuList, specOrder, selectedSpecs]);

  // 判斷目前選擇的狀態是否為「已售完」
  const isSoldOut = useMemo(() => {
    const currentPath = serializeSpecs(specOrder, selectedSpecs);
    // 若尚未選擇任何規格，看整件商品是否完全沒庫存
    if (!currentPath) {
      return !product.skuList.some((sku) => sku.stock > 0);
    }
    // 只要目前已選的組合在有貨字典裡找不到，代表這條路徑已無庫存，下方立刻顯示「已售完 / 貨到通知我」
    return !pathDictionary.has(currentPath);
  }, [specOrder, selectedSpecs, pathDictionary, product.skuList]);

  return {
    selectedSpecs,
    availableOptions,
    currentSku,
    displayPrice,
    displayImage,
    isAllSelected,
    isSoldOut,
    isLoading,
    handleOptionSelect,
  };
}
