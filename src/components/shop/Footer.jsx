const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h3 className="font-bold mb-2">FreshFood</h3>
          <p>Thực phẩm sạch mỗi ngày</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Liên hệ</h3>
          <p>📞 0123 456 789</p>
          <p>📧 freshfood@gmail.com</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Bản quyền</h3>
          <p>© 2025 FreshFood</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
