// ProductPage.js
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useCart } from "../context/CartContext";
import RelatedProduct from "./RelatedProducts";
import Comments from "./Comments";

const ProductPage = ({ product, categoryId }) => {
  const { addToCart, updateCartItemQuantity, getCartItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);
  const [activeSection, setActiveSection] = useState("related"); // default to "related" section

  useEffect(() => {
    const initialQuantity = getCartItemQuantity(product.title);
    setQuantity(initialQuantity);
    setShowQuantity(initialQuantity > 0);
  }, [product.title, getCartItemQuantity]);

  const images = product.images || (product.image ? [product.image] : []);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      setShowQuantity(true);
    } else {
      setQuantity(0);
      setShowQuantity(false);
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
      setShowQuantity(true);
    }
    addToCart({ ...product, quantity: Math.max(quantity, 1) });
  };

  // Categories data
  const sushiCategories = [
    {
      id: 1,
      products: [
        {
          id: 1,
          image: "/images/1.webp",
          title: "سوشی سبزیجات",
          price: "520,000",
          description: "۸ تکه | ترکیبات: خیار، آووکادو، و سبزیجات تازه...",
        },
        {
          id: 2,
          image: "/images/2.webp",
          title: "سوشی ماهی سالمون",
          price: "690,000",
          description:
            "۸ تکه | ترکیبات: ماهی سالمون، برنج ژاپنی، و چاشنی‌های مخصوص...",
        },
        {
          id: 3,
          image: "/images/3.webp",
          title: "سوشی مرغ تریاکی",
          price: "550,000",
          description: "۸ تکه | ترکیبات: مرغ تریاکی، خیار، و کنجد...",
        },
        {
          id: 4,
          image: "/images/4.webp",
          title: "سوشی میگو",
          price: "750,000",
          description: "۸ تکه | ترکیبات: میگو تازه، آووکادو، و برنج ژاپنی...",
        },
      ],
    },
    {
      id: 2,
      products: [
        {
          id: 5,
          image: "/images/1.webp",
          title: "سوشی تون ماهی",
          price: "620,000",
          description: "۸ تکه | ترکیبات: تون ماهی، آووکادو، و برنج ژاپنی...",
        },
        {
          id: 6,
          image: "/images/2.webp",
          title: "سوشی مارماهی",
          price: "800,000",
          description: "۸ تکه | ترکیبات: مارماهی، خیار، و سس مخصوص...",
        },
        {
          id: 7,
          image: "/images/3.webp",
          title: "سوشی کراب",
          price: "570,000",
          description: "۸ تکه | ترکیبات: گوشت کراب، آووکادو، و برنج ژاپنی...",
        },
        {
          id: 8,
          image: "/images/4.webp",
          title: "سوشی تخم ماهی",
          price: "910,000",
          description:
            "۸ تکه | ترکیبات: تخم ماهی، آووکادو، و چاشنی‌های مخصوص...",
        },
      ],
    },
  ];

  // Filtering related products
  const relatedProducts =
    sushiCategories
      .find((category) => category.id === categoryId)
      ?.products.slice(0, 4) || [];

  return (
    <div className="max-w-7xl w-full mx-auto p-8 bg-gradient-to-r from-green-100 via-blue-50 to-teal-100 rounded-xl shadow-lg rtl">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row">
        {/* Image Carousel */}
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

        {/* Product Info */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-6 text-center">
          <h2 className="text-3xl font-semibold text-teal-800 mb-4">
            {product.title}
          </h2>
          <p className="text-teal-600 text-2xl font-bold mb-6">
            {product.price} تومان
          </p>
          <p className="text-gray-600 text-lg mb-8">{product.description}</p>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {showQuantity && (
              <div className="flex items-center bg-gray-100 rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 bg-teal-400 text-white rounded-l-md focus:outline-none hover:bg-teal-500 transition duration-200"
                  disabled={quantity === 0}
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

      {/* Related Products and Comments Buttons */}
      <div className="mt-12 flex justify-center space-x-4 rtl:space-x-reverse">
        <Button
          label="مشاهده نظرات"
          className={`${
            activeSection === "comments" ? "bg-pink-600" : "bg-purple-400"
          } text-white font-medium py-2 px-4 rounded hover:bg-pink-500 transition duration-300`}
          onClick={() => setActiveSection("comments")}
        />
        <Button
          label="محصولات مرتبط"
          className={`${
            activeSection === "related" ? "bg-indigo-600" : "bg-blue-400"
          } text-white font-medium py-2 px-4 rounded hover:bg-indigo-500 transition duration-300`}
          onClick={() => setActiveSection("related")}
        />
      </div>

      {/* Conditional Rendering of Sections */}
      {activeSection === "related" && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <RelatedProduct
                key={relatedProduct.id}
                id={relatedProduct.id}
                image={relatedProduct.image}
                title={relatedProduct.title}
                price={relatedProduct.price}
                description={relatedProduct.description}
                bgColor="bg-teal-50"
              />
            ))}
          </div>
        </div>
      )}

      {activeSection === "comments" && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <Comments productId={product.id} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
