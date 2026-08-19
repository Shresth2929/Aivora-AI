"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Search,
  GitBranch,
  Zap,
  CheckCircle2,
  Target,
  ArrowRight,
} from "lucide-react";
import { EASE_REFINED, DURATIONS } from "@/lib/motion";

const HERO_NODES = [
  {
    id: "goal",
    label: "Goal",
    sublabel: "Define your objective",
    detail: "Parses natural intent",
    icon: Target,
    color: "var(--text-secondary)",
    type: "start",
  },
  {
    id: "agent",
    label: "Aivora Agent",
    sublabel: "Orchestrating workflow",
    detail: "Decomposes execution graph",
    icon: Brain,
    color: "var(--accent)",
    type: "core",
  },
  {
    id: "research",
    label: "Research",
    sublabel: "Gathering information",
    detail: "Aggregates contextual signals",
    icon: Search,
    color: "var(--text-secondary)",
    type: "process",
  },
  {
    id: "reason",
    label: "Reasoning",
    sublabel: "Synthesizing insights",
    detail: "Evaluates choices & trade-offs",
    icon: GitBranch,
    color: "var(--text-secondary)",
    type: "process",
  },
  {
    id: "action",
    label: "Action",
    sublabel: "Executing decisions",
    detail: "Runs structured steps",
    icon: Zap,
    color: "var(--text-secondary)",
    type: "process",
  },
  {
    id: "outcome",
    label: "Outcome",
    sublabel: "Actionable deliverable",
    detail: "Delivers verified result",
    icon: CheckCircle2,
    color: "var(--success)",
    type: "end",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.reveal, ease: EASE_REFINED },
  },
};

const connectorVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: DURATIONS.normal, ease: EASE_REFINED },
  },
};

