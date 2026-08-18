"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDown, CheckCircle2, Target, Bot, Cpu, Brain, FileOutput } from "lucide-react";
import {
  getBuilderWorkflow,
  type GoalType,
  type InputSource,
  type OutputFormat,
} from "@/lib/mock-data";
import { EASE_REFINED, DURATIONS } from "@/lib/motion";

const GOALS: GoalType[] = ["Research", "Analysis", "Marketing", "Operations"];
const INPUTS: InputSource[] = ["Documents", "Web", "APIs", "Data"];
const OUTPUTS: OutputFormat[] = ["Report", "Recommendation", "Action Plan", "Automation"];

const NODE_ICONS: Record<string, React.ElementType> = {
  "start": Target,
  "process": Cpu,
  "decision": Brain,
  "end": FileOutput,
};

type SelectorProps = {
  label: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
};

function Selector({ label, options, selected, onChange }: SelectorProps) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "0.625rem",
        }}
      >
        {label}
      </div>
      <div
        role="group"
        aria-label={label}
        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
      >
        {options.map((opt) => (
          <motion.button
            key={opt}
            onClick={() => onChange(opt)}
            aria-pressed={selected === opt}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: DURATIONS.micro, ease: EASE_REFINED }}
            style={{
              padding: "0.4375rem 0.875rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              border:
                selected === opt
                  ? "1px solid var(--accent-muted)"
                  : "1px solid var(--border-default)",
              background:
                selected === opt ? "var(--accent-subtle)" : "var(--bg-surface)",
              color: selected === opt ? "var(--accent)" : "var(--text-secondary)",
              cursor: "pointer",
              transition: "background 150ms, border-color 150ms, color 150ms, box-shadow 150ms",
              boxShadow: selected === opt ? "0 2px 8px 0 rgb(91 91 214 / 0.1)" : "none",
            }}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function WorkflowBuilder() {
  const shouldReduceMotion = useReducedMotion();
  const [goal, setGoal] = useState<GoalType>("Research");
  const [input, setInput] = useState<InputSource>("Web");
  const [output, setOutput] = useState<OutputFormat>("Report");

  const workflow = getBuilderWorkflow({ goal, input, output });

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: DURATIONS.reveal, ease: EASE_REFINED }}
      className="section"
      aria-label="Interactive workflow builder"
    >
      <div className="container-default">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <span className="eyebrow" style={{ marginBottom: "0.875rem", display: "inline-flex" }}>
            Workflow Builder
          </span>
          <h2
            className="text-headline"
            style={{ color: "var(--text-primary)", marginBottom: "1rem" }}
          >
            Build your workflow.
          </h2>
          <p
            className="text-body"
            style={{ color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto" }}
          >
            Configure a goal, input source, and output format — Aivora assembles
            the workflow automatically.
          </p>
        </div>

        {/* Builder layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            maxWidth: 900,
            margin: "0 auto",
          }}
          className="builder-grid"
        >
          {/* Selectors */}
          <div
            className="card"
            style={{
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <Selector
              label="Goal type"
              options={GOALS}
              selected={goal}
              onChange={(v) => setGoal(v as GoalType)}
            />
            <div style={{ height: 1, background: "var(--border-subtle)" }} aria-hidden />
            <Selector
              label="Input source"
              options={INPUTS}
              selected={input}
              onChange={(v) => setInput(v as InputSource)}
            />
            <div style={{ height: 1, background: "var(--border-subtle)" }} aria-hidden />
            <Selector
              label="Output format"
              options={OUTPUTS}
              selected={output}
              onChange={(v) => setOutput(v as OutputFormat)}
            />

            {/* Summary */}
            <div
              style={{
                padding: "0.875rem",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {goal} workflow
              </strong>{" "}
              drawing from{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {input.toLowerCase()}
              </strong>{" "}
              and producing a{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {output.toLowerCase()}
              </strong>
              .
            </div>
          </div>

          {/* Workflow diagram */}
          <div
            className="card"
            style={{
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden", // prevent layout shift weirdness
            }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Generated workflow
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 280,
                position: "relative"
              }}
            >
              <AnimatePresence mode="popLayout">
                {workflow.nodes.map((node, i) => {
                  const Icon = NODE_ICONS[node.type] ?? Cpu;
                  const isStart = node.type === "start";
                  const isEnd = node.type === "end";
                  const isDecision = node.type === "decision";
                  const isLast = i === workflow.nodes.length - 1;
                  
                  // Use label + type as a stable key so React/Framer knows when nodes actually change
                  const nodeKey = `${node.type}-${node.label}`;

                  return (
                    <motion.div
                      layout={!shouldReduceMotion}
                      key={nodeKey}
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: DURATIONS.normal, ease: EASE_REFINED }}
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                      style={{ 
                        width: "100%", 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        zIndex: workflow.nodes.length - i
                      }}
                    >
                      <motion.div
                        layout={!shouldReduceMotion}
                        whileHover={shouldReduceMotion ? {} : { y: -2 }}
                        transition={{ duration: DURATIONS.micro, ease: EASE_REFINED }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.625rem 1rem",
                          width: "100%",
                          background: isStart
                            ? "var(--bg-subtle)"
                            : isEnd
                              ? "color-mix(in srgb, var(--success) 8%, var(--bg-surface))"
                              : isDecision
                                ? "var(--accent-subtle)"
                                : "var(--bg-surface)",
                          border: isStart
                            ? "1px solid var(--border-default)"
                            : isEnd
                              ? "1px solid color-mix(in srgb, var(--success) 25%, var(--border-default))"
                              : isDecision
                                ? "1px solid var(--accent-muted)"
                                : "1px solid var(--border-default)",
                          borderRadius: "var(--radius-md)",
                          boxShadow: isDecision ? "0 2px 8px 0 rgb(91 91 214 / 0.1)" : "var(--shadow-sm)",
                          transition: "box-shadow 300ms",
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
                            background: isEnd
                              ? "color-mix(in srgb, var(--success) 15%, var(--bg-muted))"
                              : isDecision
                                ? "var(--accent)"
                                : "var(--bg-muted)",
                            flexShrink: 0,
                          }}
                        >
                          {isEnd ? (
                            <CheckCircle2 size={13} color="var(--success)" strokeWidth={2.5} />
                          ) : (
                            <Icon
                              size={13}
                              color={isDecision ? "#fff" : "var(--text-secondary)"}
                              strokeWidth={2}
                            />
                          )}
                        </span>
                        <div>
                          <div
                            style={{
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              color: isDecision
                                ? "var(--accent)"
                                : isEnd
                                  ? "var(--success)"
                                  : "var(--text-primary)",
                            }}
                          >
                            {node.label}
                          </div>
                          <div
                            style={{
                              fontSize: "0.6875rem",
                              color: "var(--text-tertiary)",
                            }}
                          >
                            {node.sublabel}
                          </div>
                        </div>
                      </motion.div>
                      {!isLast && (
                        <motion.div
                          layout={!shouldReduceMotion}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 20, opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: DURATIONS.fast, ease: "easeOut" }}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            overflow: "hidden"
                          }}
                        >
                          <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <ArrowDown
                              size={14}
                              color={isDecision ? "var(--accent)" : "var(--border-strong)"}
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .builder-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
