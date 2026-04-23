export default function Page() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Tổng quan hệ thống cửa hàng
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Tổng doanh thu" value="125.000.000đ" color="green" />
        <StatCard title="Đơn hàng" value="320" color="blue" />
        <StatCard title="Người dùng" value="1,240" color="purple" />
        <StatCard title="Sản phẩm" value="86" color="orange" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-700">
            🧾 Đơn hàng gần đây
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-6 py-3">Mã đơn</th>
                <th className="text-left px-6 py-3">Khách hàng</th>
                <th className="text-left px-6 py-3">Tổng tiền</th>
                <th className="text-left px-6 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <OrderRow
                id="#DH001"
                name="Nguyễn Văn A"
                total="1.250.000đ"
                status="Hoàn thành"
              />
              <OrderRow
                id="#DH002"
                name="Trần Thị B"
                total="850.000đ"
                status="Đang xử lý"
              />
              <OrderRow
                id="#DH003"
                name="Lê Văn C"
                total="2.100.000đ"
                status="Đã huỷ"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${colors[color]}`}
        >
          📈
        </div>
      </div>
    </div>
  );
}

function OrderRow({ id, name, total, status }) {
  const statusColor =
    status === "Hoàn thành"
      ? "bg-green-100 text-green-600"
      : status === "Đang xử lý"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-red-100 text-red-600";

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-medium text-gray-700">{id}</td>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{total}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
