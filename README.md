<div align="center">

# Aivora AI

### Intelligent Workflow Orchestration

**Turn ambitious goals into intelligent action.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**[Live Demo](https://aivora-ai-theta.vercel.app/) · [Report a Bug](https://github.com/Shresth2929/Aivora-AI/issues) · [Request a Feature](https://github.com/Shresth2929/Aivora-AI/issues)**

</div>

---

## 📋 About This Submission

This project is my submission for the **Acdyon Technologies Frontend Challenge — Part 2: The Premium Home Page**. The brief: redesign a product's home page so it lands the *"wow, I want an account"* reaction in the first 3 seconds — real taste over templated defaults, no fabricated metrics or testimonials.

Aivora AI is the product I invented for the challenge: a premium AI orchestration concept that turns a natural-language goal into a structured workflow — research → reasoning → action → outcome.

| Challenge Requirement | Where It's Met |
|---|---|
| Hero with clear value prop + CTA | Landing hero — see [Hero screenshots](#-screenshots) |
| Section that *shows* the product, not just claims | Interactive Workflow Demo + Goal → Outcome visualization |
| One motion/micro-interaction that earns its keep | Framer Motion step-through on the workflow demo |
| 390px mobile / 1440px desktop, no horizontal scroll | Fully responsive, tested at both breakpoints |
| Real dark mode (all-or-nothing) | Complete dark/light theme, no partial states |
| No fake testimonials, user counts, or logos | None used — copy is honest about this being a concept demo |

> Aivora is a frontend product prototype. Workflow demonstrations use deterministic mock data and do not perform real AI processing or external actions — stated up front rather than dressed up as something it isn't.

---

## 🚀 Live Demo

**[aivora-ai-theta.vercel.app](https://aivora-ai-theta.vercel.app/)**

Full design rationale and trade-offs are in [`DECISIONS.md`](./DECISIONS.md).

---

## ✨ Features

- **Interactive Workflow Demo** — Select a goal and watch a structured workflow progress step-by-step.
- **Workflow Builder** — Configure goal, input source, and output format to generate a workflow.
- **Goal → Outcome Visualization** — Shows how an AI orchestrator processes a business objective, not just describes it.
- **Dark & Light Mode** — Full theme coverage across every screen, no half-dark states.
- **Premium Motion** — Purposeful Framer Motion transitions that support the story instead of decorating it.
- **Fully Responsive** — Built and verified at 390px (mobile) through 1440px (desktop).

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js, React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 📸 Screenshots

### Hero — Dark Mode
![Aivora Hero Dark](./screenshots/hero-dark.png)

### Hero — Light Mode
![Aivora Hero Light](./screenshots/hero-light.png)

### Workflow Builder
![Workflow Builder](./screenshots/workflow-builder-light.png)

### Goal → Outcome
![Goal Outcome](./screenshots/goal-outcome-light.png)

### Capabilities
![Capabilities](./screenshots/capabilities-light.png)

### Interactive Workflow Demo
![Live Workflow Demo](./screenshots/live-demo-automation.png)

---

## 📁 Project Structure

```text
app/            → Next.js application routes and pages
components/     → Reusable UI components
lib/            → Workflow logic and mock data
public/         → Static assets
screenshots/    → Application screenshots
```

---

## ⚡ Getting Started

```bash
git clone https://github.com/Shresth2929/Aivora-AI.git
cd Aivora-AI
npm install
npm run dev
```

Open **http://localhost:3000** to run the application locally.

---

## 🎯 Project Focus

Aivora was built with a focus on **product thinking, frontend engineering, interaction design, responsive UI, and motion design** — the exact axes the challenge grades on: systems thinking, UI craft & taste, honesty, and ownership.

### Core Product Flow

```text
Goal
  ↓
Aivora Agent
  ↓
Research
  ↓
Reasoning
  ↓
Action
  ↓
Outcome
```

---

<div align="center">

### Aivora AI
**Turn ambitious goals into intelligent action.**

</div>
