"use client";
import React from "react";
import ContactSection from "../component/ContactSection";

export default function Contact() {
  return (
    <div className="page-container py-12 md:py-16 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="space-y-12 md:space-y-16">
        {/* Header */}
        <div className="section-header !mb-0">
          <span className="section-badge !bg-cyan-500/10 !text-cyan-400 !border-cyan-500/20">
            Support Center
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Get in <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-md">
            We are here to answer questions, handle support queries, or listen to feedback.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border border-white/5 space-y-3">
            <div className="text-2xl text-violet-400">📍</div>
            <h3 className="text-lg font-bold text-white">Our Head Office</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              122 Nasirabad R/A, GEC Circle,<br />
              Chattogram, Bangladesh
            </p>
          </div>

          <div className="glass-card p-6 border border-white/5 space-y-3">
            <div className="text-2xl text-cyan-400">✉</div>
            <h3 className="text-lg font-bold text-white">Email Address</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              support@mtshop.com<br />
              careers@mtshop.com
            </p>
          </div>

          <div className="glass-card p-6 border border-white/5 space-y-3">
            <div className="text-2xl text-emerald-400">📞</div>
            <h3 className="text-lg font-bold text-white">Phone Support</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              +880 31 1234567<br />
              +880 1712 345678
            </p>
          </div>
        </div>

        {/* Form & Map */}
        <ContactSection showHeader={false} />
      </div>
    </div>
  );
}
