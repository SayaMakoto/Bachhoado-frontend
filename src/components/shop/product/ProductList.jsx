import ProductCard from "./ProductCard";

export default function ProductList({ title, products = [] }) {
  if (!products.length) return null;

  return (
    <section className="mb-12">
      {/* Title */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="h-1 w-16 bg-green-600 rounded-full"></div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}
