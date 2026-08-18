"use client";

import { motion } from "framer-motion";
import { Bot, GitMerge, Lightbulb, Zap } from "lucide-react";
import { CAPABILITIES } from "@/lib/mock-data";

const ICONS = [Bot, GitMerge, Lightbulb, Zap];

const ACCENT_COLORS: Record<string, string> = {
  indigo: "var(--accent)",
  violet: "#8b5cf6",
  blue: "#3b82f6",
  purple: "#a855f7",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="section"
      aria-label="Product capabilities"
    >
      <div className="container-default">
        {/* Header */}
        <div style={{ maxWidth: 560, marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <span className="eyebrow" style={{ marginBottom: "0.875rem", display: "inline-flex" }}>
            Capabilities
          </span>
          <h2
            className="text-headline"
            style={{ color: "var(--text-primary)", marginBottom: "1rem" }}
          >
            Everything your workflow needs to succeed.
          </h2>
          <p
            className="text-body"
            style={{ color: "var(--text-secondary)" }}
          >
            Aivora combines autonomous agents, structured reasoning, and action
            orchestration into a single coherent platform.
          </p>
        </div>

        {/* Editorial capability grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
        >
          {/* Top row: 2 cols + 1 wide */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
            }}
            className="caps-row-1"
          >
            {CAPABILITIES.slice(0, 2).map((cap, i) => {
              const Icon = ICONS[i];
              const accentColor = ACCENT_COLORS[cap.accent];
              return (
                <motion.div
                  key={cap.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="card"
                  style={{
                    padding: "1.75rem",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Accent stripe */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      background: `color-mix(in srgb, ${accentColor} 12%, var(--bg-subtle))`,
                      marginBottom: "1rem",
                    }}
                    aria-hidden
                  >
                    <Icon size={18} color={accentColor} strokeWidth={2} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.015em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {cap.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom row: 1 wide + 2 cols */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
            }}
            className="caps-row-2"
          >
            {CAPABILITIES.slice(2, 4).map((cap, i) => {
              const actualI = i + 2;
              const Icon = ICONS[actualI];
              const accentColor = ACCENT_COLORS[cap.accent];
              const isWide = i === 0;
              return (
                <motion.div
                  key={cap.id}
                  custom={actualI}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="card"
                  style={{
                    padding: "1.75rem",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                    ...(isWide
                      ? {
                          display: "flex",
                          gap: "1.5rem",
                          alignItems: "flex-start",
                        }
                      : {}),
                  }}
                >
                  {/* Accent stripe */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      background: `color-mix(in srgb, ${accentColor} 12%, var(--bg-subtle))`,
                      marginBottom: isWide ? 0 : "1rem",
                      flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <Icon size={18} color={accentColor} strokeWidth={2} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.015em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {cap.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {cap.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .caps-row-1 { grid-template-columns: 1fr 1fr !important; }
          .caps-row-2 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
