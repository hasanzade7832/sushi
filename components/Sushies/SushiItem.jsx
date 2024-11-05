import React from "react";
import { Button } from "primereact/button";

const SushiItem = ({ image, title, price, description, bgColor }) => {
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
          <p className="text-red-500 text-lg font-bold mb-2">{price} تومان</p>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        </div>
        <Button
          label="افزودن به سبد خرید"
          className="w-full bg-gradient-to-r from-red-500 to-yellow-400 text-black font-medium py-2 rounded-full hover:from-yellow-500 hover:to-red-500 transition duration-300 transform hover:scale-105 mt-auto"
        />
      </div>
    </div>
  );
};

export default SushiItem;
