import ProductOption from "./ProductOption";
import type { Spec } from "../../../types/product";
interface ProductSpecsProps {
  specs: Spec[];
}

function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <>
      {specs?.map((spec) => (
        <div
          key={"spec_" + spec.id}
          className="w-full flex flex-col items-start gap-5"
        >
          <p className="font-bold text-xl text-black text-left">{spec.name}</p>
          <div className="w-full flex items-center justify-start gap-5">
            {spec?.options?.map((option) => (
              <ProductOption key={option.id} option={option} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductSpecs;
