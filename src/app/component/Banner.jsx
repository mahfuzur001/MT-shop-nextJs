import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Banner() {
  return (
    <section className="relative min-h-[auto] lg:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background gradients and glows */}
      <div className="absolute inset-0 bg-slate-950 -z-20" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] -z-10" />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="page-container w-full py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center lg:justify-items-stretch">
          {/* Left Column: Premium Text & Call to Action */}
          <div className="w-full max-w-2xl space-y-7 text-center lg:text-left animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              New Arrivals Available
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Discover the Future of{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Smart Shopping
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to MT Shop, where next-gen design meets curated luxury. Dive into our exclusive range of electronics, apparel, and premium goods built for the modern lifestyle.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Link href="/products" className="btn-primary flex items-center gap-2">
                Explore Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link href="/about" className="btn-outline">
                Learn More
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-white/5 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-white">25K+</p>
                <p className="text-xs text-slate-500 mt-1">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">10K+</p>
                <p className="text-xs text-slate-500 mt-1">Premium Items</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-xs text-slate-500 mt-1">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Interactive Image Card */}
          <div className="relative flex w-full justify-center lg:justify-end animate-float">
            {/* Glow backdrop for card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-[100px] -z-10" />
            
            <div className="relative w-full max-w-[min(450px,calc(100vw-2rem))] aspect-square rounded-2xl overflow-hidden glass border border-white/10 p-4 sm:p-6 flex items-center justify-center shadow-2xl">
              {/* Inner details decor */}
              <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400/60">MT_SYS_V1.0</div>
              <div className="absolute bottom-4 right-4 text-xs font-mono text-violet-400/60">//PREMIUM_COLLECTION</div>
              
              <div className="relative w-[85%] h-[85%]">
                <Image 
                  src="/product.png" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(124,58,237,0.3)] filter brightness-110" 
                  alt="Featured Product Showcase" 
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
