"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ADS_DATA = [
  {
    id: 1,
    title: "Vaporwave Neon Collection",
    tagline: "Unleash the Aesthetic",
    description: "Get up to 40% off on all cyberpunk gear and retro styling. Limited stock only.",
    badge: "Limited Edition",
    link: "/products?category=electronics",
    buttonText: "Shop Retro Future",
    color: "from-pink-500/20 to-purple-500/20 border-pink-500/30"
  },
  {
    id: 2,
    title: "Premium Sound Engineering",
    tagline: "Acoustic Excellence",
    description: "Experience sound like never before. High fidelity headphones with noise isolation.",
    badge: "Trending Now",
    link: "/products?category=electronics",
    buttonText: "Discover Audio",
    color: "from-cyan-500/20 to-violet-500/20 border-cyan-500/30"
  },
  {
    id: 3,
    title: "High Street Smart Wear",
    tagline: "Eco-Friendly Fabrics",
    description: "Modern organic fabrics tailored for complete freedom and minimalist design.",
    badge: "New Release",
    link: "/products?category=clothing",
    buttonText: "Explore Clothing",
    color: "from-amber-500/20 to-rose-500/20 border-amber-500/30"
  }
];

export default function CarouselAd() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ADS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 md:py-14">
      <div className="relative w-full min-h-[380px] sm:min-h-[340px] md:min-h-[320px] rounded-2xl overflow-hidden glass border border-white/5 shadow-2xl">
        <div className="absolute inset-0 -z-10 opacity-20 filter blur-sm">
          <Image
            src="/ads.jpg"
            fill
            className="object-cover"
            alt="Ad Backdrop"
            priority
          />
        </div>
        
        {ADS_DATA.map((ad, idx) => (
          <div
            key={ad.id}
            className={`absolute inset-0 flex items-center carousel-slide transition-all duration-700 ease-in-out ${
              idx === currentSlide
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <div className={`absolute top-0 right-0 bottom-0 left-1/2 bg-gradient-to-r ${ad.color} blur-[60px] opacity-60 -z-10`} />

            <div className="carousel-content">
              <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/10 uppercase tracking-widest">
                {ad.badge}
              </span>
              
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  {ad.tagline}
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {ad.title}
                </h3>
              </div>

              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                {ad.description}
              </p>

              <div>
                <Link href={ad.link} className="btn-gold !py-2.5 !px-6 !text-xs">
                  {ad.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {ADS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-8 bg-violet-500" : "w-2 bg-slate-700 hover:bg-slate-600"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
