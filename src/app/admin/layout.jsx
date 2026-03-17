import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/shop/Footer";
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <div style={{ display: "flex" }}>
        <div style={{ width: 200 }}>
          <Sidebar />
        </div>
        <main style={{ padding: 20 }}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
