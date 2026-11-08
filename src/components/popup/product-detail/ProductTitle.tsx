interface ProductTitleProps {
  title: string;
}

function ProductTitle({ title }: ProductTitleProps) {
  return (
    <>
      <h2 className="font-bold text-xl text-black text-left">{title}</h2>
    </>
  );
}

export default ProductTitle;
