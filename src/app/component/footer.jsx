import React from 'react'

function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-white/5 overflow-hidden">
      {/* Decorative top glow border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="page-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-5">
            <h2 className="text-2xl font-black tracking-tight text-white">
              MT <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">SHOP</span>
            </h2>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Experience the future of online shopping with our premium curated collection and immersive dark shopping experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-500/20 hover:text-violet-400 flex items-center justify-center transition duration-300">
                <span className="text-xs">FB</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-500/20 hover:text-violet-400 flex items-center justify-center transition duration-300">
                <span className="text-xs">TW</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-500/20 hover:text-violet-400 flex items-center justify-center transition duration-300">
                <span className="text-xs">IG</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-violet-500/20 hover:text-violet-400 flex items-center justify-center transition duration-300">
                <span className="text-xs">LD</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/products" className="hover:text-violet-400 transition duration-200">All Products</a>
              </li>
              <li>
                <a href="/about" className="hover:text-violet-400 transition duration-200">About Us</a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-violet-400 transition duration-200">Read Blog</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-violet-400 transition duration-200">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-violet-400 transition duration-200">FAQ & Help</a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-400 transition duration-200">Shipping Rates</a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-400 transition duration-200">Return Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-400 transition duration-200">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-violet-500 transition duration-200"
              />
              <button className="px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium rounded-2xl transition duration-200">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p className="py-2">© {new Date().getFullYear()} MT Shop. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-400 transition py-2">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition py-2">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition py-2">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer