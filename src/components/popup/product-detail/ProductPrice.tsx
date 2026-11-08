interface ProductPriceProps {
  price: number;
}

function ProductPrice({ price }: ProductPriceProps) {
  return (
    <>
      <h2 className="font-bold text-xl text-black text-left">
        NT${price.toLocaleString()}
      </h2>
    </>
  );
}

export default ProductPrice;
