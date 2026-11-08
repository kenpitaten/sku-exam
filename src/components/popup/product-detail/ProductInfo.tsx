import ProductImage from "./ProductImage";
import ProductTitle from "./ProductTitle";
import ProductPrice from "./ProductPrice";

interface ProductInfoProps {
  title: string;
  price: number;
  image: string;
}
function ProductInfo({ title, price, image }: ProductInfoProps) {
  return (
    <>
      <section className="flex items-center justify-center gap-2">
        <ProductImage src={image} alt={title} />
        <div className="w-full h-[160px] flex flex-col justify-between items-start">
          <ProductTitle title={title} />
          <ProductPrice price={price} />
        </div>
      </section>
    </>
  );
}

export default ProductInfo;
