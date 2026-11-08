interface ProductImageProps {
  src: string;
  alt?: string;
}

function ProductImage({ src, alt = "product" }: ProductImageProps) {
  return (
    <>
      <img className="w-[100px] h-[100px] bg-amber-700" src={src} alt={alt} />
    </>
  );
}

export default ProductImage;
