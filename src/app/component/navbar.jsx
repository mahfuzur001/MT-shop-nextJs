'use client'
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="flex justify-between items-center p-4 bg-gray-700 text-white">
        <Link href='/' className="text-3xl text-amber-300">
          <b><i>MR</i></b> shop
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 items-center">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/blogs">Blog</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li>
            <Link href="/login" className="text-amber-200 border p-2 rounded-2xl hover:text-amber-50">
              Login
            </Link>
          </li>
          {/* Theme Switcher */}
          <li>
            <label className="swap swap-rotate cursor-pointer">
              <input type="checkbox" className="theme-controller" value="synthwave" />
              {/* Sun icon */}
              <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41...Z" />
              </svg>
              {/* Moon icon */}
              <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14...Z" />
              </svg>
            </label>
          </li>
        </ul>

        {/* Mobile Icon */}
        <button onClick={toggleMenu} className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            className="h-8 w-8 stroke-current text-white cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleMenu}>✕</button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link href="/blogs" onClick={toggleMenu}>Blog</Link></li>
          <li><Link href="/products" onClick={toggleMenu}>Products</Link></li>
          <li><Link href="/login" onClick={toggleMenu} className="text-amber-200 border p-2 rounded-2xl hover:text-amber-50">Login</Link></li>
         
        </ul>
      </div>
    </header>
  );
}
