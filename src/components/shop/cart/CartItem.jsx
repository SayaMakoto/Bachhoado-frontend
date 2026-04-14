"use client";

import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, updateQuantity, removeFromCart } =
    useCart();

  return (
    <div className="flex items-center justify-between gap-6">
      {/* Tên sản phẩm */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.product_name}</h3>
        <p className="text-green-600 font-medium">
          {Number(item.price).toLocaleString("vi-VN")} đ
        </p>
      </div>

      {/* Số lượng */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => decreaseQty(item.product_id)}
          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
        >
          −
        </button>

        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            updateQuantity(item.product_id, Number(e.target.value))
          }
          className="w-14 text-center border rounded py-1"
        />

        <button
          onClick={() => increaseQty(item.product_id)}
          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Tổng tiền sản phẩm */}
      <div className="w-32 text-right font-semibold text-gray-700">
        {(item.price * item.quantity).toLocaleString("vi-VN")} đ
      </div>

      {/* Xoá */}
      <button
        onClick={() => removeFromCart(item.product_id)}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        Xoá
      </button>
    </div>
  );
}
