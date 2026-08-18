# Aivora AI

A premium, production-quality single-page homepage for Aivora AI — an AI workflow orchestration product that turns natural-language goals into structured, intelligent workflows.

## Live Demo

> Deploy to Vercel and add your URL here.

## Tech Stack

- **Next.js 16** — App Router, file-based routing
- **TypeScript** — Strict typing throughout
- **Tailwind CSS v4** — Utility-first styling with custom design tokens
- **Framer Motion** — Declarative animation system
- **Lucide React** — Lightweight, accessible icon library

## Features

- Premium responsive homepage communicating AI workflow orchestration
- Interactive AI workflow demo — select a goal, watch the agent work step-by-step
- Workflow builder — configure goal, input source, and output format dynamically
- Light/dark mode with system preference detection and persistent toggle
- Fully responsive design (390px → 1440px)
- Framer Motion entrance animations, hover states, and AnimatePresence transitions
- Semantic HTML with proper heading hierarchy and ARIA labels
- Skip-to-content link for keyboard users
- Keyboard Easter egg (Konami code)
- Zero fake testimonials, statistics, or customer logos

## Running Locally

```bash
cd aivora-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

## Deploying to Vercel

```bash
npx vercel
```

Or connect the repository to Vercel via the dashboard — it will auto-detect Next.js and deploy.

## Project Structure

```
aivora-ai/
├── app/
│   ├── layout.tsx        # Root layout, Inter font, SEO metadata, theme init
│   ├── page.tsx          # Homepage — assembles all sections
│   └── globals.css       # Design system — tokens, typography, base styles
├── components/
│   ├── Navbar.tsx        # Sticky nav with scroll-blur, mobile menu, theme toggle
│   ├── Hero.tsx          # Value proposition headline and hero visual
│   ├── WorkflowHero.tsx  # Animated agent workflow node diagram
│   ├── AgentDemo.tsx     # Interactive AI demo with state machine
│   ├── Capabilities.tsx  # 4-capability editorial section
│   ├── GoalOutcome.tsx   # Goal → Aivora → Outcome transformation viz
│   ├── WorkflowBuilder.tsx # Interactive workflow builder
│   ├── Philosophy.tsx    # Product philosophy — 3 principles
│   ├── FinalCTA.tsx      # Closing CTA section
│   ├── Footer.tsx        # Minimal footer
│   └── ThemeToggle.tsx   # Sun/Moon theme toggle
└── lib/
    └── mock-data.ts      # Deterministic demo data for all interactions
```

## AI Usage

AI tools (Claude) were used throughout this project for:

- **Ideation** — generating design system tokens, component architecture, and copy direction
- **Implementation** — writing component code, CSS design tokens, and TypeScript types
- **Debugging** — resolving Tailwind v4 compatibility issues and TypeScript strict mode errors
- **Refinement** — improving accessibility, responsive layouts, and animation choreography

All generated code was manually reviewed, adjusted for coherence, and tested for correctness. Design decisions (color system, typography scale, component architecture, animation philosophy) were made with deliberate reasoning. Generated code that introduced unnecessary complexity, fake data, or poor patterns was rejected and rewritten.
