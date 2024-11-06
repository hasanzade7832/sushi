"use client";
import React from "react";
import { Button } from "primereact/button";
import { useCart } from "../context/CartContext";

const SushiItem = ({ image, title, price, description, bgColor }) => {
  const { addToCart, cartItems, updateCartItemQuantity } = useCart();
  const itemInCart = cartItems.find((item) => item.title === title);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart({ image, title, price });
  };

  const handleIncreaseQuantity = () => {
    updateCartItemQuantity(title, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateCartItemQuantity(title, quantity - 1);
    } else {
      updateCartItemQuantity(title, 0);
    }
  };

  return (
    <div
      className={`border border-gray-300 rounded-xl overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-xl max-w-sm ${bgColor}`}
    >
      <div className="w-full h-64 overflow-hidden cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </div>
      <div className="p-4 text-center flex flex-col justify-between h-[250px]">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
          <p className="text-teal-600 text-lg font-bold mb-2">{price} تومان</p>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse mt-auto">
          {quantity > 0 && (
            <div className="flex items-center">
              <button
                onClick={handleDecreaseQuantity}
                className="px-3 py-1 bg-gradient-to-r from-teal-400 to-green-400 text-white font-semibold rounded-l-full hover:from-teal-500 hover:to-green-500 transition duration-300 ease-in-out"
              >
                -
              </button>
              <span className="px-4 py-1 bg-white text-gray-700 border-t border-b font-semibold">
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-3 py-1 bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold rounded-r-full hover:from-blue-500 hover:to-teal-500 transition duration-300 ease-in-out"
              >
                +
              </button>
            </div>
          )}
          <Button
            label="افزودن به سبد خرید"
            className={`w-full bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-2 rounded-full transition duration-500 ease-in-out transform hover:scale-105 hover:from-teal-500 hover:to-green-500`}
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default SushiItem;
