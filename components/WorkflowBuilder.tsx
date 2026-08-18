"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, CheckCircle2, Target, Bot, Cpu, Brain, FileOutput } from "lucide-react";
import {
  getBuilderWorkflow,
  type GoalType,
  type InputSource,
  type OutputFormat,
} from "@/lib/mock-data";

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
          <button
            key={opt}
            onClick={() => onChange(opt)}
            aria-pressed={selected === opt}
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
              transition: "background 150ms, border-color 150ms, color 150ms",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function WorkflowBuilder() {
  const [goal, setGoal] = useState<GoalType>("Research");
  const [input, setInput] = useState<InputSource>("Web");
  const [output, setOutput] = useState<OutputFormat>("Report");

  const workflow = getBuilderWorkflow({ goal, input, output });

  return (
    <section
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

            <AnimatePresence mode="wait">
              <motion.div
                key={`${goal}-${input}-${output}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: 280,
                }}
              >
                {workflow.nodes.map((node, i) => {
                  const Icon = NODE_ICONS[node.type] ?? Cpu;
                  const isStart = node.type === "start";
                  const isEnd = node.type === "end";
                  const isDecision = node.type === "decision";
                  const isLast = i === workflow.nodes.length - 1;

                  return (
                    <div key={i} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.35 }}
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
                          boxShadow: "var(--shadow-sm)",
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
                        <ArrowDown
                          size={14}
                          color="var(--text-tertiary)"
                          strokeWidth={1.5}
                          style={{ margin: "0.25rem 0" }}
                          aria-hidden
                        />
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
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
    </section>
  );
}
