import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <form action="#" className="space-y-4">
          {/* Username */}
          <div>
            <Input type="text" placeholder="Tên tài khoản" required />
          </div>

          {/* Password */}
          <div>
            <Input type="password" placeholder="Mật khẩu" required />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-green-500" />
              Ghi nhớ tôi
            </label>
          </div>
          <Button type="submit">Đăng nhập</Button>
          <p className="text-center mt-4 text-gray-600">
            Quên mật khẩu?{" "}
            <Link href="#" className="text-green-500 hover:text-green-600">
              Nhấn tại đây
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
