import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      {/* Info */}
      <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>

      <p className="text-green-600 font-bold">
        {product.price.toLocaleString()} đ
      </p>

      {/* Button */}
      <Link
        href={`/shop/products/${product.id}`}
        className="block mt-3 bg-green-600 text-white text-center py-1 rounded hover:bg-green-700"
      >
        Xem chi tiết
      </Link>
    </div>
  );
};

export default ProductCard;
