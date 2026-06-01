"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blogs" },
  ];

  const mobileMenuLinkStyle = {
    display: "block",
    padding: "12px 16px",
    color: "var(--text-secondary)",
    textDecoration: "none",
    borderRadius: "var(--radius-md)",
    transition: "all 0.2s",
    background: "transparent",
    fontSize: "15px",
    fontWeight: 600,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-glass ${
        scrolled ? "shadow-lg" : "shadow-none"
      }`}
    >
      <nav className="page-container flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-1 flex-shrink-0"
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          <span className="gradient-text-gold">MT</span>
          <span style={{ color: "var(--text-primary)" }}>Shop</span>
        </Link>

        <ul
          style={{
            alignItems: "center",
            gap: "32px",
            listStyle: "none",
          }}
          className="desktop-nav"
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
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{ alignItems: "center", gap: "16px" }}
          className="desktop-actions flex-shrink-0"
        >
          {isAuthenticated ? (
            <>
              <Link
                href="/wishlist"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-rose)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
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

              <Link
                href="/cart"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s",
                  position: "relative",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color =
                    "var(--accent-violet-light)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
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

              <Link
                href="/orders"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-emerald)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
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
                    e.currentTarget.style.background =
                      "rgba(244, 63, 94, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  className="btn-outline"
                  style={{ padding: "8px 20px", fontSize: "13px" }}
                >
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button
                  className="btn-primary"
                  style={{ padding: "8px 20px", fontSize: "13px" }}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="mobile-menu-button"
          type="button"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            cursor: "pointer",
            padding: "8px",
            zIndex: 70,
            position: "relative",
            pointerEvents: "auto",
          }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 7h18" />
                <path d="M3 12h18" />
                <path d="M3 17h18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <aside
        id="mobile-nav-drawer"
        className="mobile-nav-drawer"
        aria-hidden={!isOpen}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-1"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            <span className="gradient-text-gold">MT</span>
            <span style={{ color: "var(--text-primary)" }}>Shop</span>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="mobile-drawer-close"
            aria-label="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav style={{ flex: 1 }}>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: 0,
              margin: 0,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  style={mobileMenuLinkStyle}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer-actions">
          {isAuthenticated ? (
            <>
              <div className="mobile-user-row">
                <div className="mobile-user-avatar">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <span>{user?.username || "Account"}</span>
              </div>
              <Link href="/wishlist" onClick={closeMenu} style={mobileMenuLinkStyle}>
                Wishlist
              </Link>
              <Link href="/cart" onClick={closeMenu} style={mobileMenuLinkStyle}>
                Cart
              </Link>
              <Link href="/orders" onClick={closeMenu} style={mobileMenuLinkStyle}>
                My Orders
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="mobile-logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="mobile-auth-buttons">
              <Link href="/login" onClick={closeMenu}>
                <button className="btn-outline" style={{ width: "100%" }}>
                  Login
                </button>
              </Link>
              <Link href="/register" onClick={closeMenu}>
                <button className="btn-primary" style={{ width: "100%" }}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </header>
  );
}
