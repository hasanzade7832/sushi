"use client";
import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.title === item.title
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    // نمایش انیمیشن اضافه شدن
    setIsItemAdded(true);
    setTimeout(() => setIsItemAdded(false), 1000); // حذف انیمیشن بعد از یک ثانیه
  };

  const updateCartItemQuantity = (title, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        totalItems,
        isItemAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
