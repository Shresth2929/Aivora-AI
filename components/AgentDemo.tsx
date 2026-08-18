"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Brain,
  Search,
  BarChart3,
  Lightbulb,
  FileText,
  Tag,
  ArrowUpNarrowWide,
  ScanSearch,
  Workflow,
  SlidersHorizontal,
  ListOrdered,
  MessageSquare,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { DEMO_GOALS, type DemoGoal, type WorkflowStep } from "@/lib/mock-data";
import { EASE_REFINED, DURATIONS } from "@/lib/motion";

// Icon map for step icons
const ICON_MAP: Record<string, React.ElementType> = {
  brain: Brain,
  search: Search,
  "bar-chart": BarChart3,
  lightbulb: Lightbulb,
  "file-text": FileText,
  tag: Tag,
  "arrow-up-narrow-wide": ArrowUpNarrowWide,
  "scan-search": ScanSearch,
  split: ChevronRight,
  workflow: Workflow,
  "sliders-horizontal": SlidersHorizontal,
  "list-ordered": ListOrdered,
  "messages-square": MessageSquare,
};

type DemoState = "idle" | "running" | "complete";

function StepItem({
  step,
  status,
  shouldReduceMotion
}: {
  step: WorkflowStep;
  status: "pending" | "active" | "done";
  shouldReduceMotion: boolean | null;
}) {
  const Icon = ICON_MAP[step.icon] ?? Brain;

  return (
    <motion.div
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: DURATIONS.normal, ease: EASE_REFINED }}
      whileHover={shouldReduceMotion ? {} : {
        y: -1,
        transition: { duration: DURATIONS.micro, ease: EASE_REFINED }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.625rem 0.875rem",
        borderRadius: "var(--radius-md)",
        background:
          status === "active"
            ? "var(--accent-subtle)"
            : status === "done"
              ? "color-mix(in srgb, var(--success) 6%, var(--bg-surface))"
              : "var(--bg-subtle)",
        border:
          status === "active"
            ? "1px solid var(--accent-muted)"
            : status === "done"
              ? "1px solid color-mix(in srgb, var(--success) 20%, var(--border-default))"
              : "1px solid var(--border-subtle)",
        boxShadow:
          status === "active"
            ? "0 2px 8px 0 rgb(91 91 214 / 0.1)"
            : "none",
        transform: status === "active" && !shouldReduceMotion ? "scale(1.01)" : "scale(1)",
        transformOrigin: "left center",
        transition: "background 300ms, border-color 300ms, box-shadow 300ms, transform 300ms",
      }}
    >
      {/* Icon */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "var(--radius-sm)",
          background:
            status === "active"
              ? "var(--accent)"
              : status === "done"
                ? "color-mix(in srgb, var(--success) 15%, var(--bg-muted))"
                : "var(--bg-muted)",
          flexShrink: 0,
          transition: "background 300ms",
        }}
      >
        {status === "done" ? (
          <motion.div
            initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle2 size={13} color="var(--success)" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div
            animate={status === "active" && !shouldReduceMotion ? { rotate: 360 } : { rotate: 0 }}
            transition={
              status === "active"
                ? { duration: 2, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 }
            }
          >
            <Icon
              size={13}
              color={status === "active" ? "#fff" : "var(--text-tertiary)"}
              strokeWidth={status === "active" ? 2.5 : 2}
            />
          </motion.div>
        )}
      </span>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color:
              status === "active"
                ? "var(--accent)"
                : status === "done"
                  ? "var(--success)"
                  : "var(--text-primary)",
            transition: "color 300ms",
          }}
        >
          {step.label}
        </div>
        <div
          style={{
            fontSize: "0.6875rem",
            color:
              status === "active"
                ? "var(--text-secondary)"
                : "var(--text-tertiary)",
            marginTop: 2,
            transition: "color 300ms",
          }}
        >
          {step.description}
        </div>
      </div>

      {/* Status indicator */}
      {status === "active" && !shouldReduceMotion && (
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
            flexShrink: 0,
          }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}

