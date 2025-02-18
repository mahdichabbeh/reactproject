import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ totalAmount: 0, itemCount: 0 });
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    if (!cartId) {
      fetch("http://localhost:3000/carts", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("cartId", data[0].id);
          setCartId(data[0].id);
        })
    }else {
        fetch(`http://localhost:3000/carts/${cartId}`)
        .then((response) => response.json())
        .then((cartData) => {
          setCart({
            totalAmount: cartData.total || 0,
            itemCount: cartData.items ? cartData.items.length : 0,
          });
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [cartId]);


  return (
    <CartContext.Provider value={{ cart, setCart, cartId }}>
      {children}
    </CartContext.Provider>
  );
};
