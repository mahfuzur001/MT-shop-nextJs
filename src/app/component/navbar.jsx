"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blogs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-glass ${
        scrolled ? "shadow-lg" : "shadow-none"
      }`}
    >
      <nav className="page-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span className="gradient-text-gold">MT</span>
          <span style={{ color: "var(--text-primary)" }}>Shop</span>
        </Link>

        {/* Desktop Nav */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            listStyle: "none",
          }}
          className="hidden lg:flex"
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  transition: "color 0.3s",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--text-secondary)")
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
          className="hidden lg:flex"
        >
          {isAuthenticated ? (
            <>
              {/* Wishlist */}
              <Link
                href="/wishlist"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--accent-rose)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--text-secondary)")
                }
                title="Wishlist"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--accent-violet-light)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--text-secondary)")
                }
                title="Cart"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </Link>

              {/* Orders */}
              <Link
                href="/orders"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--accent-emerald)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--text-secondary)")
                }
                title="My Orders"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </Link>

              {/* Profile */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "var(--gradient-hero)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <button
                  onClick={logout}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(244, 63, 94, 0.3)",
                    color: "var(--accent-rose)",
                    padding: "8px 16px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(244, 63, 94, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="btn-outline" style={{ padding: "8px 20px", fontSize: "13px" }}>
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="btn-primary" style={{ padding: "8px 20px", fontSize: "13px" }}>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="lg:hidden"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            zIndex: 40,
          }}
          onClick={toggleMenu}
        />
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "280px",
          background: "var(--bg-secondary)",
          borderLeft: "1px solid var(--border-subtle)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <span
            style={{ fontSize: "1.25rem", fontWeight: 700 }}
            className="gradient-text"
          >
            Menu
          </span>
          <button
            onClick={toggleMenu}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            ✕
          </button>
        </div>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={toggleMenu}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  borderRadius: "var(--radius-md)",
                  transition: "all 0.2s",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "var(--bg-glass)";
                  e.target.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "var(--text-secondary)";
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "16px", marginTop: "8px" }}>
            {isAuthenticated ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/orders" onClick={toggleMenu} style={{ display: "block", padding: "12px 16px", color: "var(--text-secondary)", textDecoration: "none", borderRadius: "var(--radius-md)" }}>
                  📦 My Orders
                </Link>
                <Link href="/cart" onClick={toggleMenu} style={{ display: "block", padding: "12px 16px", color: "var(--text-secondary)", textDecoration: "none", borderRadius: "var(--radius-md)" }}>
                  🛒 Cart
                </Link>
                <Link href="/wishlist" onClick={toggleMenu} style={{ display: "block", padding: "12px 16px", color: "var(--text-secondary)", textDecoration: "none", borderRadius: "var(--radius-md)" }}>
                  ❤️ Wishlist
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  style={{
                    padding: "12px 16px",
                    background: "rgba(244, 63, 94, 0.1)",
                    border: "1px solid rgba(244, 63, 94, 0.2)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--accent-rose)",
                    cursor: "pointer",
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/login" onClick={toggleMenu}>
                  <button className="btn-outline" style={{ width: "100%" }}>
                    Login
                  </button>
                </Link>
                <Link href="/register" onClick={toggleMenu}>
                  <button className="btn-primary" style={{ width: "100%" }}>
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
