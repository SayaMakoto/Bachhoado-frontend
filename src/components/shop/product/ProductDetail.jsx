"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const FALLBACK_IMAGE = "/images/no-image.png";
  const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL;

  const [imgSrc, setImgSrc] = useState(
    product?.image
      ? product.image.startsWith("http")
        ? product.image
        : `${IMG_URL}${product.image}`
      : FALLBACK_IMAGE,
  );

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
          {/* Tag */}
          {product?.tag && (
            <span
              className="inline-block w-fit bg-yellow-100 text-yellow-700 
                     text-xs font-semibold px-3 py-1 rounded-full mb-3"
            >
              {product.tag}
            </span>
          )}

          <h1 className="text-3xl font-bold text-gray-800">
            {product?.product_name}
          </h1>
          {/* Views */}
          <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
            <span>👁</span>
            <span>{Number(product?.view || 0).toLocaleString()} lượt xem</span>
          </div>
          {/* Price Section */}
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            {product?.sale_price && Number(product.sale_price) > 0 ? (
              <>
                <span className="text-3xl font-bold text-red-600">
                  {Number(product.sale_price).toLocaleString()} đ
                </span>

                <span className="text-lg text-gray-400 line-through">
                  {Number(product.price).toLocaleString()} đ
                </span>

                <span
                  className="bg-red-100 text-red-600 text-xs font-semibold 
                         px-2 py-1 rounded-md"
                >
                  Giảm giá
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-green-600">
                {Number(product?.price).toLocaleString()} đ
              </span>
            )}
          </div>

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
