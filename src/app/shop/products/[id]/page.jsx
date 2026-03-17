import ProductDetail from "@/components/shop/product/ProductDetail";
import { products } from "@/data/products";

export default function Page({ params }) {
  const product = products.find((p) => p.id == params.id);

  return <ProductDetail product={product} />;
}
