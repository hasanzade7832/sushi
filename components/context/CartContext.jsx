// CartContext.js
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(false);

  // Load cart from Local Storage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.title === item.title
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
    setIsItemAdded(true);
    setTimeout(() => setIsItemAdded(false), 1000);
  };

  const updateCartItemQuantity = (title, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (title) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== title)
    );
  };

  const getCartItemQuantity = (title) => {
    const item = cartItems.find((item) => item.title === title);
    return item ? item.quantity : 0;
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        getCartItemQuantity,
        totalItems,
        isItemAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
