"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getNewProducts,
  getBestSellerProducts,
  getMostViewedProducts,
  getHotProducts,
} from "@/services/productService";

import ProductList from "@/components/shop/product/ProductList";

export default function Page() {
  const [newProducts, setNewProducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [newRes, bestSellerRes, mostViewedRes, hotRes] =
          await Promise.all([
            getNewProducts(4),
            getBestSellerProducts(4),
            getMostViewedProducts(4),
            getHotProducts(4),
          ]);

        setNewProducts(newRes);
        setBestSeller(bestSellerRes);
        setMostViewed(mostViewedRes);
        setHotProducts(hotRes);
      } catch (error) {
        console.log("FULL ERROR:", JSON.stringify(error, null, 2));
      }
    };

    fetchProducts();
  }, []);

  const Section = ({ title, href, products }) => (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

        <Link
          href={href}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          Xem thêm →
        </Link>
      </div>

      <ProductList products={products} />
    </section>
  );

  return (
    <div className="container mx-auto px-6 py-12 space-y-16">
      <Section title="Sản phẩm mới" href="/products" products={newProducts} />
      <Section
        title="Sản phẩm bán chạy"
        href="/products"
        products={bestSeller}
      />
      <Section
        title="Sản phẩm xem nhiều nhất"
        href="/products"
        products={mostViewed}
      />
      <Section title="Sản phẩm hot" href="/products" products={hotProducts} />
    </div>
  );
}
