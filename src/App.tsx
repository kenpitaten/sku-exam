import ProductDetail from "./components/popup/ProductDetail";
import { ProductData } from "./mock/ProductData";

function App() {
  return (
    <>
      <div className="">
        <ProductDetail productData={ProductData} />
      </div>
    </>
  );
}

export default App;
