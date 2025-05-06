"use client";
import { useState } from "react";

export default function Contact() {

  return (
    <main className="bg-gray-50 text-black">
      <section className="py-2 ">
        <h2 className="text-4xl font-semibold text-center mb-6">Contact Us</h2>
        
        {/* Contact Form */}
        <div className="bg-white pt-4 p-8 rounded-xl shadow-lg max-w-xl mx-auto">
        <form className="space-y-1">
    <label >Name</label>
    <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-lg" />
    <label >Number</label>
    <input type="text" placeholder="Your Number" className="w-full p-2 border rounded-lg" />
    <label >Email</label>
    <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg" />
    <label >Message</label>
    <textarea type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg" />
    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800">
      Send Message
    </button>
  </form>
        </div>
      </section>
    </main>
  );
}
