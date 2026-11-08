import { useState } from "react";
import PopupClose from "./PopupClose";
import ProductInfo from "./product-detail/ProductInfo";
import ProductSpecs from "./product-detail/ProductSpecs";
import ProductBuyCount from "./product-detail/ProductBuyCount";
import ProductAddToCartButton from "./product-detail/ProductAddToCartButton";
import ProductSoldOut from "./product-detail/ProductSoldOut";
import ProductRemindMeButton from "./product-detail/ProductRemindMeButton";
import type { ProductData } from "../../types/product";

interface ProductDetailProps {
  productData: ProductData;
}

function ProductDetail({ productData }: ProductDetailProps) {
  const [count, setCount] = useState(1);

  // 預設先顯示第一筆 SKU 的圖片
  const defaultImage = productData.skuList[0]?.image || "";

  return (
    <>
      <div className="w-dvw h-dvh bg-black/50 absolute z-40 p-[2%] flex items-center justify-center">
        <section className="w-full h-full bg-white z-50 rounded-md relative p-5 flex flex-col items-start justify-start gap-5">
          <PopupClose />
          <ProductInfo
            title={productData.title}
            price={productData.basePrice}
            image={defaultImage}
          />
          <ProductSpecs specs={productData.specs} />
          <div className="mt-auto w-full flex gap-5">
            {count > 0 && (
              <>
                <ProductBuyCount />
                <ProductAddToCartButton />
              </>
            )}
            {count === 0 && (
              <>
                <ProductSoldOut />
                <ProductRemindMeButton />
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default ProductDetail;
