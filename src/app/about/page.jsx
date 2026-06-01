import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="page-container py-12 md:py-16 relative overflow-hidden">
      {/* Background ambient glowing details */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="space-y-16 md:space-y-20">
        {/* Header */}
        <div className="section-header !mb-0">
          <span className="section-badge">
            Our Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            About <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">MT Shop</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-md">
            Get to know our story, our passion, and the team driving next-gen e-commerce forward.
          </p>
        </div>

        {/* Company Introduction */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-white/5 shadow-2xl p-4 flex items-center justify-center">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="/about.jpg"
                fill
                className="object-cover brightness-90 contrast-105"
                alt="About our MT store"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Who We Are</h2>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Welcome to MT Shop, your curated store for high-end electronics, apparel, accessories, and beyond. 
              We are dedicated to providing you with the absolute best quality products, with a focus on reliability, customer service, and sleek modern aesthetics.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Founded with the vision of elevating online shopping into an interactive, immersive dark mode experience, MT Shop combines high-tech design with prompt delivery and premium packaging.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="glass-card p-8 md:p-12 border border-white/5 text-center max-w-4xl mx-auto shadow-2xl space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Our Mission & Vision</h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            Our mission is simple: to connect our customers with premium, carefully engineered items that simplify and enhance their daily routines. 
            We strive to foster a secure, reliable marketplace built around transparency, tech innovation, and ultimate buyer satisfaction.
          </p>
        </section>

        {/* Core Values */}
        <section className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center tracking-tight">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-violet-600/10 text-violet-400 flex items-center justify-center text-lg font-bold border border-violet-500/20">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Customer Centric</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We design and optimize every single touchpoint around our customers, offering instant JWT authentication and rapid-checkout systems.
              </p>
            </div>

            <div className="glass-card p-6 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-lg font-bold border border-cyan-500/20">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Unyielding Integrity</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We believe in complete transparency. We don&apos;t hide hidden charges, and we provide true, honest reviews from verified buyers.
              </p>
            </div>

            <div className="glass-card p-6 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg font-bold border border-emerald-500/20">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Tech Innovation</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Leveraging Next.js Turbopack and Django REST Framework API, we deliver a rapid, seamless full-stack web application.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Message */}
        <div className="text-center pt-8 border-t border-white/5 space-y-2">
          <p className="text-slate-400 text-sm">
            Thank you for visiting us and supporting our journey.
          </p>
          <p className="text-sm font-bold text-white">— The MT Shop Team</p>
        </div>
      </div>
    </div>
  );
}
