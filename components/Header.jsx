"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { useCart } from "../components/context/CartContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const { cartItems, updateCartItemQuantity, totalItems, isItemAdded } =
    useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (link) => {
    if (link) {
      router.push(`/${link}`);
    }
    toggleMenu();
  };

  const menuItems = [
    { label: "نودل", icon: "🍜" },
    { label: "فراید رایس ژاپنی", icon: "🍚" },
    { label: "پیش غذا", icon: "🥟" },
    { label: "سوپ", icon: "🍲" },
    { label: "سالاد", icon: "🥗" },
    { label: "نوشیدنی", icon: "🍹" },
    { label: "موچی", icon: "🍡" },
    { label: "بشقاب سوشی", icon: "🍣" },
    { label: "اونیکیری", icon: "🍙", link: "product#category-3" },
    { label: "هاروماکی", icon: "🥠", link: "product#category-2" },
    { label: "سوشی برگر", icon: "🍔", link: "product#category-1" },
  ];

  const hamburgerMenuItems = [
    { label: "ورود | ثبت‌نام", icon: <BiLogIn />, link: "login" },
    ...menuItems, // افزودن بقیه آیتم‌های منوی اصلی
  ];

  return (
    <div>
      <header className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-gradient-to-r from-green-300 via-blue-200 to-teal-300 shadow-md w-full border-b border-gray-200">
        <div className="hidden sm:flex items-center space-x-4 rtl:space-x-reverse">
          <button
            className={`relative p-button-rounded p-button-text hover:bg-teal-400 hover:bg-opacity-80 hover:text-white rounded-full px-4 py-2 cursor-pointer transition duration-300 ${
              isItemAdded ? "animate-bounce" : ""
            }`}
            onClick={toggleCart}
          >
            <FaShoppingCart className="text-teal-700 text-xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <div className="h-8 border-l-2 border-gray-300 mx-4 rtl:border-r-2 rtl:border-l-0"></div>
          <button
            className="p-button-outlined bg-white text-teal-500 border-2 border-teal-500 hover:bg-teal-400 hover:bg-opacity-80 hover:text-white flex items-center px-4 py-2 rounded-full text-base cursor-pointer transition duration-300"
            onClick={() => handleMenuClick("login")}
          >
            <BiLogIn className="text-lg ml-2" />
            <span>ورود | ثبت‌نام</span>
          </button>
        </div>

        <div className="flex items-center justify-between w-full sm:hidden">
          <button
            className="text-teal-700 text-2xl focus:outline-none cursor-pointer hover:bg-teal-400 hover:bg-opacity-80 p-2 rounded-full transition duration-300"
            onClick={toggleSearch}
          >
            <FaSearch />
          </button>

          <div className="flex items-center space-x-4 rtl:space-x-reverse text-teal-700">
            <div className="text-lg sm:text-2xl font-extrabold tracking-wider">
              🍣 سینی سوشی
            </div>
            <button
              className={`relative p-button-rounded p-button-text hover:bg-teal-400 hover:bg-opacity-80 hover:text-white rounded-full px-4 py-2 cursor-pointer transition duration-300 ${
                isItemAdded ? "animate-bounce" : ""
              }`}
              onClick={toggleCart}
            >
              <FaShoppingCart className="text-teal-700 text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <button
            className="text-teal-700 text-2xl focus:outline-none ml-2 cursor-pointer hover:bg-teal-400 hover:bg-opacity-80 p-2 rounded-full transition duration-300"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        </div>

        <div
          className={`relative transition-all duration-300 ease-in-out ${
            isSearchOpen ? "w-full sm:w-1/3 mt-4" : "w-0 overflow-hidden"
          } sm:flex sm:w-1/3 sm:mt-0`}
        >
          <input
            type="text"
            placeholder="جستجو..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white shadow-lg text-gray-700 text-right focus:outline-none focus:ring-2 focus:ring-teal-300"
            style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" }}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 hidden sm:block" />
        </div>
      </header>

      <nav className="bg-gradient-to-r from-green-300 via-blue-200 to-teal-300 py-2 shadow-md">
        <ul className="hidden sm:flex flex-wrap justify-center gap-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(item.link)}
              className="flex items-center space-x-1 rtl:space-x-reverse text-teal-700 text-sm sm:text-base font-medium no-underline hover:bg-teal-400 hover:bg-opacity-80 hover:text-white rounded-full px-3 py-1 cursor-pointer transition-colors duration-300 ease-in-out"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${
          isCartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold">سبد خرید</h3>
          <button onClick={toggleCart} className="text-teal-500 text-2xl">
            ✖
          </button>
        </div>
        <div className="p-4 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col flex-grow ml-4">
                  <span className="font-semibold text-gray-700">
                    {item.title}
                  </span>
                  <span className="text-gray-500">
                    قیمت: {item.price} تومان
                  </span>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.title, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-teal-200 rounded-l-md hover:bg-teal-300 transition duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-white text-gray-700 border-t border-b">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.title, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-teal-200 rounded-r-md hover:bg-teal-300 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">سبد خرید شما خالی است.</p>
          )}
        </div>
        <div className="p-4 border-t">
          <button className="w-full bg-gradient-to-r from-teal-400 to-green-400 text-white py-2 rounded-full hover:bg-teal-500 transition duration-300">
            تسویه حساب
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-r from-green-300 via-blue-200 to-teal-300 z-50 shadow-lg transform transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="text-teal-700 p-4 focus:outline-none text-lg cursor-pointer hover:bg-teal-400 hover:bg-opacity-80 rounded-full transition duration-300"
            onClick={toggleMenu}
          >
            ✖
          </button>
          <ul className="flex flex-col items-end p-4 space-y-4 text-right">
            {hamburgerMenuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleMenuClick(item.link)}
                className="flex items-center justify-end space-x-1 rtl:space-x-reverse text-teal-700 text-sm font-medium hover:bg-teal-400 hover:bg-opacity-80 hover:text-white rounded-full px-3 py-1 cursor-pointer transition-colors duration-300 ease-in-out"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
