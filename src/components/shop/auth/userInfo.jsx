"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function Userinfo() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="relative">
      {!user ? (
        <Link
          href="/login"
          className="bg-white text-green-600 px-4 py-1 rounded font-semibold"
        >
          Login
        </Link>
      ) : (
        <div className="relative group cursor-pointer">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full bg-white text-green-600 
                          flex items-center justify-center font-bold shadow"
          >
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* Dropdown menu */}
          <div
            className="absolute right-0 mt-2 w-48 bg-white text-black 
                       rounded-lg shadow-lg border border-gray-200
                       opacity-0 invisible
                       group-hover:opacity-100 group-hover:visible
                       transition-all duration-200"
          >
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-green-100"
            >
              Thông tin cá nhân
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
