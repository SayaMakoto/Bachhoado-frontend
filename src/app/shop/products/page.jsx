import ProductList from "@/components/shop/product/ProductList";
import { products } from "@/data/products";

export default function Page() {
  return <ProductList products={products} />;
}