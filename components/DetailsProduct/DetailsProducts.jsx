"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import SushiItem from "../Sushies/SushiItem";

const ProductPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const defaultProduct = {
    images: ["./images/3.webp", "./images/2.webp", "./images/1.webp"],
    title: "کریپسی گرین رول",
    price: "550,000",
    description: "۸ تکه | ترکیبات سوشی کریپسی گرین رول با طعمی منحصر به فرد و خوشمزه.",
  };

  const displayedProduct = product || defaultProduct;

  // اگر displayedProduct.images وجود نداشت، یک آرایه خالی به عنوان مقدار پیش‌فرض استفاده می‌شود
  const images = displayedProduct.images || [];

  const relatedProducts = [
    {
      image: "./images/3.webp",
      title: "میکس وجی رول",
      price: "520,000",
      description: "۸ تکه | ترکیبات سوشی میکس وجی...",
    },
    {
      image: "./images/4.webp",
      title: "توفو هوزو رول",
      price: "490,000",
      description: "۸ تکه | ترکیبات سوشی توفو...",
    },
    {
      image: "./images/2.webp",
      title: "کریپسی گرین رول",
      price: "550,000",
      description: "۸ تکه | ترکیبات سوشی کریپسی...",
    },
    {
      image: "./images/1.webp",
      title: "کیوکمبر هوزو رول",
      price: "400,000",
      description: "۸ تکه | ترکیبات سوشی کیوکمبر...",
    },
  ];

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-8 bg-gradient-to-r from-green-100 via-blue-50 to-teal-100 rounded-xl shadow-lg">
      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row">
        {/* Right Side - Image Slider */}
        <div className="lg:w-1/2 w-full flex items-center justify-center mb-8 lg:mb-0">
          <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden shadow-lg">
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={displayedProduct.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            ) : (
              <p className="text-center">تصویری موجود نیست</p>
            )}
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-teal-400 text-white rounded-full p-2 shadow-lg focus:outline-none"
              disabled={images.length === 0}
            >
              {"<"}
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-teal-400 text-white rounded-full p-2 shadow-lg focus:outline-none"
              disabled={images.length === 0}
            >
              {">"}
            </button>
          </div>
        </div>

        {/* Left Side - Product Details */}
        <div className="lg:w-1/2 w-full flex flex-col justify-between p-6">
          <h2 className="text-3xl font-semibold text-teal-800 mb-4">
            {displayedProduct.title}
          </h2>
          <p className="text-teal-600 text-2xl font-bold mb-6">
            {displayedProduct.price} تومان
          </p>
          <p className="text-gray-600 text-lg mb-8">{displayedProduct.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-medium text-gray-700">تعداد:</span>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 bg-teal-400 text-white rounded-l-md focus:outline-none hover:bg-teal-500 transition duration-200"
              >
                -
              </button>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 bg-teal-400 text-white rounded-r-md focus:outline-none hover:bg-teal-500 transition duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            label="افزودن به سبد خرید"
            className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-3 rounded-full hover:from-teal-500 hover:to-green-500 transition duration-300 transform hover:scale-105"
          />
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12 bg-gradient-to-r from-teal-400 to-green-400 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-semibold text-white mb-8">
          محصولات مرتبط
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {relatedProducts.map((product, index) => (
            <SushiItem
              key={index}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
              bgColor="bg-teal-50"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
