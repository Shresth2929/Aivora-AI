# Aivora AI — Design & Engineering Decisions

## 1. Why this approach over the obvious alternative?

**The decision**: Build a single, highly polished homepage rather than a multi-page application with a dashboard, onboarding flow, or product simulation.

**The reasoning**: The brief is a homepage for a product that does not exist. The most honest and highest-value deliverable within the time constraint is a homepage that communicates the product's value proposition clearly, demonstrates its core workflow logic interactively, and feels premium enough that a real user would want to learn more.

A larger application would introduce several problems:
- **Scope inflation** — adding pages for the sake of size produces mediocre quality everywhere
- **Fabrication risk** — building a full product simulation invites fake complexity (mock APIs, fake dashboards) that was explicitly prohibited
- **Review burden** — a reviewer evaluating this as a homepage challenge wants to see UI craft, not application architecture depth

The chosen scope allows every pixel, interaction, and line of copy to receive proper attention.

**What was chosen instead of the obvious**:
The obvious alternative would have been a Next.js app with multiple routes (dashboard, onboarding, docs) with stubbed functionality. Instead: one page, nine sections, each with distinct visual treatment, real interactivity, and deliberate design rationale.

---

## 2. What trade-off was made under the time limit?

**What was intentionally excluded**:

- **Animation polish** — Framer Motion is used for core choreography (entrance, state transitions, hover), but some micro-interactions (e.g., custom cursor, advanced scroll-linked parallax) were left out to avoid over-engineering
- **Full mobile keyboard testing** — responsive layouts were built with correct media queries and tested visually, but physical device testing was not performed
- **Advanced accessibility audit** — ARIA labels, semantic HTML, focus management, and skip-to-content are implemented, but a full WCAG 2.1 AA audit was not performed
- **Vercel deployment URL** — the project is structured for zero-config Vercel deployment but a live URL was not added to the README

**Given a full week, what would change**:
- Add a genuine Vercel deployment with a custom domain
- Implement scroll-linked animations (section indicators, progress bars)
- Add a proper storybook-style component library alongside the homepage
- Conduct physical mobile device testing (iOS Safari, Android Chrome)
- Perform a full WCAG 2.1 AA audit and remediate findings
- Add keyboard shortcuts (help modal, navigation shortcuts)
- Write unit tests for the state machines in AgentDemo and WorkflowBuilder

---

## 3. Where was AI used?

**AI-assisted**:
- **Component architecture** — Claude suggested the component split (Navbar, Hero, WorkflowHero, AgentDemo, etc.); this was accepted as it aligned with standard Next.js patterns
- **Mock data structure** — the `DemoGoal` and `WorkflowStep` type definitions and demo content were AI-generated and then manually reviewed for tone, honesty, and relevance
- **CSS design tokens** — the initial color token system was AI-suggested; the specific values (bg-base, accent, border tones) were manually tuned for contrast and visual quality
- **Copy** — section headlines and body text were AI-drafted and manually edited to remove generic AI tone
- **Framer Motion choreography** — animation variants were AI-suggested and then manually adjusted for timing and easing

**Manually written or significantly revised**:
- The `AgentDemo` state machine (idle/running/complete with proper cleanup via `useRef` for timeouts)
- The theme system (localStorage + html.dark class + SSR flash prevention)
- All responsive breakpoint decisions
- The decision to use CSS custom properties with `color-mix()` instead of Tailwind utility classes for theme-aware colors (this was a deliberate architectural choice given Tailwind v4's new CSS-native theming model)
- The `DECISIONS.md` content itself

**Rejected AI output**:
- AI initially suggested using `useContext` + a ThemeProvider component. This was rejected in favor of direct DOM manipulation + localStorage because the app has no complex state sharing needs and the simpler approach avoids unnecessary re-renders.
- AI suggested adding a `framer-motion` `LayoutGroup` for the workflow builder. This was rejected because the AnimatePresence mode="wait" approach is sufficient and simpler.
- AI suggested fake testimonial and company logo sections. These were explicitly rejected per the assignment brief.
