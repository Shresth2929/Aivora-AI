"use client";
// Navbar — sticky with scroll-blur effect, mobile hamburger, accessible

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Product", href: "#capabilities" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 12);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 250ms, border-color 250ms, box-shadow 250ms",
          background: scrolled
            ? "color-mix(in srgb, var(--bg-base) 85%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.8)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border-subtle)"
            : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        }}
      >
        <div
          className="container-wide"
          style={{
            display: "flex",
            alignItems: "center",
            height: 60,
            gap: "1.5rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Aivora AI — Home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "var(--text-primary)",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "var(--radius-sm)",
                background: "var(--accent)",
                color: "#fff",
                flexShrink: 0,
              }}
              aria-hidden
            >
              <Zap size={14} strokeWidth={2.5} />
            </span>
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Aivora
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            className="nav-desktop"
            style={{
              alignItems: "center",
              gap: "0.25rem",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "0.375rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  transition: "color 150ms, background 150ms",
                }}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginLeft: "auto",
              flexShrink: 0,
            }}
          >
            <ThemeToggle />
            <a
              href="#how-it-works"
              className="nav-cta btn-primary"
              style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
            >
              Try Aivora
            </a>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="nav-hamburger"
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "var(--radius-md)",
                background: "transparent",
                border: "1px solid var(--border-default)",
                cursor: "pointer",
                color: "var(--text-primary)",
                transition: "background 150ms",
              }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "var(--bg-base)",
            borderBottom: "1px solid var(--border-default)",
            padding: "1rem 1.5rem 1.5rem",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <nav
            style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  transition: "background 150ms",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
              <a
                href="#how-it-works"
                onClick={closeMobile}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Try Aivora
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Responsive + hover styles */}
      <style>{`
        .nav-link:hover {
          color: var(--text-primary) !important;
          background: var(--bg-subtle) !important;
        }
        .theme-toggle:hover {
          background: var(--bg-muted) !important;
          color: var(--text-primary) !important;
        }
        /* Mobile first defaults */
        .nav-desktop { display: none !important; }
        .nav-cta { display: none !important; }
        .nav-hamburger { display: flex !important; }
        /* Desktop breakpoint */
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-cta { display: inline-flex !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
