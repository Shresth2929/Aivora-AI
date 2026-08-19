"use client";
// Navbar — sticky with scroll-blur effect, mobile hamburger, accessible

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Philosophy", href: "#philosophy" },
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
              className="brand-mark"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "0.625rem",
                background: "var(--accent-subtle)",
                border: "1px solid var(--accent-muted)",
                color: "var(--accent)",
                flexShrink: 0,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
              aria-hidden
            >
              <svg viewBox="0 0 28 28" aria-hidden="true" style={{ width: 18, height: 18 }}>
                <path
                  d="M7.5 18.5L13.8 7.5L20.5 18.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.8 14.2H17.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                />
                <path
                  d="M16.3 8.2C18.4 8.2 19.8 9.6 19.8 11.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="20.5" cy="11.8" r="1.9" fill="currentColor" />
              </svg>
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
        .brand-mark {
          transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        .brand-mark:hover,
        .brand-mark:focus-visible {
          transform: translateY(-1px) rotate(-3deg);
          border-color: color-mix(in srgb, var(--accent) 58%, var(--accent-muted));
          box-shadow: 0 6px 18px -10px var(--accent);
        }
        .nav-link {
          position: relative;
          overflow: visible;
          transform: translateY(0);
          transition: color 180ms cubic-bezier(0.22, 1, 0.36, 1), transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0.75rem;
          right: 0.75rem;
          bottom: 0.15rem;
          height: 1.5px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent 0%, var(--accent) 18%, var(--accent) 82%, transparent 100%);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.8;
        }
        .nav-link:hover,
        .nav-link:focus-visible {
          color: var(--text-primary) !important;
          transform: translateY(-1px);
        }
        .nav-link:hover::after,
        .nav-link:focus-visible::after {
          transform: scaleX(1);
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
