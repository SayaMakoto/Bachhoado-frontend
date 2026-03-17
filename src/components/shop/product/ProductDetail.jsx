const ProductDetail = ({ product }) => {
  return (
    <div className="container mx-auto p-6 flex gap-10">
      {/* Image */}
      <img src={product.image} alt={product.name} className="w-1/2 rounded" />

      {/* Info */}
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p className="text-green-600 text-xl font-semibold mt-2">
          {product.price.toLocaleString()} đ
        </p>

        <p className="mt-4 text-gray-600">{product.description}</p>

        {/* Button */}
        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
