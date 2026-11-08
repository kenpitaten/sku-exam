import ProductImage from "./ProductImage";
import ProductTitle from "./ProductTitle";
import ProductPrice from "./ProductPrice";

interface ProductInfoProps {
  title: string;
  price: number;
  image: string;
  isLoading?: boolean;
}
function ProductInfo({
  title,
  price,
  image,
  isLoading = false,
}: ProductInfoProps) {
  return (
    <>
      <section className="flex items-center justify-center gap-3 relative">
        <div className="relative w-[160px] h-[160px] shrink-0">
          <ProductImage src={image} alt={title} />
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-semibold text-gray-600">
              載入中...
            </div>
          )}
        </div>

        <div className="w-full h-[160px] flex flex-col justify-between items-start">
          <ProductTitle title={title} />
          <div
            className={`transition-opacity ${isLoading ? "opacity-40" : "opacity-100"}`}
          >
            <ProductPrice price={price} />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductInfo;
