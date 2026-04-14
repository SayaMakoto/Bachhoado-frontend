"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProduct } from "@/services/productService";
import CreateProduct from "@/components/admin/product/CreateProduct";
import BackButton from "@/components/common/BackButton";
import UploadSingleFile from "@/components/common/Upload";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleCreate = async (form) => {
    try {
      setLoading(true);

      await createProduct({
        ...form,
        image,
        price: Number(form.price),
        sale_price: Number(form.sale_price),
        cat_id: Number(form.cat_id),
        brand_id: Number(form.brand_id),
        view: Number(form.view),
      });

      alert("Thêm thành công");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <h1 className="text-2xl font-bold text-gray-800">
            Thêm sản phẩm mới
          </h1>
        </div>

        {/* Layout 2 cột */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* FORM */}
          <div className="lg:col-span-2">
            <CreateProduct
              onSubmit={handleCreate}
              loading={loading}
              image={image}
            />
          </div>

          {/* UPLOAD */}
          <div>
            <UploadSingleFile onUploadSuccess={setImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