export default function WorkflowHero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, 800);

    return () => clearTimeout(startTimer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !hasStarted || hoveredIndex !== null) return;

    const totalNodes = HERO_NODES.length;
    let timer: NodeJS.Timeout;

    const cycle = () => {
      setActiveIndex((prev) => {
        if (prev >= totalNodes) return -1;
        return prev + 1;
      });
    };

    if (activeIndex === totalNodes) {
      timer = setTimeout(cycle, 1200);
    } else {
      timer = setTimeout(cycle, 550);
    }

    return () => clearTimeout(timer);
  }, [activeIndex, hoveredIndex, shouldReduceMotion, hasStarted]);

  const effectiveActive = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="AI workflow visualization showing Goal to Outcome steps"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 0,
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
      }}
    >
      {HERO_NODES.map((node, i) => {
        const Icon = node.icon;
        const isCore = node.type === "core";
        const isEnd = node.type === "end";
        const isLast = i === HERO_NODES.length - 1;
        const isActive = i === effectiveActive;
        const isHovered = i === hoveredIndex;

        // Dim unrelated nodes when hovering
        const isDimmed = hoveredIndex !== null && Math.abs(hoveredIndex - i) > 1;

        const bg = isCore
          ? "var(--accent-subtle)"
          : isEnd
            ? "color-mix(in srgb, var(--success) 8%, var(--bg-surface))"
            : "var(--bg-surface)";

        const border = isCore
          ? "1px solid var(--accent-muted)"
          : isEnd
            ? "1px solid color-mix(in srgb, var(--success) 25%, var(--border-default))"
            : "1px solid var(--border-default)";

        const activeBg = isCore
          ? "color-mix(in srgb, var(--accent) 18%, var(--bg-surface))"
          : isEnd
            ? "color-mix(in srgb, var(--success) 18%, var(--bg-surface))"
            : "var(--bg-subtle)";
        
        const activeBorder = isCore
          ? "1px solid var(--accent)"
          : isEnd
            ? "1px solid var(--success)"
            : "1px solid var(--border-strong)";

        return (
          <div key={node.id} style={{ display: "flex", flexDirection: "column" }}>
            <motion.div
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(i)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
              role="button"
              aria-label={`${node.label} step: ${node.sublabel}`}
              variants={nodeVariants}
              animate={{
                backgroundColor: isActive ? activeBg : bg,
                borderColor: isActive ? activeBorder.replace("1px solid ", "") : border.replace("1px solid ", ""),
                opacity: isDimmed ? 0.55 : 1,
                scale: isHovered && !shouldReduceMotion ? 1.02 : 1,
                boxShadow: isActive
                  ? isCore ? "0 4px 20px 0 rgb(91 91 214 / 0.18)" 
                    : isEnd ? "0 4px 20px 0 rgb(61 154 106 / 0.18)"
                    : "var(--shadow-md)"
                  : isCore ? "var(--shadow-md)"
                  : "var(--shadow-sm)",
              }}
              transition={{ duration: DURATIONS.normal, ease: EASE_REFINED }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                padding: isCore ? "0.875rem 1rem" : "0.625rem 1rem",
                backgroundColor: bg,
                border,
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                position: "relative",
                outline: "none",
              }}
            >
              <motion.span
                animate={{
                  scale: isActive ? 1.08 : 1,
                  backgroundColor: isActive && !isCore && !isEnd ? "color-mix(in srgb, var(--accent) 12%, var(--bg-subtle))" : 
                    isCore ? "var(--accent)" : isEnd ? "color-mix(in srgb, var(--success) 18%, var(--bg-subtle))" : "var(--bg-subtle)"
                }}
                transition={{ duration: DURATIONS.fast }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-sm)",
                  flexShrink: 0,
                }}
              >
                <Icon
                  size={15}
                  strokeWidth={isCore || isActive ? 2.5 : 2}
                  color={isCore ? "#fff" : isActive ? "var(--accent)" : node.color}
                />
              </motion.span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: isCore ? "var(--accent)" : isActive ? "var(--text-primary)" : "var(--text-primary)",
                      letterSpacing: "-0.01em",
                      transition: "color 200ms ease",
                    }}
                  >
                    {node.label}
                  </span>
                  {isHovered && (
                    <span
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--accent)",
                        background: "var(--accent-subtle)",
                        padding: "0.125rem 0.375rem",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      Inspecting
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "0.6875rem",
                    color: isActive ? "var(--text-secondary)" : "var(--text-tertiary)",
                    marginTop: 1,
                    transition: "color 200ms ease",
                  }}
                >
                  {isHovered ? node.detail : node.sublabel}
                </div>
              </div>
              
              {/* Core agent pulse */}
              {isCore && (
                <motion.span
                  animate={
                    shouldReduceMotion ? {} :
                    { 
                      opacity: isActive ? [0.6, 1, 0.6] : [0.2, 0.5, 0.2],
                      scale: isActive ? [1, 1.25, 1] : 1 
                    }
                  }
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
              
              {/* Outcome status arrow */}
              {isEnd && (
                <motion.div
                  animate={{ 
                    scale: isActive ? [1, 1.15, 1] : 1,
                    opacity: isActive ? 1 : 0.7
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <ArrowRight
                    size={14}
                    color="var(--success)"
                    strokeWidth={isActive ? 2.5 : 2}
                    style={{ flexShrink: 0 }}
                    aria-hidden
                  />
                </motion.div>
              )}
            </motion.div>

            {!isLast && (
              <motion.div
                variants={connectorVariants}
                animate={{
                  background: isActive || (hoveredIndex !== null && hoveredIndex === i + 1)
                    ? "linear-gradient(to bottom, var(--border-default), var(--accent))"
                    : "linear-gradient(to bottom, var(--border-default), var(--border-subtle))",
                  opacity: isDimmed ? 0.3 : 1
                }}
                transition={{ duration: DURATIONS.normal }}
                style={{
                  width: 2,
                  height: 20,
                  background:
                    "linear-gradient(to bottom, var(--border-default), var(--border-subtle))",
                  marginLeft: 31,
                  marginTop: -1,
                  marginBottom: -1,
                  position: "relative",
                  overflow: "hidden"
                }}
                aria-hidden
              >
                {!shouldReduceMotion && (isActive || hoveredIndex === i) && (
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, height: "100%",
                      background: isCore || (i < HERO_NODES.length - 1 && HERO_NODES[i + 1].type !== "end")
                        ? "linear-gradient(to bottom, transparent, var(--accent), transparent)"
                        : "linear-gradient(to bottom, transparent, var(--success), transparent)",
                    }}
                  />
                )}
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
