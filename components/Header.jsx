import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme for PrimeReact
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Header = () => {
  return (
    <header className="flex flex-wrap justify-between items-center py-2 px-4 bg-white shadow-md w-full border-b border-gray-200">
      {/* Left Side: Cart Icon and Login / Register Button */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2 sm:mb-0">
        <Button
          icon={<FaShoppingCart className="text-gray-600" />}
          className="p-button-rounded p-button-text"
        />
        <div className="h-6 border-l border-gray-300 mx-2 rtl:border-r rtl:border-l-0 hidden sm:block"></div>
        {/* Vertical line - Hidden on smaller screens */}
        <Button className="p-button-outlined flex items-center px-4 py-1 border border-gray-300 text-sm sm:text-base">
          <BiLogIn className="text-lg mr-2" />
          <span className="hidden sm:inline">ورود | ثبت‌نام</span>
        </Button>
      </div>

      {/* Right Side: Search Bar and Logo */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 space-x-4 rtl:space-x-reverse flex-grow justify-end w-full sm:w-auto">
        {/* Search Bar */}
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex items-center border rounded-md px-2 py-1 focus-within:ring-2 focus-within:ring-gray-300">
          <InputText
            placeholder="جستجو"
            className="w-full px-2 py-1 focus:outline-none text-right border-none shadow-none"
          />
          <FaSearch className="text-gray-500 mr-2" />
        </div>

        {/* Logo */}
        <div className="text-red-500 text-lg sm:text-xl font-bold">
          <span>دیجی‌کالا</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
