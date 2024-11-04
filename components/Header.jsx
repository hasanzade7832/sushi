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
    <header className="flex flex-col sm:flex-row-reverse justify-between items-center py-2 px-4 bg-white shadow-md w-full border-b border-gray-200">
      {/* Right Side (in horizontal): Logo and Search Bar */}
      <div className="flex items-center justify-end w-full sm:w-auto space-x-2 rtl:space-x-reverse mb-2 sm:mb-0">
        {/* Search Bar */}
        <div className="flex  items-center border rounded-md px-2 py-1 focus-within:ring-2 focus-within:ring-gray-300 w-full sm:w-auto">
          <InputText
            placeholder="جستجو"
            className="w-full px-2 py-1 focus:outline-none text-right border-none shadow-none"
          />
          <FaSearch className="text-gray-500 mr-2" />
        </div>
        {/* Logo */}
        <div className="text-red-500 text-lg sm:text-xl font-bold">
          <span>سینی سوشی</span>
        </div>
      </div>

      {/* Left Side (in horizontal): Cart Icon and Login/Register Button */}
      <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse mt-2 sm:mt-0">
        <Button
          icon={<FaShoppingCart className="text-gray-600" />}
          className="p-button-rounded p-button-text"
        />
        <div className="h-6 border-l border-gray-300 mx-2 rtl:border-r rtl:border-l-0 sm:block"></div>
        <Button className="p-button-outlined flex items-center px-4 py-1 border border-gray-300 text-sm sm:text-base">
          <BiLogIn className="text-lg mr-2" />
          <span>ورود | ثبت‌نام</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
