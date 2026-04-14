"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, updateProduct } from "@/services/productService";
import UpdateProductForm from "@/components/admin/product/UpdateProduct";
import BackButton from "@/components/common/BackButton";
import UploadSingleFile from "@/components/common/Upload";

export default function UpdateProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setFormData({
          product_name: data.product_name,
          alias: data.alias,
          cat_id: data.cat_id,
          brand_id: data.brand_id,
          detail: data.detail,
          price: data.price,
          sale_price: data.sale_price,
          image: data.image,
          launch_date: data.launch_date
            ? new Date(data.launch_date).toISOString().slice(0, 16)
            : "",
          tag: data.tag,
          summary: data.summary,
          status: data.status,
          trash: data.trash,
          view: data.view,
        });
      } catch (e) {
        setErrors({ message: e?.data?.error || "Lỗi tải dữ liệu" });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);

      await updateProduct(id, {
        ...data,
        price: Number(data.price),
        sale_price: Number(data.sale_price),
        cat_id: Number(data.cat_id),
        brand_id: Number(data.brand_id),
        status: Number(data.status),
        trash: Number(data.trash),
        view: Number(data.view),
      });

      alert("Cập nhật thành công");
      router.push("/admin/products");
    } catch (e) {
      setErrors({ message: "Cập nhật thất bại" });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData)
    return <p className="text-center mt-10">Đang tải...</p>;

  if (errors.message)
    return <p className="text-center text-red-500">{errors.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <h1 className="text-2xl font-bold text-gray-800">
            Chỉnh sửa sản phẩm
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* FORM */}
          <div className="lg:col-span-2">
            <UpdateProductForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleUpdate}
              loading={loading}
            />
          </div>

          {/* UPLOAD */}
          <div>
            <UploadSingleFile
              onUploadSuccess={(fileName) =>
                setFormData((prev) => ({
                  ...prev,
                  image: fileName,
                }))
              }
            />

            {/* Ảnh hiện tại */}
            {formData?.image && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Ảnh hiện tại</p>
                <img
                  src={formData.image}
                  alt="current"
                  className="w-full h-48 object-cover rounded-xl border"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
