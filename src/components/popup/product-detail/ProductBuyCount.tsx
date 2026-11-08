// src/components/popup/product-detail/ProductBuyCount.tsx
interface ProductBuyCountProps {
  count: number;
  maxStock: number;
  onChange: (newCount: number) => void;
}

function ProductBuyCount({ count, maxStock, onChange }: ProductBuyCountProps) {
  const isMin = count <= 1;
  const isMax = count >= maxStock;

  const handleDecrease = () => {
    if (!isMin) {
      onChange(count - 1);
    }
  };

  const handleIncrease = () => {
    if (!isMax) {
      onChange(count + 1);
    }
  };

  return (
    <div className="w-3/4 flex items-center justify-center gap-10 select-none">
      <button
        type="button"
        disabled={isMin}
        onClick={handleDecrease}
        className={`w-8 h-8 flex items-center justify-center text-2xl transition-colors ${
          isMin
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:text-black cursor-pointer"
        }`}
      >
        −
      </button>

      <span className="min-w-[2rem] text-center font-medium text-lg text-black">
        {count}
      </span>

      <button
        type="button"
        disabled={isMax}
        onClick={handleIncrease}
        className={`w-8 h-8 flex items-center justify-center text-2xl transition-colors ${
          isMax
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:text-black cursor-pointer"
        }`}
      >
        +
      </button>
    </div>
  );
}

export default ProductBuyCount;