"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/productService";
import ProductDetail from "@/components/shop/product/ProductDetail";
import Loading from "@/components/shop/Loading";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loading />;

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy sản phẩm
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
