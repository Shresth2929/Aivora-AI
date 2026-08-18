/**
 * Motion System
 *
 * Easing: [0.22, 1, 0.36, 1] - smooth, responsive curve
 *
 * Duration Tiers:
 * - micro: 150-200ms (small interactions)
 * - fast: 200-300ms (UI elements, hover states)
 * - normal: 300-400ms (standard transitions)
 * - reveal: 400-650ms (section entrance animations)
 * - complex: 500-900ms (multi-element orchestration)
 */

export const EASE_REFINED = [0.22, 1, 0.36, 1] as const;

export const DURATIONS = {
  micro: 0.15, // 150ms - small micro-interactions
  fast: 0.2, // 200ms - quick UI feedback
  normal: 0.3, // 300ms - standard transitions
  reveal: 0.55, // 550ms - section reveals (medium)
  revealLarge: 0.65, // 650ms - complex section reveals
  complex: 0.8, // 800ms - orchestrated multi-step sequences
  complexLarge: 0.9, // 900ms - longest orchestration sequences
} as const;

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.reveal,
      delay,
      ease: EASE_REFINED,
    },
  }),
};

/**
 * Viewport-based scroll reveal animation
 * Use with motion.div:
 * initial={{ opacity: 0, y: 30 }}
 * whileInView={{ opacity: 1, y: 0 }}
 * viewport={{ once: true, amount: 0.2 }}
 */
export const scrollRevealConfig = {
  duration: DURATIONS.reveal,
  ease: EASE_REFINED,
};

/**
 * Stagger configuration for sequential reveals
 * Use with AnimatePresence or staggerChildren
 */
export const staggerConfig = {
  small: 0.08, // tight stagger for dense layouts
  normal: 0.12, // standard stagger for most sections
  large: 0.15, // loose stagger for emphasis
};

/**
 * Hover animation for interactive elements
 * Small, responsive elevation
 */
export const hoverElevationVariant = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: { duration: DURATIONS.micro, ease: EASE_REFINED },
  },
};

/**
 * Accent color transition for focused states
 */
export const accentTransition = {
  duration: DURATIONS.normal,
  ease: EASE_REFINED,
};
