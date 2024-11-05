import React from "react";
import SushiItem from "./SushiItem";

const SushiList = () => {
  const sushiCategories = [
    {
      categoryName: "دسته اول",
      products: [
        {
          image: "./images/1.webp",
          title: "سوشی سبزیجات",
          price: "520,000",
          description: "۸ تکه | ترکیبات: خیار، آووکادو، و سبزیجات تازه...",
        },
        {
          image: "./images/2.webp",
          title: "سوشی ماهی سالمون",
          price: "690,000",
          description:
            "۸ تکه | ترکیبات: ماهی سالمون، برنج ژاپنی، و چاشنی‌های مخصوص...",
        },
        {
          image: "./images/3.webp",
          title: "سوشی مرغ تریاکی",
          price: "550,000",
          description: "۸ تکه | ترکیبات: مرغ تریاکی، خیار، و کنجد...",
        },
        {
          image: "./images/4.webp",
          title: "سوشی میگو",
          price: "750,000",
          description: "۸ تکه | ترکیبات: میگو تازه، آووکادو، و برنج ژاپنی...",
        },
      ],
    },
    {
      categoryName: "دسته دوم",
      products: [
        {
          image: "./images/1.webp",
          title: "سوشی تون ماهی",
          price: "620,000",
          description: "۸ تکه | ترکیبات: تون ماهی، آووکادو، و برنج ژاپنی...",
        },
        {
          image: "./images/2.webp",
          title: "سوشی مارماهی",
          price: "800,000",
          description: "۸ تکه | ترکیبات: مارماهی، خیار، و سس مخصوص...",
        },
        {
          image: "./images/3.webp",
          title: "سوشی کراب",
          price: "570,000",
          description: "۸ تکه | ترکیبات: گوشت کراب، آووکادو، و برنج ژاپنی...",
        },
        {
          image: "./images/4.webp",
          title: "سوشی تخم ماهی",
          price: "910,000",
          description:
            "۸ تکه | ترکیبات: تخم ماهی، آووکادو، و چاشنی‌های مخصوص...",
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {sushiCategories.map((category, idx) => (
        <div
          key={idx}
          className="bg-[#FEF2F2] shadow-lg rounded-xl p-6 sm:p-10 relative mb-8"
        >
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-yellow-400 py-3 px-6 rounded-full shadow-lg inline-block absolute right-0 top-[-1.5rem] transform">
            {category.categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-10">
            {category.products.map((product, index) => (
              <SushiItem
                key={index}
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
                bgColor="bg-yellow-50"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SushiList;
