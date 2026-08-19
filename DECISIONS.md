# Aivora AI — Design & Engineering Decisions

## 1. Why this approach over the obvious alternative?

I chose to build Aivora as a focused product homepage instead of turning it into a larger multi-page application.

The main goal of the challenge was to create a homepage that communicates the product quickly and makes the product itself visible, rather than only describing it. Because Aivora is an AI workflow orchestration concept, I used the homepage to show that idea through the workflow builder, goal-to-outcome section, and interactive workflow demo.

I considered adding more product-like pages such as a dashboard or onboarding flow, but that would have increased the scope without adding much value to the homepage experience. I wanted to spend that time on the parts that are visible in the final product: layout, typography, responsive behavior, themes, interactions, and motion.

The workflow examples use mock data because this project is a frontend prototype. I did not want to make the interface look like it was performing real AI processing when it is not.

## 2. What trade-off did I make under the time limit?

The main trade-off was choosing depth over the number of features.

Instead of building additional pages or a real backend, I focused on making the existing sections feel complete. This included the interactive workflow states, dark/light mode, responsive layouts, and small Framer Motion transitions.

Some deeper work was left outside the scope, such as a full accessibility audit, extensive real-device testing, and automated tests for the interactive workflow logic.

With a full week, I would spend more time testing the interface on physical mobile devices, improving accessibility, adding more workflow states, and writing tests for the interactive components.

## 3. Where did I use AI tools?

I used AI tools during development mainly for brainstorming, exploring implementation approaches, and getting suggestions for component structure, copy, styling, mock workflow data, and animations.

I did not use the generated output without checking it. I adapted the suggestions to fit Aivora's design and removed ideas that did not make sense for the product or the challenge.

I also made the final decisions around the page structure, visual hierarchy, responsive behavior, theme implementation, workflow interactions, animation usage, and the overall product direction.

One important decision was to avoid fabricated testimonials, user numbers, or company logos. Since Aivora is a concept product, I kept the content focused on demonstrating the product instead of creating artificial proof of traction.
