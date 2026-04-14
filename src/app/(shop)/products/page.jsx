"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/shop/product/ProductList";
import CategoryMenu from "@/components/shop/filter/CategoryMenu";
import Pagination from "@/components/common/Pagination";
import { getProducts } from "@/services/productService";
import { getCategories } from "@/services/categoryService";
import Search from "@/components/shop/filter/Search";
import ResetFilter from "@/components/shop/filter/ResetFilter";
import BrandMenu from "@/components/shop/filter/BrandMenu";
import { getBrands } from "@/services/brandService";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [params, setParams] = useState({
    page: 1,
    limit: 8,
  });

  // 🌿 Load categories 1 lần
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || res);
      } catch (err) {
        console.error("Lỗi load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // 🥬 Load brands 1 lần
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getBrands();
        setBrands(res.data || res);
      } catch (err) {
        console.error("Lỗi load brands:", err);
      }
    };

    fetchBrands();
  }, []);

  // 🥬 Load products mỗi khi params đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts(params);

        setProducts(res.data);
        setTotalPages(res.totalPage);
      } catch (err) {
        console.error("Lỗi load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 bg-white border rounded-2xl shadow-sm p-6 h-fit sticky top-24">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            📂 Danh mục
          </h3>

          <CategoryMenu
            categories={categories}
            params={params}
            setParams={setParams}
          />

          <div className="my-6 border-t"></div>

          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            🏷️ Thương hiệu
          </h3>

          <BrandMenu brands={brands} params={params} setParams={setParams} />

          <div className="mt-6">
            <ResetFilter setParams={setParams} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Search Box */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border">
            <Search setParams={setParams} />
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-gray-500 py-10 animate-pulse">
              Đang tải sản phẩm...
            </div>
          )}

          {/* Product List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <ProductList products={products} />
          </div>

          {/* Pagination */}
          <div className="flex justify-center pt-4">
            <Pagination
              totalPages={totalPages}
              params={params}
              onChangeParams={setParams}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
