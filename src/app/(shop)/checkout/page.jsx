"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { createOrder } from "@/services/orderService";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, total } = useCart();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    user_id: null,
    customer_name: "",
    address: "",
    phone: "",
    email: "",
    total: 0,
    note: "",
    status: 1,
  });

  // =============================
  // Đồng bộ user và total vào form
  // =============================
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user_id: user?.user_id ?? null,
      customer_name: user?.name ?? "",
      email: user?.email ?? "",
      total: total ?? 0,
    }));
  }, [user, total]);

  // =============================
  // Đồng bộ input và state
  // =============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =============================
  // Submit
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Giỏ hàng đang trống.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = {
        order: formData,
        details: cart,
      };
      console.log("DATA GUI LEN:", data);
      const res = await createOrder(data);

      setSuccess(true);

      // Reset giỏ hàng
      localStorage.removeItem("cart");
      window.location.href = "/"; // hoặc router.push("/")
    } catch (err) {
      console.log("ERROR RESPONSE:", err.response);
      console.log("ERROR DATA:", err.response?.data);
      console.error(err);
      setError("Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Thanh toán</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* ================== LEFT: GIỎ HÀNG ================== */}
        <div className="bg-white rounded-xl shadow-md border p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Sản phẩm của bạn</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Giỏ hàng trống.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                  </div>

                  <div className="text-right font-medium">
                    {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-4 font-bold text-green-600">
                <span>Tổng cộng</span>
                <span>{total.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
          )}
        </div>

        {/* ================== RIGHT: FORM ================== */}
        <div className="bg-white rounded-xl shadow-md border p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-600 rounded">
              Đặt hàng thành công 🎉
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              name="customer_name"
              placeholder="Họ tên"
              value={formData.customer_name || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2"
            />

            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2"
            />

            <label className="text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2"
            />

            <label className="text-sm font-medium text-gray-700">
              Địa chỉ giao hàng
            </label>
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ giao hàng"
              value={formData.address || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2"
            />

            <label className="text-sm font-medium text-gray-700">Ghi chú</label>
            <textarea
              name="note"
              placeholder="Ghi chú"
              value={formData.note || ""}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg 
                     hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
