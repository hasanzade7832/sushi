// CheckoutPage.js
"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
  };

  const [totalAmount, setTotalAmount] = useState(calculateTotal(cartItems));

  useEffect(() => {
    setTotalAmount(calculateTotal(cartItems));
  }, [cartItems]);

  const increaseQuantity = (item) => {
    updateCartItemQuantity(item.title, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.title, item.quantity - 1);
    }
  };

  const handleRemoveItem = (itemTitle) => {
    removeFromCart(itemTitle);
  };

  const handlePayment = () => {
    alert("پرداخت انجام شد!");
    router.push("/");
  };

  const handleEdit = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-gradient-to-r from-green-300 via-blue-200 to-teal-300 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">تکمیل خرید</h1>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 space-y-4 transition duration-300 transform hover:scale-105">
        {cartItems.length > 0 ? (
          <>
            <div className="hidden md:flex justify-between border-b pb-2 text-gray-700 font-semibold">
              <span className="text-center w-1/4 border-r border-gray-300 whitespace-nowrap">تعداد</span>
              <span className="text-center w-1/2 border-r border-gray-300 whitespace-nowrap">عنوان محصول</span>
              <span className="w-1/4 text-center border-r border-gray-300 min-w-max whitespace-nowrap">قیمت محصول</span>
              <span className="w-1/4 text-center min-w-max whitespace-nowrap">حذف محصول</span>
            </div>
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between items-center border-b pb-2">
                {/* کانتر تعداد */}
                <div className="w-full md:w-1/4 flex items-center justify-center text-center border-r md:border-none border-gray-300">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-teal-600 transition duration-300 mx-1"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-teal-600 transition duration-300 mx-1"
                  >
                    +
                  </button>
                </div>

                {/* عنوان محصول */}
                <div className="w-full md:w-1/2 flex items-center justify-center text-center border-r md:border-none border-gray-300 mt-2 md:mt-0">
                  <span>{item.title}</span>
                </div>

                {/* قیمت محصول */}
                <div className="w-full md:w-1/4 text-center min-w-max whitespace-nowrap flex items-center justify-center border-r md:border-none border-gray-300 mt-2 md:mt-0">
                  <span>{(parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)} تومان</span>
                </div>

                {/* حذف محصول */}
                <div className="w-full md:w-1/4 text-center min-w-max whitespace-nowrap flex items-center justify-center mt-2 md:mt-0">
                  <button
                    onClick={() => handleRemoveItem(item.title)}
                    className="text-gray-500 w-8 h-8 rounded-full flex items-center justify-center hover:text-red-600 transition duration-300"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center font-semibold pt-2">
              <span className="text-right mx-auto">مجموع کل: {totalAmount} تومان</span>
            </div>
            <div className="flex justify-between mt-4 space-x-2">
              <button
                onClick={handleEdit}
                className="w-1/3 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                ویرایش
              </button>
              <button
                onClick={handlePayment}
                className="w-2/3 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                پرداخت
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">سبد خرید شما خالی است.</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
