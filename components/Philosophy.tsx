"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PRINCIPLES } from "@/lib/mock-data";
import { Target, GitBranch, Package } from "lucide-react";
import { EASE_REFINED, DURATIONS } from "@/lib/motion";

const PRINCIPLE_ICONS = [Target, GitBranch, Package];

export default function Philosophy() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = shouldReduceMotion ? {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  } : {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.reveal, delay: i * 0.15, ease: EASE_REFINED },
    }),
  };

  return (
    <section
      className="section"
      aria-label="Product philosophy — built around outcomes"
      style={{
        background: "var(--bg-subtle)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container-default">
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(2.5rem, 5vw, 4rem)",
            alignItems: "start",
          }}
          className="philosophy-grid"
        >
          {/* Left: headline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span custom={0} variants={fadeUp} className="eyebrow" style={{ marginBottom: "0.875rem", display: "inline-flex" }}>
              Philosophy
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-headline"
              style={{ color: "var(--text-primary)", marginBottom: "1.25rem" }}
            >
              Built around
              <br />
              <motion.span 
                initial={shouldReduceMotion ? { color: "var(--accent)" } : { color: "var(--text-primary)" }}
                whileInView={{ color: "var(--accent)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1, delay: 0.5, ease: EASE_REFINED }}
              >
                outcomes,
              </motion.span>
              <br />
              not prompts.
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-body"
              style={{ color: "var(--text-secondary)", maxWidth: 380 }}
            >
              Most AI tools are optimized for generating text. Aivora is
              optimized for producing results — structured, actionable, and
              grounded in your actual objective.
            </motion.p>
          </motion.div>

          {/* Right: principles */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {PRINCIPLES.map((principle, i) => {
              const Icon = PRINCIPLE_ICONS[i];
              const isLast = i === PRINCIPLES.length - 1;
              const delayOffset = 3 + i; // Offset for the right column

              return (
                <motion.div
                  key={principle.id}
                  custom={delayOffset}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1.25rem",
                      paddingBottom: isLast ? 0 : "1.75rem",
                      position: "relative",
                    }}
                  >
                    {/* Number + connector */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "var(--radius-sm)",
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border-default)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                        aria-hidden
                      >
                        <Icon size={15} color="var(--accent)" strokeWidth={2} />
                      </div>
                      {!isLast && (
                        <div
                          style={{
                            width: 1,
                            flex: 1,
                            background: "var(--border-default)",
                            marginTop: "0.5rem",
                            minHeight: 24,
                          }}
                          aria-hidden
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ paddingTop: "0.375rem" }}>
                      <div
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          color: "var(--text-tertiary)",
                          letterSpacing: "0.06em",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {principle.number}
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
                        {principle.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.65,
                        }}
                      >
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .philosophy-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
