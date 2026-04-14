"use client";

export default function BrandMenu({ brands = [], params, setParams }) {
  const handleClick = (brandName) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      ...(brandName ? { brand: brandName } : { brand: undefined }),
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Nút tất cả */}
      <button
        onClick={() => handleClick(null)}
        className={`border px-3 py-2 rounded text-left ${
          !params.brand ? "bg-green-600 text-white" : "hover:bg-gray-100"
        }`}
      >
        Tất cả
      </button>

      {brands.map((brand) => (
        <button
          key={brand.brand_id}
          onClick={() => handleClick(brand.brand_name)}
          className={`border px-3 py-2 rounded text-left transition ${
            params.brand === brand.brand_name
              ? "bg-green-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {brand.brand_name}
        </button>
      ))}
    </div>
  );
}
