"use client";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useCart } from "../../../components/context/CartContext"; // فرض کنید مسیر درست به `CartContext` است

// نمونه داده‌های محصولات
const productData = [
  { id: 1, images: ["/images/1.webp"], title: "سوشی سبزیجات", price: "520,000", description: "۸ تکه | ترکیبات: خیار، آووکادو، و سبزیجات تازه..." },
  { id: 2, images: ["/images/2.webp"], title: "سوشی ماهی سالمون", price: "690,000", description: "۸ تکه | ترکیبات: ماهی سالمون، برنج ژاپنی، و چاشنی‌های مخصوص..." },
  { id: 3, images: ["/images/3.webp"], title: "سوشی مرغ تریاکی", price: "550,000", description: "۸ تکه | ترکیبات: مرغ تریاکی، خیار، و کنجد..." },
  { id: 4, images: ["/images/4.webp"], title: "سوشی میگو", price: "750,000", description: "۸ تکه | ترکیبات: میگو تازه، آووکادو، و برنج ژاپنی..." },
];

const DetailsProduct = ({ params }) => {
  const { id } = React.use(params);
  const { addToCart, cartItems, updateCartItemQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const numericId = parseInt(id, 10);
    const selectedProduct = productData.find((p) => p.id === numericId);
    setProduct(selectedProduct);
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  if (!product) return <p>در حال بارگذاری...</p>;

  return (
    <div className="max-w-7xl w-full mx-auto p-8 bg-gradient-to-r from-green-100 via-blue-50 to-teal-100 rounded-xl shadow-lg text-right mt-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:text-right">
        <div className="lg:w-1/2 w-full flex items-center justify-center mb-8 lg:mb-0">
          <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
            />
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex flex-col justify-between p-6">
          <h2 className="text-3xl font-semibold text-teal-800 mb-4">
            {product.title}
          </h2>
          <p className="text-teal-600 text-2xl font-bold mb-6">
            {product.price} تومان
          </p>
          <p className="text-gray-600 text-lg mb-8">{product.description}</p>

          {/* Quantity Selector and Add to Cart */}
          <div className="flex items-center justify-end gap-4 mb-6 rtl:space-x-reverse">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
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

            <Button
              label="افزودن به سبد خرید"
              className="w-full lg:w-1/2 bg-gradient-to-r from-green-400 to-teal-400 text-white font-medium py-4 rounded-full hover:from-teal-500 hover:to-green-500 transition duration-300 transform hover:scale-105"
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
