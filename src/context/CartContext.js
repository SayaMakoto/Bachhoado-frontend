"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Load cart từ localStorage sau khi mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
    setInitialized(true);
  }, []);

  // Lưu lại mỗi khi cart thay đổi (sau khi đã init)
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, initialized]);

  // =============================
  // Các function xử lý cart
  // =============================

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.product_id === product.product_id);

      if (exist) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product_id) => {
    setCart((prev) => prev.filter((item) => item.product_id !== product_id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  // Tăng số lượng
  const increaseQty = (product_id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  // Giảm số lượng
  const decreaseQty = (product_id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      ),
    );
  };

  // Cập nhật số lượng trực tiếp
  const updateQuantity = (product_id, quantity) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id ? { ...item, quantity } : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        total,
        increaseQty,
        decreaseQty,
        updateQuantity,
        initialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
