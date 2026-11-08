import { useState } from "react";
import PopupClose from "./PopupClose";
import ProductInfo from "./product-detail/ProductInfo";
import ProductSpecs from "./product-detail/ProductSpecs";
import ProductBuyCount from "./product-detail/ProductBuyCount";
import ProductAddToCartButton from "./product-detail/ProductAddToCartButton";
import ProductSoldOut from "./product-detail/ProductSoldOut";
import ProductRemindMeButton from "./product-detail/ProductRemindMeButton";
import { useSkuSelector } from "../../hooks/useSkuSelector";
import type { ProductData } from "../../types/product";

interface ProductDetailProps {
  productData: ProductData;
}

function ProductDetail({ productData }: ProductDetailProps) {
  // 管理購買數量，預設為 1
  const [count, setCount] = useState(1);

  // 使用 Custom Hook 取得所有規格狀態與操作函式
  const {
    selectedSpecs,
    availableOptions,
    currentSku,
    isAllSelected,
    isSoldOut,
    handleOptionSelect,
  } = useSkuSelector(productData);

  // 包裝點擊規格事件：每當切換規格時，將購買數量重置回 1
  const handleSelectWithResetCount = (specId: string, optionId: string) => {
    handleOptionSelect(specId, optionId);
    setCount(1);
  };

  // 若已選滿規格，顯示對應 SKU 的價格與圖片；否則顯示預設價格與第一張圖
  const displayPrice = currentSku ? currentSku.price : productData.basePrice;
  const displayImage = currentSku
    ? currentSku.image
    : productData.skuList[0]?.image || "";

  return (
    <>
      <div className="w-dvw h-dvh bg-black/50 absolute z-40 p-[2%] flex items-center justify-center">
        <section className="w-full h-full bg-white z-50 rounded-md relative p-5 flex flex-col items-start justify-start gap-5">
          <PopupClose />
          <ProductInfo
            title={productData.title}
            price={displayPrice}
            image={displayImage}
          />
          <ProductSpecs
            specs={productData.specs}
            selectedSpecs={selectedSpecs}
            availableOptions={availableOptions}
            onSelectOption={handleSelectWithResetCount}
          />
          {/* 只有當所有規格都選擇完畢 (isAllSelected) 時，才顯示下方區塊 */}
          {isAllSelected && (
            <div className="mt-auto w-full flex items-center justify-between border-t border-gray-200 pt-4 gap-5">
              {!isSoldOut ? (
                <>
                  <ProductBuyCount
                    count={count}
                    maxStock={currentSku?.stock ?? 1}
                    onChange={setCount}
                  />
                  <ProductAddToCartButton />
                </>
              ) : (
                <>
                  <ProductSoldOut />
                  <ProductRemindMeButton />
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default ProductDetail;
