import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[150px] -z-10" />

      <div className="space-y-6 max-w-md animate-fadeInUp">
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white">
          4
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>
        
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Lost in Cyberspace
        </h2>
        
        <p className="text-sm md:text-base text-slate-450 leading-relaxed max-w-sm mx-auto">
          The page you are looking for has been moved, deleted, or never existed in the MT Shop database.
        </p>

        <div className="pt-6">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}