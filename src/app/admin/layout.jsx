"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (parsedUser.user_type !== "admin") {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />

      <div className="pt-14 flex">
        <Sidebar />

        <main className="ml-72 flex-1 p-8 overflow-auto min-h-[calc(100vh-3.5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
