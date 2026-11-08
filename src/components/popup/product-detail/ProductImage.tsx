interface ProductImageProps {
  src: string;
  alt?: string;
}

function ProductImage({ src, alt = "product" }: ProductImageProps) {
  return (
    <>
      <img className="w-[160px] h-[160px] " src={src} alt={alt} />
    </>
  );
}

export default ProductImage;
