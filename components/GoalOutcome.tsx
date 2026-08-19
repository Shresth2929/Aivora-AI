"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import { EASE_REFINED, DURATIONS } from "@/lib/motion";

const PIPELINE_STEPS = [
  "Understand",
  "Research",
  "Analyze",
  "Prioritize",
  "Recommend",
];

export default function GoalOutcome() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // -1: idle, 0-4: steps, 5: outcome (emphasized), then loops
  const [activeStep, setActiveStep] = useState(-1);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    
    let currentStep = -1;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep > PIPELINE_STEPS.length) {
        // Outcome emphasized for 1.2 seconds, then loop
        if (!hasCompleted) {
          setHasCompleted(true);
        }
        currentStep = -1; // Reset for next cycle
      }
      setActiveStep(currentStep);
    }, 450); // Slightly longer per step for better perception

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion, hasCompleted]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.reveal, delay: i * 0.1, ease: EASE_REFINED },
    }),
  };

  return (
    <section
      ref={ref}
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
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
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
          </motion.div>
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
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              border: activeStep >= 0 ? "1px solid var(--accent-muted)" : "1px solid var(--border-default)",
              boxShadow: activeStep >= 0 ? "0 4px 12px 0 rgb(91 91 214 / 0.1)" : "var(--shadow-sm)",
            } : {
              opacity: 0,
              y: 30,
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-sm)",
            }}
            transition={{ duration: DURATIONS.normal }}
            className="card"
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            style={{ 
              padding: "1.75rem",
              position: "relative"
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
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="goal-arrow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}
          >
            <motion.div
              animate={{
                x: activeStep >= 0 && !shouldReduceMotion ? [0, 4, 0] : 0
              }}
              transition={{ duration: 1.2, repeat: activeStep >= 0 ? Infinity : 0, ease: "easeInOut" }}
            >
              <ArrowRight
                size={22}
                color={activeStep >= 0 ? "var(--accent)" : "var(--border-strong)"}
                strokeWidth={1.5}
                style={{ transition: "color 400ms" }}
                aria-hidden
              />
            </motion.div>
          </motion.div>

          {/* Pipeline card */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="card"
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            style={{
              padding: "1.75rem",
              border: "1px solid var(--accent-muted)",
              background: "var(--accent-subtle)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Aivora Engine
              </div>
              <div
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  background: "color-mix(in srgb, var(--accent) 15%, var(--bg-surface))",
                  padding: "0.15rem 0.45rem",
                  borderRadius: "var(--radius-full)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {activeStep >= 0 && activeStep < PIPELINE_STEPS.length ? `Step ${activeStep + 1}/5` : "Active"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {PIPELINE_STEPS.map((step, i) => {
                const isActive = activeStep === i;
                const isPast = activeStep > i;
                
                return (
                  <div key={step}>
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { y: -1 }}
                      animate={{
                        backgroundColor: isActive 
                          ? "color-mix(in srgb, var(--accent) 15%, var(--bg-surface))" 
                          : isPast
                            ? "color-mix(in srgb, var(--accent) 5%, var(--bg-surface))"
                            : "var(--bg-surface)",
                        borderColor: isActive ? "var(--accent)" : "var(--accent-muted)",
                        scale: isActive && !shouldReduceMotion ? 1.02 : 1,
                        boxShadow: isActive && !shouldReduceMotion 
                          ? "0 2px 8px 0 rgb(91 91 214 / 0.1)"
                          : "none"
                      }}
                      transition={{ duration: DURATIONS.fast, ease: EASE_REFINED }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--accent-muted)",
                      }}
                    >
                      <motion.span
                        animate={{
                          backgroundColor: (isActive || isPast) ? "var(--accent)" : "var(--bg-muted)",
                          color: (isActive || isPast) ? "#fff" : "var(--text-tertiary)"
                        }}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                        aria-hidden
                      >
                        {i + 1}
                      </motion.span>
                      <motion.span
                        animate={{
                          color: isActive ? "var(--text-primary)" : isPast ? "var(--accent)" : "var(--text-tertiary)"
                        }}
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                        }}
                      >
                        {step}
                      </motion.span>
                    </motion.div>
                    {i < PIPELINE_STEPS.length - 1 && (
                      <motion.div
                        animate={{
                          backgroundColor: isPast ? "var(--accent)" : "var(--accent-muted)"
                        }}
                        style={{
                          width: 1,
                          height: 8,
                          marginLeft: 29,
                        }}
                        aria-hidden
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Arrow (desktop) */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="goal-arrow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{
                x: activeStep >= PIPELINE_STEPS.length && !shouldReduceMotion ? [0, 4, 0] : 0
              }}
              transition={{ duration: 1.2, repeat: activeStep >= PIPELINE_STEPS.length ? Infinity : 0, ease: "easeInOut" }}
            >
              <ArrowRight
                size={22}
                color={activeStep >= PIPELINE_STEPS.length ? "var(--success)" : "var(--border-strong)"}
                strokeWidth={1.5}
                style={{ transition: "color 400ms" }}
                aria-hidden
              />
            </motion.div>
          </motion.div>

          {/* Outcome card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              borderColor: activeStep >= PIPELINE_STEPS.length 
                ? "var(--success)" 
                : "color-mix(in srgb, var(--success) 25%, var(--border-default))",
              boxShadow: activeStep >= PIPELINE_STEPS.length 
                ? "0 4px 20px 0 rgb(61 154 106 / 0.15)"
                : "var(--shadow-sm)",
              scale: activeStep >= PIPELINE_STEPS.length ? 1.02 : 1,
            } : {
              opacity: 0,
              y: 30,
              scale: 1,
            }}
            transition={{ duration: DURATIONS.normal }}
            className="card"
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            style={{
              padding: "1.75rem",
              border: "1px solid color-mix(in srgb, var(--success) 25%, var(--border-default))",
              position: "relative"
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
              <motion.div
                animate={{
                  scale: activeStep >= PIPELINE_STEPS.length ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle2
                  size={18}
                  color={activeStep >= PIPELINE_STEPS.length ? "var(--success)" : "var(--text-tertiary)"}
                  strokeWidth={2.5}
                  aria-hidden
                />
              </motion.div>
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
