"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Userinfo from "@/components/shop/auth/userInfo";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/">🥬 FreshFood</Link>
        </h1>

        {/* Menu */}
        <nav>
          <ul className="flex gap-8 items-center font-medium ">
            {/* Trang chủ */}
            <li>
              <Link href="/" className="hover:text-yellow-300">
                Trang chủ
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-yellow-300">
                Sản phẩm
              </Link>
            </li>

            <li>
              <Link href="/pages" className="hover:text-yellow-300">
                Bài viết
              </Link>
            </li>

            {/* Liên hệ */}
            <li>
              <Link href="/contact" className="hover:text-yellow-300">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Userinfo />
          <div className="relative">
            <Link
              href="/cart"
              className="bg-white text-green-600 px-4 py-1 rounded font-semibold"
            >
              🛒 Giỏ hàng
            </Link>

            {mounted && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
