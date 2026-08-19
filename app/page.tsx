"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AgentDemo from "@/components/AgentDemo";
import Capabilities from "@/components/Capabilities";
import GoalOutcome from "@/components/GoalOutcome";
import WorkflowBuilder from "@/components/WorkflowBuilder";
import Philosophy from "@/components/Philosophy";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

// ─── Easter Egg: Konami Code ────────────────────────────────────────────────
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

function EasterEgg({ active, onDismiss }: { active: boolean; onDismiss: () => void }) {
  if (!active) return null;
  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Easter egg activated"
      onClick={onDismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-xl)",
          padding: "2.5rem",
          maxWidth: 400,
          textAlign: "center",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚡</div>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          You found the Konami code.
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}
        >
          ↑ ↑ ↓ ↓ ← → ← → B A — a classic. In a real product, this would
          unlock something useful. For now, you get a respectful nod from the
          Aivora team.
        </p>
        <button
          onClick={onDismiss}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
        >
          Continue orchestrating
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [, setKonamiBuffer] = useState<string[]>([]);
  const [easterEgg, setEasterEgg] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKonamiBuffer((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (
          next.length === KONAMI.length &&
          next.every((k, i) => k === KONAMI[i])
        ) {
          setEasterEgg(true);
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <a
        href="#main-content"
        className="btn-primary"
        style={{
          position: "absolute",
          top: -100,
          left: 16,
          zIndex: 9999,
          transition: "top 200ms",
        }}
        onFocus={(e) => ((e.target as HTMLElement).style.top = "16px")}
        onBlur={(e) => ((e.target as HTMLElement).style.top = "-100px")}
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <AgentDemo />
        <Capabilities />
        <GoalOutcome />
        <WorkflowBuilder />
        <Philosophy />
        <FinalCTA />
      </main>

      <Footer />

      <EasterEgg active={easterEgg} onDismiss={() => setEasterEgg(false)} />
    </div>
  );
}
