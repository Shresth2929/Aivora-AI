import Link from "next/link";
import { Zap, ExternalLink } from "lucide-react";

const FOOTER_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "GitHub", href: "https://github.com/Shresth2929/Aivora-AI", external: true },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "2.5rem 0",
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            textAlign: "center",
          }}
          className="footer-inner"
        >
          {/* Logo + tagline */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  borderRadius: "var(--radius-sm)",
                  background: "var(--accent)",
                  color: "#fff",
                }}
                aria-hidden
              >
                <Zap size={12} strokeWidth={2.5} />
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Aivora AI
              </span>
            </div>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-tertiary)",
              }}
            >
              Intelligent workflows for ambitious teams.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: "flex",
                gap: "0.25rem",
                flexWrap: "wrap",
                justifyContent: "center",
                listStyle: "none",
              }}
            >
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={
                      link.external
                        ? `${link.label} (opens in new tab)`
                        : link.label
                    }
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.375rem 0.625rem",
                      fontSize: "0.8125rem",
                      color: "var(--text-tertiary)",
                      textDecoration: "none",
                      borderRadius: "var(--radius-sm)",
                      transition: "color 150ms, background 150ms",
                    }}
                    className="footer-link"
                  >
                    {link.external && (
                      <ExternalLink size={11} aria-hidden style={{ opacity: 0.6 }} />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border-subtle)",
              width: "100%",
            }}
          >
            <p>
              Aivora AI is a product concept built for a frontend engineering
              challenge. Not a real commercial product.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--text-primary) !important;
          background: var(--bg-subtle) !important;
        }
        @media (min-width: 640px) {
          .footer-inner {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            text-align: left !important;
          }
          .footer-inner > div:last-child {
            border-top: none !important;
            padding-top: 0 !important;
            width: auto !important;
          }
        }
      `}</style>
    </footer>
  );
}
