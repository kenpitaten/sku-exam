import ProductOption from "./ProductOption";
import type { Spec } from "../../../types/product";
interface ProductSpecsProps {
  specs: Spec[];
  selectedSpecs: Record<string, string>;
  availableOptions: Record<string, string[]>;
  onSelectOption: (specId: string, optionId: string) => void;
}

function ProductSpecs({
  specs,
  selectedSpecs,
  availableOptions,
  onSelectOption,
}: ProductSpecsProps) {
  return (
    <>
      {specs?.map((spec) => (
        <div
          key={"spec_" + spec.id}
          className="w-full flex flex-col items-start gap-5"
        >
          <p className="font-bold text-xl text-black text-left">{spec.name}</p>
          <div className="w-full flex items-center justify-start gap-5">
            {spec?.options?.map((option) => {
              const isSelected = selectedSpecs[spec.id] === option.id;
              const isAvailable =
                availableOptions[spec.id]?.includes(option.id) ?? false;

              return (
                <ProductOption
                  key={option.id}
                  option={option}
                  isSelected={isSelected}
                  isOutOfStock={!isAvailable}
                  onSelect={() => onSelectOption(spec.id, option.id)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductSpecs;
