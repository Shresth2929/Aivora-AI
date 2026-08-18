"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Search,
  GitBranch,
  Zap,
  CheckCircle2,
  Target,
  ArrowRight,
} from "lucide-react";

const HERO_NODES = [
  {
    id: "goal",
    label: "Goal",
    sublabel: "Define your objective",
    icon: Target,
    color: "var(--text-secondary)",
    type: "start",
  },
  {
    id: "agent",
    label: "Aivora Agent",
    sublabel: "Orchestrating workflow",
    icon: Brain,
    color: "var(--accent)",
    type: "core",
  },
  {
    id: "research",
    label: "Research",
    sublabel: "Gathering information",
    icon: Search,
    color: "var(--text-secondary)",
    type: "process",
  },
  {
    id: "reason",
    label: "Reasoning",
    sublabel: "Synthesizing insights",
    icon: GitBranch,
    color: "var(--text-secondary)",
    type: "process",
  },
  {
    id: "action",
    label: "Action",
    sublabel: "Executing decisions",
    icon: Zap,
    color: "var(--text-secondary)",
    type: "process",
  },
  {
    id: "outcome",
    label: "Outcome",
    sublabel: "Actionable deliverable",
    icon: CheckCircle2,
    color: "var(--success)",
    type: "end",
  },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const connectorVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function WorkflowHero() {
  return (
    <motion.div
      variants={containerVariants}
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

        return (
          <div key={node.id} style={{ display: "flex", flexDirection: "column" }}>
            <motion.div
              variants={nodeVariants}
              whileHover={
                isCore
                  ? { scale: 1.02, transition: { duration: 0.2 } }
                  : { x: 3, transition: { duration: 0.15 } }
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                padding: isCore ? "0.875rem 1rem" : "0.625rem 1rem",
                background: isCore
                  ? "var(--accent-subtle)"
                  : isEnd
                    ? "color-mix(in srgb, var(--success) 8%, var(--bg-surface))"
                    : "var(--bg-surface)",
                border: isCore
                  ? "1px solid var(--accent-muted)"
                  : isEnd
                    ? "1px solid color-mix(in srgb, var(--success) 25%, var(--border-default))"
                    : "1px solid var(--border-default)",
                borderRadius: "var(--radius-md)",
                boxShadow: isCore ? "var(--shadow-md)" : "var(--shadow-sm)",
                cursor: "default",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-sm)",
                  background: isCore
                    ? "var(--accent)"
                    : isEnd
                      ? "color-mix(in srgb, var(--success) 15%, var(--bg-subtle))"
                      : "var(--bg-subtle)",
                  flexShrink: 0,
                }}
              >
                <Icon
                  size={15}
                  strokeWidth={isCore ? 2.5 : 2}
                  color={isCore ? "#fff" : node.color}
                />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: isCore ? "var(--accent)" : "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {node.label}
                </div>
                <div
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--text-tertiary)",
                    marginTop: 1,
                  }}
                >
                  {node.sublabel}
                </div>
              </div>
              {isCore && (
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
              {isEnd && (
                <ArrowRight
                  size={14}
                  color="var(--success)"
                  strokeWidth={2}
                  style={{ flexShrink: 0 }}
                  aria-hidden
                />
              )}
            </motion.div>

            {!isLast && (
              <motion.div
                variants={connectorVariants}
                style={{
                  width: 1,
                  height: 20,
                  background:
                    "linear-gradient(to bottom, var(--border-default), var(--border-subtle))",
                  marginLeft: 32,
                  marginTop: -1,
                  marginBottom: -1,
                }}
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
