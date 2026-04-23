"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const [openGroup, setOpenGroup] = useState();

  const toggleGroup = (group) => {
    setOpenGroup(openGroup === group ? null : group);
  };

  const menuGroups = [
    {
      id: "store",
      title: "Quản lý cửa hàng",
      items: [
        { name: "Sản phẩm", href: "/admin/products" },
        { name: "Danh mục", href: "/admin/categories" },
        { name: "Thương hiệu", href: "/admin/brands" },
        { name: "Banner", href: "/admin/banners" },
        { name: "Đơn hàng", href: "/admin/orders" },
      ],
    },
    {
      id: "content",
      title: "Quản lý nội dung",
      items: [
        { name: "Bài viết", href: "/admin/posts" },
        { name: "Chủ đề", href: "/admin/topics" },
        { name: "Trang tĩnh", href: "/admin/pages" },
        { name: "Liên kết", href: "/admin/links" },
      ],
    },
    {
      id: "system",
      title: "Quản lý hệ thống",
      items: [
        { name: "Người dùng", href: "/admin/users" },
        { name: "Liên hệ", href: "/admin/contacts" },
      ],
    },
  ];

  return (
    <aside className="fixed top-14 left-0 w-72 bg-gray-900 text-gray-200 h-[calc(100vh-3.5rem)] p-6 overflow-y-auto shadow-xl">
      {/* Logo */}
      <div className="text-2xl font-bold mb-8 text-white">Admin Panel</div>

      {/* Menu */}
      <div className="space-y-6">
        {menuGroups.map((group) => (
          <div key={group.id}>
            {/* Group Title */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex justify-between items-center text-left font-semibold text-gray-400 hover:text-white transition"
            >
              {group.title}
              <span className="text-sm">
                {openGroup === group.id ? "▲" : "▼"}
              </span>
            </button>

            {/* Items */}
            {openGroup === group.id && (
              <ul className="mt-3 space-y-2 pl-4 border-l border-gray-700">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-lg transition ${
                        pathname === item.href
                          ? "bg-green-600 text-white"
                          : "hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
