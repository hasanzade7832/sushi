// app/product/[id]/page.js
"use client";
import React from "react";
import { useParams } from "next/navigation";
import ProductPage from "../../../components/DetailsProduct/DetailsProducts";

const sushiCategories = [
  {
    categoryName: "دسته اول",
    products: [
      { id: 1, image: "./images/1.webp", title: "سوشی سبزیجات", price: "520,000", description: "۸ تکه | ترکیبات: خیار، آووکادو، و سبزیجات تازه..." },
      { id: 2, image: "./images/2.webp", title: "سوشی ماهی سالمون", price: "690,000", description: "۸ تکه | ترکیبات: ماهی سالمون، برنج ژاپنی، و چاشنی‌های مخصوص..." },
    ],
  },
  {
    categoryName: "دسته دوم",
    products: [
      { id: 5, image: "./images/1.webp", title: "سوشی تون ماهی", price: "620,000", description: "۸ تکه | ترکیبات: تون ماهی، آووکادو، و برنج ژاپنی..." },
    ],
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);

  const product = sushiCategories
    .flatMap((category) => category.products)
    .find((product) => product.id === productId);

  if (!product) return <p>محصول مورد نظر یافت نشد</p>;

  return <ProductPage product={product} />;
};

export default ProductDetailPage;
