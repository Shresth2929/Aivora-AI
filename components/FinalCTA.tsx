"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      className="section"
      aria-label="Call to action — explore Aivora"
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-narrow" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Eyebrow */}
          <span className="eyebrow" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
            Get started
          </span>

          {/* Headline */}
          <h2
            className="text-headline"
            style={{
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
              maxWidth: 520,
              marginInline: "auto",
            }}
          >
            Stop prompting.
            <br />
            Start orchestrating.
          </h2>

          {/* Body */}
          <p
            className="text-subtitle"
            style={{
              color: "var(--text-secondary)",
              maxWidth: 420,
              margin: "0 auto 2.5rem",
            }}
          >
            Turn your next business objective into an intelligent, structured
            workflow — with Aivora.
          </p>

          {/* CTAs */}
          <div
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
              id="final-cta-primary"
              style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}
            >
              Explore Aivora
              <ArrowRight size={16} />
            </a>
            <a
              href="#capabilities"
              className="btn-ghost"
              id="final-cta-secondary"
              style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}
            >
              View capabilities
            </a>
          </div>

          {/* Small print */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              marginTop: "2rem",
            }}
          >
            Product concept. No account required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
