import React from "react";
import Link from "next/link";
import Image from "next/image";

const BLOGS_DATA = [
  {
    id: 1,
    title: "The Future of Smart Wearables in 2026",
    excerpt: "Discover the latest shifts in biometric sensors, micro-LED screens, and battery life that will redefine the wearable market this year.",
    category: "Technology",
    date: "May 25, 2026",
    readTime: "5 min read",
    image: "/product.png"
  },
  {
    id: 2,
    title: "Minimalist Wardrobes: How to Curate the Perfect Capsule",
    excerpt: "Capsule wardrobes save time, money, and reduce environmental impact. Learn our top five tips to assemble a sleek clothing rotation.",
    category: "Lifestyle",
    date: "May 22, 2026",
    readTime: "4 min read",
    image: "/about.jpg"
  },
  {
    id: 3,
    title: "Choosing the Right Acoustic Settings for Home Studio",
    excerpt: "A simple guide to sound dampening, speaker placement, and audio interface settings to optimize your recordings without breaking the bank.",
    category: "Acoustics",
    date: "May 18, 2026",
    readTime: "6 min read",
    image: "/product.png"
  },
  {
    id: 4,
    title: "Understanding E-Commerce Cyber Security Protocols",
    excerpt: "How MT Shop keeps your banking information secure with double-encryption JSON Web Tokens and tokenized database architectures.",
    category: "Company",
    date: "May 15, 2026",
    readTime: "3 min read",
    image: "/about.jpg"
  }
];

export default function BlogsPage() {
  return (
    <div className="page-container py-12 md:py-16 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="space-y-12 md:space-y-16">
        {/* Header */}
        <div className="section-header !mb-0">
          <span className="section-badge">
            MT Shop Journal
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Our <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Articles</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-md">
            Stay updated with expert columns, tech reviews, lifestyle features, and corporate news.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOGS_DATA.map((blog) => (
            <div
              key={blog.id}
              className="glass-card flex flex-col md:flex-row border border-white/5 overflow-hidden shadow-2xl group transition duration-300 hover:-translate-y-1"
            >
              {/* Image side */}
              <div className="relative w-full md:w-2/5 min-h-[200px] bg-slate-900 flex items-center justify-center">
                <Image
                  src={blog.image}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500 opacity-80"
                  alt={blog.title}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              {/* Text side */}
              <div className="p-6 md:w-3/5 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-violet-400 font-bold uppercase tracking-wider">
                      {blog.category}
                    </span>
                    <span className="text-slate-500">{blog.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white group-hover:text-violet-300 transition duration-200 leading-snug">
                    {blog.title}
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xs text-slate-500">{blog.date}</span>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition underline underline-offset-4"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
