"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme for PrimeReact
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the hamburger menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Close menu when clicking outside of it
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

  const menuItems = [
    { label: "ورود | ثبت‌نام", icon: <BiLogIn />, isLogin: true },
    { label: "نودل", icon: "🍜" },
    { label: "فراید رایس ژاپنی", icon: "🍚" },
    { label: "پیش غذا", icon: "🥟" },
    { label: "سوپ", icon: "🍲" },
    { label: "سالاد", icon: "🥗" },
    { label: "نوشیدنی", icon: "🍹" },
    { label: "موچی", icon: "🍡" },
    { label: "بشقاب سوشی", icon: "🍣" },
    { label: "سینی سوشی پارتی", icon: "🍣" },
    { label: "اونیکیری", icon: "🍙" },
    { label: "هاروماکی", icon: "🥠" },
    { label: "سوشی برگر", icon: "🍔" },
    { label: "کریسپی رایس", icon: "🍚" },
    { label: "ساشیمی", icon: "🐟" },
    { label: "نگیری", icon: "🍣" },
    { label: "سوشی سبزیجات", icon: "🥬" },
    { label: "سوشی مرغ و گوشت", icon: "🍖" },
    { label: "سوشی دریایی", icon: "🐙" },
  ];

  return (
    <div>
      <header className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-gradient-to-r from-red-500 to-yellow-400 shadow-lg w-full border-b border-gray-200">
        {/* Left Side for Larger Screens (Cart Icon and Divider, Login Button) */}
        <div className="hidden sm:flex items-center space-x-4 rtl:space-x-reverse">
          <button className="p-button-rounded p-button-text hover:bg-yellow-500 hover:bg-opacity-50 hover:text-white rounded-full px-4 py-2 cursor-pointer transition duration-200">
            <FaShoppingCart className="text-white text-xl" />
          </button>
          <div className="h-8 border-l-2 border-white mx-4 rtl:border-r-2 rtl:border-l-0"></div>
          <button className="p-button-outlined bg-white text-red-500 border-2 border-red-500 hover:bg-yellow-500 hover:bg-opacity-50 hover:text-white flex items-center px-4 py-2 rounded-full text-base cursor-pointer transition duration-200">
            <BiLogIn className="text-lg ml-2" />
            <span>ورود | ثبت‌نام</span>
          </button>
        </div>

        {/* Logo and Cart Icon in Center for Mobile */}
        <div className="flex items-center justify-between w-full sm:hidden">
          {/* Search Icon Button for Mobile */}
          <button
            className="text-white text-2xl focus:outline-none cursor-pointer hover:bg-yellow-500 hover:bg-opacity-50 p-2 rounded-full transition duration-200"
            onClick={toggleSearch}
          >
            <FaSearch />
          </button>

          <div className="flex items-center space-x-4 rtl:space-x-reverse text-white">
            <div className="text-lg sm:text-2xl font-extrabold tracking-wider">
              🍣 سینی سوشی
            </div>
            <button className="p-button-rounded p-button-text hover:bg-yellow-500 hover:bg-opacity-50 hover:text-white rounded-full px-4 py-2 cursor-pointer transition duration-200">
              <FaShoppingCart className="text-white text-xl" />
            </button>
          </div>

          {/* Hamburger Icon on the Right */}
          <button
            className="text-white text-2xl focus:outline-none ml-2 cursor-pointer hover:bg-yellow-500 hover:bg-opacity-50 p-2 rounded-full transition duration-200"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        </div>

        {/* Search Input on the Right for Larger Screens */}
        <div className={`relative transition-all duration-300 ease-in-out ${isSearchOpen ? "w-full sm:w-1/3 mt-4" : "w-0 overflow-hidden"} sm:flex sm:w-1/3 sm:mt-0`}>
          <input
            type="text"
            placeholder="جستجو..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white shadow-lg text-gray-700 text-right focus:outline-none focus:ring-2 focus:ring-red-300"
            style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}
          />
          {/* Search Icon inside Input (hidden on smaller screens) */}
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 hidden sm:block" />
        </div>
      </header>

      {/* Menu Section */}
      <nav className="bg-gradient-to-r from-red-500 to-yellow-400 py-2 shadow-md">
        <ul className="hidden sm:flex flex-wrap justify-center gap-4">
          {menuItems.slice(1).map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-1 rtl:space-x-reverse text-white text-sm sm:text-base font-medium no-underline hover:bg-yellow-500 hover:bg-opacity-50 hover:text-white rounded-full px-3 py-1 cursor-pointer transition-colors duration-200 ease-in-out"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className={`sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div
            ref={menuRef}
            className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-r from-red-500 to-yellow-400 z-50 shadow-lg transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <button
              className="text-white p-4 focus:outline-none text-lg cursor-pointer hover:bg-yellow-500 hover:bg-opacity-50 rounded-full transition duration-200"
              onClick={toggleMenu}
            >
              ✖
            </button>
            <ul className="flex flex-col items-end p-4 space-y-4 text-right">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={toggleMenu} // Close menu on item click
                  className="flex items-center justify-end space-x-1 rtl:space-x-reverse text-white text-sm font-medium hover:bg-yellow-500 hover:bg-opacity-50 hover:text-white rounded-full px-3 py-1 cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
