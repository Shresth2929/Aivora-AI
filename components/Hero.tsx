"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import WorkflowHero from "./WorkflowHero";
import { EASE_REFINED, DURATIONS } from "@/lib/motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  /**
   * Orchestrated entrance animation
   * Sequence: Eyebrow → Headline → Subtitle → CTAs → Workflow → Disclaimer
   * Total duration: ~1000-1200ms
   * Feels like: product coming online, not intro animation
   */
  const safeFadeUp = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: (delay: number = 0) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATIONS.reveal,
            delay,
            ease: EASE_REFINED,
          },
        }),
      };

  return (
    <section
      aria-label="Hero — Aivora AI value proposition"
      style={{
        paddingTop: "clamp(6rem, 12vw, 9rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle background grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, color-mix(in srgb, var(--accent) 4%, transparent) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--accent) 3%, transparent) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      <div
        className="container-wide"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(3rem, 6vw, 5rem)",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left: Copy */}
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <motion.div
            custom={0.1} // Eyebrow starts early (100ms)
            variants={safeFadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  marginRight: "0.375rem",
                }}
                aria-hidden
              />
              AI Workflow Orchestration
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={0.2} // Headline at 200ms
            variants={safeFadeUp}
            initial="hidden"
            animate="visible"
            className="text-display"
            style={{
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            Turn ambitious goals
            <br />
            into intelligent action.
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            custom={0.3} // Subtitle at 300ms
            variants={safeFadeUp}
            initial="hidden"
            animate="visible"
            className="text-subtitle"
            style={{
              color: "var(--text-secondary)",
              maxWidth: 520,
              margin: "0 auto 2.5rem",
            }}
          >
            Aivora transforms natural-language goals into intelligent workflows
            that research, reason, decide, and execute — so your team can focus
            on what actually matters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.4} // CTAs at 400ms
            variants={safeFadeUp}
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#how-it-works"
              className="btn-primary"
              id="hero-cta-primary"
              style={{ padding: "0.75rem 1.5rem", fontSize: "0.9375rem" }}
            >
              Explore Aivora
              <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="btn-ghost"
              id="hero-cta-secondary"
              style={{ padding: "0.75rem 1.5rem", fontSize: "0.9375rem" }}
            >
              See how it works
              <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Disclaimer badge */}
          <motion.p
            custom={0.65} // Disclaimer at 650ms
            variants={safeFadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            Product concept demo — no sign-up required.
          </motion.p>
        </div>

        {/* Right: Workflow visualization */}
        <motion.div
          custom={0.5} // Workflow at 500ms (overlaps with CTAs slightly for fluidity)
          variants={safeFadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-xl)",
              padding: "1.5rem",
              boxShadow: "var(--shadow-lg)",
              width: "100%",
              maxWidth: 360,
            }}
          >
            {/* Mini header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.25rem",
                paddingBottom: "0.875rem",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  gap: "0.375rem",
                }}
                aria-hidden
              >
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span
                    key={c}
                    style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
                  />
                ))}
              </span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--text-tertiary)",
                  fontWeight: 500,
                  marginLeft: "0.25rem",
                  letterSpacing: "0.02em",
                }}
              >
                aivora workflow
              </span>
            </div>
            <WorkflowHero />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          [aria-label="Hero — Aivora AI value proposition"] > div {
            grid-template-columns: 1fr 1fr !important;
          }
          [aria-label="Hero — Aivora AI value proposition"] > div > div:first-child {
            text-align: left !important;
          }
          [aria-label="Hero — Aivora AI value proposition"] > div > div:first-child p {
            margin-left: 0 !important;
          }
          [aria-label="Hero — Aivora AI value proposition"] > div > div:first-child > div[style*="justify-content: center"] {
            justify-content: flex-start !important;
          }
          [aria-label="Hero — Aivora AI value proposition"] > div > div:first-child > p {
            text-align: left !important;
          }
          [aria-label="Hero — Aivora AI value proposition"] > div > div:first-child {
            margin: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
