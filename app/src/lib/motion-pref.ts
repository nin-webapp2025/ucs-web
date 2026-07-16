import { useReducedMotion as useFramerReducedMotion } from "framer-motion"

/**
 * Global motion switch.
 *
 * FORCE_MOTION = true  → every animation always runs, ignoring the visitor's
 *   OS "Reduce motion" setting (chosen so the full motion design is always seen).
 * FORCE_MOTION = false → restore accessibility: respect the OS setting.
 *
 * Flip this ONE constant to toggle the whole site. CSS keyframe animations are
 * governed by the (now removed) `prefers-reduced-motion` block in index.css —
 * to fully re-enable accessibility, also restore that media query.
 */
const FORCE_MOTION = true

/** Drop-in replacement for framer-motion's useReducedMotion, gated by the switch. */
export function useReducedMotion(): boolean {
  const osReduced = useFramerReducedMotion()
  return FORCE_MOTION ? false : !!osReduced
}
