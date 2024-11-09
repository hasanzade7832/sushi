// ProductPage.js
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useCart } from "../context/CartContext";

const ProductPage = ({ product }) => {
  const { addToCart, updateCartItemQuantity, getCartItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);

  useEffect(() => {
    const initialQuantity = getCartItemQuantity(product.title);
    setQuantity(initialQuantity);
    setShowQuantity(initialQuantity > 0); // Show quantity selector only if quantity > 0
  }, [product.title, getCartItemQuantity]);

  const images = product.images || (product.image ? [product.image] : []);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;

    if (newQuantity > 0) {
      setQuantity(newQuantity);
      setShowQuantity(true); // Show selector when quantity > 0
    } else {
      setQuantity(0);
      setShowQuantity(false); // Hide selector when quantity is 0
    }

    updateCartItemQuantity(product.title, Math.max(newQuantity, 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
      setShowQuantity(true); // Show selector when adding to cart with quantity 1
    }
    addToCart({ ...product, quantity: Math.max(quantity, 1) });
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-8 bg-gradient-to-r from-green-100 via-blue-50 to-teal-100 rounded-xl shadow-lg">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full flex items-center justify-center mb-8 lg:mb-0">
          <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden shadow-lg">
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            ) : (
              <p className="text-center">تصویری موجود نیست</p>
            )}
            {/* دکمه‌های ناوبری فقط در صورتی نمایش داده می‌شوند که تعداد تصاویر بیشتر از 1 باشد */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-teal-400 text-white rounded-full p-2 shadow-lg focus:outline-none"
                >
                  {"<"}
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-teal-400 text-white rounded-full p-2 shadow-lg focus:outline-none"
                >
                  {">"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-6 text-center">
          <h2 className="text-3xl font-semibold text-teal-800 mb-4">
            {product.title}
          </h2>
          <p className="text-teal-600 text-2xl font-bold mb-6">
            {product.price} تومان
          </p>
          <p className="text-gray-600 text-lg mb-8">{product.description}</p>

          {/* Quantity and Add to Cart button */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {showQuantity && (
              <div className="flex items-center bg-gray-100 rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 bg-teal-400 text-white rounded-l-md focus:outline-none hover:bg-teal-500 transition duration-200"
                  disabled={quantity === 0} // Disable "-" button when quantity is 0
                >
                  -
                </button>
                <span className="px-4 py-2 bg-white text-gray-800 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 bg-teal-400 text-white rounded-r-md focus:outline-none hover:bg-teal-500 transition duration-200"
                >
                  +
                </button>
              </div>
            )}

            <Button
              label="افزودن به سبد خرید"
              className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-3 px-6 rounded-full hover:from-teal-500 hover:to-green-500 transition duration-300 transform hover:scale-105"
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
