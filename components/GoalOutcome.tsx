"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight, CheckCircle2 } from "lucide-react";

const PIPELINE_STEPS = [
  "Understand",
  "Research",
  "Analyze",
  "Prioritize",
  "Recommend",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function GoalOutcome() {
  return (
    <section
      className="section"
      aria-label="From goal to outcome transformation"
      style={{
        background: "var(--bg-subtle)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container-default">
        {/* Header */}
        <div
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <span className="eyebrow" style={{ marginBottom: "0.875rem", display: "inline-flex" }}>
            From goal to outcome
          </span>
          <h2
            className="text-headline"
            style={{ color: "var(--text-primary)", marginBottom: "1rem" }}
          >
            Not a chatbot. An orchestrator.
          </h2>
          <p
            className="text-body"
            style={{
              color: "var(--text-secondary)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Aivora doesn&apos;t just answer questions. It builds and executes a
            structured workflow to turn your objective into an outcome.
          </p>
        </div>

        {/* Three-column transformation */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
            alignItems: "stretch",
          }}
          className="goal-outcome-grid"
        >
          {/* Goal card */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="card"
            style={{ padding: "1.75rem" }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              Goal
            </div>
            <Quote
              size={20}
              color="var(--accent)"
              strokeWidth={1.5}
              style={{ marginBottom: "0.75rem", opacity: 0.7 }}
              aria-hidden
            />
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                fontStyle: "italic",
              }}
            >
              &ldquo;I need to understand where my business can use AI.&rdquo;
            </p>
            <div
              style={{
                marginTop: "1.25rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid var(--border-subtle)",
                fontSize: "0.8125rem",
                color: "var(--text-tertiary)",
              }}
            >
              Natural language input — no template required.
            </div>
          </motion.div>

          {/* Arrow (desktop) */}
          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="goal-arrow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowRight
              size={22}
              color="var(--accent)"
              strokeWidth={1.5}
              aria-hidden
            />
          </motion.div>

          {/* Pipeline card */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="card"
            style={{
              padding: "1.75rem",
              border: "1px solid var(--accent-muted)",
              background: "var(--accent-subtle)",
            }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              Aivora
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {PIPELINE_STEPS.map((step, i) => (
                <div key={step}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      padding: "0.5rem 0.75rem",
                      background: "color-mix(in srgb, var(--accent) 8%, var(--bg-surface))",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--accent-muted)",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      {step}
                    </span>
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        height: 8,
                        background: "var(--accent-muted)",
                        marginLeft: 29,
                      }}
                      aria-hidden
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow (desktop) */}
          <motion.div
            custom={1.5}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="goal-arrow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowRight
              size={22}
              color="var(--success)"
              strokeWidth={1.5}
              aria-hidden
            />
          </motion.div>

          {/* Outcome card */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="card"
            style={{
              padding: "1.75rem",
              border: "1px solid color-mix(in srgb, var(--success) 25%, var(--border-default))",
            }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              Outcome
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <CheckCircle2
                size={18}
                color="var(--success)"
                strokeWidth={2.5}
                aria-hidden
              />
              <span
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                AI Automation Roadmap
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              A structured, prioritized plan identifying your highest-ROI
              automation opportunities — ready to present to stakeholders.
            </p>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-tertiary)",
                paddingTop: "0.875rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              Structured deliverable, not a chat transcript.
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .goal-outcome-grid {
            grid-template-columns: 1fr auto 1fr auto 1fr !important;
            align-items: center !important;
          }
          .goal-arrow {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .goal-arrow {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
