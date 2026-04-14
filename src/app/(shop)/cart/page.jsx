"use client";

import CartItem from "@/components/shop/cart/CartItem";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, total, initialized } = useCart();

  if (!initialized) {
    return null; // hoặc loading skeleton
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          🛒 Giỏ hàng của bạn đang trống
        </h2>
        <Link
          href="/products"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">
        🛒 Giỏ hàng của bạn
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.product_id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
            >
              <CartItem item={item} />
            </div>
          ))}
        </div>

        {/* Tổng tiền */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Tóm tắt đơn hàng
          </h2>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Tạm tính</span>
            <span>{total.toLocaleString("vi-VN")} đ</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-lg font-bold text-green-600">
            <span>Tổng cộng</span>
            <span>{total.toLocaleString("vi-VN")} đ</span>
          </div>

          <Link
            href="/checkout"
            className="block mt-6 bg-green-600 text-white text-center px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
}
