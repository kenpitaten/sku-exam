import type { SpecOption } from "../../../types/product";
interface ProductOptionProps {
  option: SpecOption;
}

function ProductOption({ option }: ProductOptionProps) {
  return (
    <>
      <span className="font-bold text-xl text-black text-left">
        {option.name}
      </span>
    </>
  );
}

export default ProductOption;
