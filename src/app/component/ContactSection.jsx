"use client";
import React, { useState } from "react";

export default function ContactSection({ showHeader = true }) {
  const [formState, setFormState] = useState({ name: "", email: "", number: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", number: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    }, 1500);
  };

  return (
    <section className={showHeader ? "page-section" : ""}>
      {showHeader && (
        <div className="section-header">
          <span className="section-badge">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Contact <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">MT Shop</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Have questions about shipping, returns, or order customization? Drop us a line.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Embed Map with Glass Cover */}
        <div className="relative rounded-[32px] overflow-hidden glass border border-white/10 min-h-[420px] shadow-2xl">
          <div className="absolute top-5 left-5 z-20 bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm text-sm text-white/80">
            Chattogram, Bangladesh
          </div>
          <div className="relative h-full min-h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d475324.8263480138!2d91.7166636107998!3d22.341900457746076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd881b346bb01%3A0x5d01bdbb0f1928f6!2sChattogram!5e0!3m2!1sen!2sbd!4v1682427512271!5m2!1sen!2sbd"
              title="Chattogram location"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(30%) contrast(90%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[32px]" />
        </div>

        {/* Right Column: Premium Form */}
        <div className="glass-card p-8 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden rounded-[32px]">
          <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-violet-600/10 rounded-full blur-[70px] -z-10" />

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">Send Us a Message</h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Have questions about shipping, returns, or order customization? Drop us a line and we&apos;ll respond quickly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="input-glass"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
                <input
                  type="text"
                  placeholder="+880 1234..."
                  value={formState.number}
                  onChange={(e) => setFormState({ ...formState, number: e.target.value })}
                  className="input-glass"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="input-glass"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
              <textarea
                placeholder="How can we help you today?"
                rows={6}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="input-glass resize-none min-h-[160px]"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full btn-primary py-4 disabled:opacity-50"
            >
              {status === "sending" ? "Sending Message..." : status === "success" ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