export default function AgentDemo() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedGoal, setSelectedGoal] = useState<DemoGoal | null>(null);
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const runDemo = useCallback((goal: DemoGoal) => {
    clearTimeouts();
    setDemoState("running");
    setActiveStep(0);
    setCompletedSteps(new Set());

    let elapsed = 0;
    goal.steps.forEach((step, i) => {
      // Mark step as active
      const startT = setTimeout(() => {
        setActiveStep(i);
      }, elapsed);
      timeoutsRef.current.push(startT);

      // Increase step duration slightly for better pacing and comprehension
      elapsed += step.duration + (shouldReduceMotion ? 0 : 200);

      // Mark step as done
      const endT = setTimeout(() => {
        setCompletedSteps((prev) => new Set([...prev, i]));
        if (i === goal.steps.length - 1) {
          setActiveStep(-1);
          setDemoState("complete");
        } else {
          setActiveStep(i + 1);
        }
      }, elapsed);
      timeoutsRef.current.push(endT);
    });
  }, [shouldReduceMotion]);

  const handleGoalSelect = (goal: DemoGoal) => {
    if (demoState === "running") return;
    setSelectedGoal(goal);
    // Auto-run when a goal is selected to reduce friction
    runDemo(goal);
  };

  const handleRun = () => {
    if (selectedGoal && demoState !== "running") {
      runDemo(selectedGoal);
    }
  };

  const handleReset = () => {
    clearTimeouts();
    setDemoState("idle");
    setSelectedGoal(null);
    setActiveStep(-1);
    setCompletedSteps(new Set());
  };

  useEffect(() => () => clearTimeouts(), []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: DURATIONS.reveal, ease: EASE_REFINED }}
      id="how-it-works"
      className="section"
      aria-label="Interactive AI workflow demonstration"
      style={{
        background: "var(--bg-subtle)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container-default">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <span className="eyebrow" style={{ marginBottom: "0.875rem", display: "inline-flex" }}>
            Live Demo
          </span>
          <h2 className="text-headline" style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>
            See Aivora think in workflows.
          </h2>
          <p
            className="text-body"
            style={{ color: "var(--text-secondary)", maxWidth: 480, margin: "0 auto" }}
          >
            Select a goal and watch the agent build and execute a structured
            workflow — step by step.
          </p>
          <p
            style={{
              fontSize: "0.6875rem",
              color: "var(--text-tertiary)",
              marginTop: "0.5rem",
              letterSpacing: "0.02em",
            }}
          >
            This is a frontend prototype — no external AI processing occurs.
          </p>
        </div>

        {/* Goal selector */}
        <div
          role="radiogroup"
          aria-label="Select a demo goal"
          style={{
            display: "flex",
            gap: "0.625rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          {DEMO_GOALS.map((goal) => (
            <motion.button
              key={goal.id}
              role="radio"
              aria-checked={selectedGoal?.id === goal.id}
              onClick={() => handleGoalSelect(goal)}
              disabled={demoState === "running"}
              whileHover={demoState === "running" ? {} : { y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: DURATIONS.micro, ease: EASE_REFINED }}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                border:
                  selectedGoal?.id === goal.id
                    ? "1px solid var(--accent-muted)"
                    : "1px solid var(--border-default)",
                background:
                  selectedGoal?.id === goal.id
                    ? "var(--accent-subtle)"
                    : "var(--bg-surface)",
                color:
                  selectedGoal?.id === goal.id
                    ? "var(--accent)"
                    : "var(--text-secondary)",
                cursor: demoState === "running" ? "not-allowed" : "pointer",
                transition: "background 200ms, border-color 200ms, color 200ms",
                opacity: demoState === "running" ? 0.6 : 1,
              }}
            >
              {goal.label}
            </motion.button>
          ))}
        </div>

        {/* Main demo panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {/* Left: workflow steps */}
          <div
            className="card"
            style={{ padding: "1.5rem" }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "0.25rem",
                  }}
                >
                  Goal Input
                </div>
                <div
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {selectedGoal
                    ? `"${selectedGoal.description}"`
                    : "Select a goal above to begin"}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                {demoState !== "idle" && (
                  <button
                    onClick={handleReset}
                    aria-label="Reset demo"
                    className="btn-ghost"
                    style={{ padding: "0.4375rem 0.75rem", fontSize: "0.75rem" }}
                  >
                    <RotateCcw size={13} />
                    Reset
                  </button>
                )}
                <button
                  onClick={handleRun}
                  disabled={!selectedGoal || demoState === "running"}
                  aria-label="Run workflow"
                  className="btn-primary"
                  style={{
                    padding: "0.4375rem 0.875rem",
                    fontSize: "0.8125rem",
                    opacity: !selectedGoal || demoState === "running" ? 0.5 : 1,
                    cursor:
                      !selectedGoal || demoState === "running"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <Sparkles size={13} />
                  {demoState === "running"
                    ? "Running…"
                    : demoState === "complete"
                      ? "Run again"
                      : "Run workflow"}
                </button>
              </div>
            </div>

            {/* Steps */}
            <AnimatePresence mode="popLayout">
              {selectedGoal ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                >
                  {selectedGoal.steps.map((step, i) => {
                    const status =
                      completedSteps.has(i)
                        ? "done"
                        : activeStep === i
                          ? "active"
                          : "pending";
                    return (
                      <div key={step.id}>
                        <StepItem step={step} status={status} shouldReduceMotion={shouldReduceMotion} />
                        {i < selectedGoal.steps.length - 1 && (
                          <motion.div
                            animate={{
                              background: completedSteps.has(i)
                                ? "color-mix(in srgb, var(--success) 40%, var(--accent-muted))"
                                : activeStep === i
                                  ? "linear-gradient(to bottom, var(--accent), transparent)"
                                  : "var(--border-subtle)",
                            }}
                            transition={{ duration: DURATIONS.normal }}
                            style={{
                              width: 2,
                              height: 12,
                              marginLeft: 21,
                              borderRadius: 1,
                            }}
                            aria-hidden
                          />
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "3rem 1rem",
                    color: "var(--text-tertiary)",
                    fontSize: "0.875rem",
                    textAlign: "center",
                    gap: "0.75rem",
                  }}
                >
                  <Brain size={32} strokeWidth={1.5} color="var(--text-tertiary)" />
                  <p>Choose a goal to see a workflow in action.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result card */}
          <AnimatePresence>
            {demoState === "complete" && selectedGoal && (
              <motion.div
                key="result"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: DURATIONS.reveal, ease: EASE_REFINED }}
                className="card"
                style={{
                  padding: "1.5rem",
                  border: "1px solid color-mix(in srgb, var(--success) 25%, var(--border-default))",
                }}
              >
                {/* Result header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    marginBottom: "1rem",
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
                      background: "color-mix(in srgb, var(--success) 15%, var(--bg-subtle))",
                    }}
                  >
                    <CheckCircle2 size={14} color="var(--success)" strokeWidth={2.5} />
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        color: "var(--success)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Workflow complete
                    </div>
                    <div
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {selectedGoal.result.title}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "1rem",
                  }}
                >
                  {selectedGoal.result.summary}
                </p>

                {/* Insights */}
                <div
                  style={{
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.875rem 1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--text-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "0.625rem",
                    }}
                  >
                    Key Insights
                  </div>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4375rem",
                      listStyle: "none",
                    }}
                  >
                    {selectedGoal.result.insights.map((insight, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.8125rem",
                          color: "var(--text-primary)",
                          lineHeight: 1.5,
                        }}
                      >
                        <ChevronRight
                          size={12}
                          color="var(--accent)"
                          style={{ marginTop: 3, flexShrink: 0 }}
                          aria-hidden
                        />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next action */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.625rem",
                    padding: "0.75rem",
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--accent-muted)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <Lightbulb
                    size={14}
                    color="var(--accent)"
                    style={{ flexShrink: 0, marginTop: 2 }}
                    aria-hidden
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "0.125rem",
                      }}
                    >
                      Recommended next action
                    </div>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {selectedGoal.result.nextAction}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          [aria-label="Interactive AI workflow demonstration"] .container-default > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
