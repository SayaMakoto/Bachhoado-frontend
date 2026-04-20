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

            <Link href="/posts" className="hover:text-yellow-300">
              Blog
            </Link>

            <li className="relative group">
              <span className="cursor-pointer hover:text-yellow-300">
                Thông tin
              </span>

              <ul className="absolute left-0 top-full pt-2 hidden group-hover:block">
                <div className="bg-white text-black rounded shadow-lg min-w-40">
                  <li>
                    <Link
                      href="/pages/1"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/2"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Chính sách
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/3"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Hướng dẫn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pages/5"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Hệ thống đại lý
                    </Link>
                  </li>
                </div>
              </ul>
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
