"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE_REFINED, DURATIONS } from "@/lib/motion";

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

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

      {/* Restrained animated line/signal tying back to the workflow concept */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DURATIONS.complex, ease: EASE_REFINED, delay: 0.3 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 600,
            height: 1,
            background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)",
            zIndex: 0,
          }}
        >
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: -1,
              left: 0,
              width: "50%",
              height: 3,
              background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
              opacity: 0.3,
            }}
          />
        </motion.div>
      )}

      <div className="container-narrow" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: DURATIONS.reveal, ease: EASE_REFINED }}
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
            <motion.a
              whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: DURATIONS.fast, ease: EASE_REFINED } }}
              href="#how-it-works"
              className="btn-primary"
              id="final-cta-primary"
              style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}
            >
              Explore Aivora
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: DURATIONS.fast, ease: EASE_REFINED } }}
              href="#capabilities"
              className="btn-ghost"
              id="final-cta-secondary"
              style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}
            >
              View capabilities
            </motion.a>
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
