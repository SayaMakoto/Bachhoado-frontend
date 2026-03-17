import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

export default function ShopLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-100">
        <div className="container mx-auto px-6 py-10">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
