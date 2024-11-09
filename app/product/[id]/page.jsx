// app/product/[id]/page.js
"use client";
import React from "react";
import { useParams } from "next/navigation";
import ProductPage from "../../../components/DetailsProduct/DetailsProducts";

const sushiCategories = [
  {
    categoryName: "دسته اول",
    id: 1,
    products: [
      {
        id: 1,
        images: ["/images/1.webp", "/images/2.webp", "/images/3.webp"],
        title: "سوشی سبزیجات",
        price: "520,000",
        description: "۸ تکه | ترکیبات: خیار، آووکادو، و سبزیجات تازه...",
      },
      {
        id: 2,
        images: ["/images/1.webp", "/images/2.webp"],
        title: "سوشی ماهی سالمون",
        price: "690,000",
        description:
          "۸ تکه | ترکیبات: ماهی سالمون، برنج ژاپنی، و چاشنی‌های مخصوص...",
      },
      {
        id: 3,
        image: "/images/3.webp",
        title: "سوشی مرغ تریاکی",
        price: "550,000",
        description: "۸ تکه | ترکیبات: مرغ تریاکی، خیار، و کنجد...",
      },
      {
        id: 4,
        image: "/images/4.webp",
        title: "سوشی میگو",
        price: "750,000",
        description: "۸ تکه | ترکیبات: میگو تازه، آووکادو، و برنج ژاپنی...",
      },
    ],
  },
  {
    categoryName: "دسته دوم",
    id: 2,
    products: [
      {
        id: 5,
        image: "/images/1.webp",
        title: "سوشی تون ماهی",
        price: "620,000",
        description: "۸ تکه | ترکیبات: تون ماهی، آووکادو، و برنج ژاپنی...",
      },
      {
        id: 6,
        image: "/images/2.webp",
        title: "سوشی مارماهی",
        price: "800,000",
        description: "۸ تکه | ترکیبات: مارماهی، خیار، و سس مخصوص...",
      },
      {
        id: 7,
        image: "/images/3.webp",
        title: "سوشی کراب",
        price: "570,000",
        description: "۸ تکه | ترکیبات: گوشت کراب، آووکادو، و برنج ژاپنی...",
      },
      {
        id: 8,
        image: "/images/4.webp",
        title: "سوشی تخم ماهی",
        price: "910,000",
        description: "۸ تکه | ترکیبات: تخم ماهی، آووکادو، و چاشنی‌های مخصوص...",
      },
    ],
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  const category = sushiCategories.find((category) =>
    category.products.some((product) => product.id === productId)
  );

  const product = category?.products.find(
    (product) => product.id === productId
  );

  if (!product) return <p>محصول مورد نظر یافت نشد</p>;

  return <ProductPage product={product} categoryId={category.id} />;
};

export default ProductDetailPage;
