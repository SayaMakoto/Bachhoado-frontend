import { useState } from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL;
  const FALLBACK_IMAGE = "/images/no-image.png"; // ảnh mẫu đặt trong public/images

  const [imgSrc, setImgSrc] = useState(
    product.image
      ? product.image.startsWith("http")
        ? product.image
        : `${IMG_URL}${product.image}`
      : FALLBACK_IMAGE,
  );

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition 
                    border border-gray-100 overflow-hidden 
                    flex flex-col h-full"
    >
      {/* Image */}
      <div className="w-full h-48 bg-gray-100">
        <img
          src={imgSrc}
          alt={product.product_name}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg line-clamp-1 min-h-7">
          {product.product_name}
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-10">
          {product.summary || "Chưa có mô tả"}
        </p>

        {/* Price */}
        <div className="mt-3">
          {product.sale_price && Number(product.sale_price) > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold text-lg">
                  {Number(product.sale_price).toLocaleString()} đ
                </span>

                <span className="text-gray-400 text-sm line-through">
                  {Number(product.price).toLocaleString()} đ
                </span>
              </div>

              {/* % giảm */}
              <span className="inline-block mt-1 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md">
                -
                {Math.round(
                  ((product.price - product.sale_price) / product.price) * 100,
                )}
                %
              </span>
            </>
          ) : (
            <span className="text-green-600 font-bold">
              {Number(product.price).toLocaleString()} đ
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Link
            href={`/products/${product.product_id}`}
            className="block mt-4 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
