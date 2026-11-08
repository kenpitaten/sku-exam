import type { SpecOption } from "../../../types/product";
interface ProductOptionProps {
  option: SpecOption;
  isSelected: boolean;
  isOutOfStock: boolean;
  onSelect: () => void;
}

function ProductOption({
  option,
  isSelected,
  isOutOfStock,
  onSelect,
}: ProductOptionProps) {
  // 根據狀態決定按鈕樣式：禁用 (刪除線) / 已選 (紅底白字高亮) / 一般可選
  // 4 種視覺狀態組合：
  // 1. 已選中 + 缺貨 -> 紅底白字 + 刪除線 (還原設計稿 38(M) 樣式)
  // 2. 已選中 + 有貨 -> 紅底白字
  // 3. 未選中 + 缺貨 -> 白底淺灰字 + 刪除線
  // 4. 未選中 + 有貨 -> 白底黑字
  const getButtonStyle = () => {
    if (isSelected && isOutOfStock) {
      return "border-red-500 bg-red-500 text-white line-through";
    }
    if (isSelected) {
      return "border-red-500 bg-red-500 text-white";
    }
    if (isOutOfStock) {
      return "border-gray-200 bg-white text-gray-400 line-through hover:border-gray-300";
    }
    return "border-gray-300 bg-white text-black hover:border-gray-500";
  };

  return (
    <>
      <button
        type="button"
        onClick={onSelect}
        className={`px-4 py-1.5 border rounded text-base font-bold transition-colors cursor-pointer ${getButtonStyle()}`}
      >
        {option.name}
      </button>
    </>
  );
}

export default ProductOption;
