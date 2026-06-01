"use client";

import Banner from "../component/Banner";
import TopSellers from "../component/TopSellers";
import ProductList from "../component/ProductList";
import CarouselAd from "../component/CarouselAd";
import ContactSection from "../component/ContactSection";

export default function Home() {
  return (
    <>
      <Banner />

      <div className="page-container">
        <TopSellers />
        <CarouselAd />
        <ProductList />
        <ContactSection />
      </div>
    </>
  );
}
