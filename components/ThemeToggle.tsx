"use client";

import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aivora-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (stored === "dark" || (!stored && prefersDark)) {
        document.documentElement.classList.add("dark");
      } else if (stored === "light") {
        document.documentElement.classList.remove("dark");
      }
    } catch {}
  }, []);

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("aivora-theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "var(--radius-full)",
        background: "var(--bg-subtle)",
        border: "1px solid var(--border-default)",
        cursor: "pointer",
        color: "var(--text-secondary)",
        transition: "background 200ms, color 200ms, border-color 200ms",
        flexShrink: 0,
      }}
      className="theme-toggle"
    >
      <Sun size={15} strokeWidth={2} className="theme-icon-sun" />
      <Moon size={15} strokeWidth={2} className="theme-icon-moon" />
    </button>
  );
}
