"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Banner from "./component/Banner";
import TopSellers from "./component/TopSellers";
import ContactSection from "./component/ContactSection";
import ProductList from "./component/ProductList";
import CarouselAd from "./component/CarouselAd";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <>
      <Banner />
      <TopSellers />
      <ProductList  />
      <CarouselAd />
      <ContactSection />
    </>
  );
}
