interface ProductImageProps {
  src: string;
  alt?: string;
}

function ProductImage({ src, alt = "product" }: ProductImageProps) {
  return (
    <>
      <img className="w-40 h-40 " src={src} alt={alt} />
    </>
  );
}

export default ProductImage;
