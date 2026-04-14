"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const FALLBACK_IMAGE = "/images/no-image.png";

  const [imgSrc, setImgSrc] = useState(product?.image || FALLBACK_IMAGE);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Nút quay lại */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 
                   text-green-600 font-medium 
                   hover:text-green-800 transition"
      >
        ← Quay lại
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-sm">
          <img
            src={imgSrc}
            alt={product?.product_name}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-105 object-cover rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">
            {product?.product_name}
          </h1>

          <p className="text-green-600 text-2xl font-semibold mt-4">
            {Number(product?.price).toLocaleString()} đ
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product?.detail || "Chưa có mô tả chi tiết cho sản phẩm này."}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-green-600 text-white px-8 py-3 
                       rounded-xl hover:bg-green-700 
                       transition transform hover:scale-105 
                       active:scale-95"
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
