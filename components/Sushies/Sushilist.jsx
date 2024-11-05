import React from 'react';
import SushiItem from './SushiItem';

const SushiList = () => {
  const sushiItems = [
    {
      image: './images/1.webp',
      title: 'mix veggies',
      price: '520,000',
      description: '۸ تکه | ترکیبات سوشی میکس وجی...',
    },
    {
      image: './images/2.webp',
      title: 'tofu hoso roll',
      price: '490,000',
      description: '۸ تکه | ترکیبات سوشی توفو...',
    },
    {
      image: './images/3.webp',
      title: 'کریپسی گرین رول',
      price: '550,000',
      description: '۸ تکه | ترکیبات سوشی کریپسی...',
    },
    {
      image: './images/4.webp',
      title: 'کیوکمبر هوزو رول',
      price: '400,000',
      description: '۸ تکه | ترکیبات سوشی کیوکمبر...',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title with background */}
      <div className="relative mb-8">
        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-yellow-400 py-3 px-6 rounded-full shadow-lg inline-block absolute right-0 top-[-1.5rem] transform">
          منوی سوشی
        </h2>
      </div>

      <div className="bg-[#FEF2F2] shadow-lg rounded-xl p-6 sm:p-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {sushiItems.map((item, index) => (
            <SushiItem
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
              description={item.description}
              bgColor="bg-yellow-50"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SushiList;
