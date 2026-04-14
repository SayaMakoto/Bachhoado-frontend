"use client";

export default function ResetFilter({ setParams }) {
  const handleReset = () => {
    setParams({
      page: 1,
      limit: 8,
      name: undefined,
      category: undefined,
      brand: undefined,
      price_min: undefined,
      price_max: undefined,
    });
  };

  return (
    <button
      onClick={handleReset}
      className="mt-4 bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
    >
      🔄 Reset bộ lọc
    </button>
  );
}
