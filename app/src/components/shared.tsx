import { type ReactNode } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { useReducedMotion } from "@/lib/motion-pref"
import {
  Building2, Route, Droplets, FileSearch, ClipboardCheck, GanttChartSquare,
  Calculator, KeyRound, Store, DraftingCompass, Users, Landmark, Map,
  BadgeCheck, HardHat, Boxes, Radar, MonitorCheck, type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* Icon registry so content.ts can stay serializable */
const icons: Record<string, LucideIcon> = {
  Building2, Route, Droplets, FileSearch, ClipboardCheck, GanttChartSquare,
  Calculator, KeyRound, Store, DraftingCompass, Users, Landmark, Map,
  BadgeCheck, HardHat, Boxes, Radar, MonitorCheck,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = icons[name] ?? Building2
  return <C className={className} aria-hidden="true" />
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
}

/* Scroll reveal — transform/opacity only, honors reduced motion */
export function Reveal({
  children, delay = 0, className,
}: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.21, 0.62, 0.21, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Section header — engineering-drawing vernacular on the midnight canvas */
export function SectionHead({
  tag, title, sub,
}: { tag: string; title: string; refNote?: string; sub?: string }) {
  return (
    <Reveal>
      <div className="mb-12 md:mb-16">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
          <span className="eyebrow rounded-[5px] bg-cyan-sig px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] text-midnight">
            {tag}
          </span>
          <h2 className="font-heading text-[1.65rem] font-semibold tracking-[-0.03em] text-balance text-white md:text-[2.1rem]">
            {title}
          </h2>
          <span
            aria-hidden="true"
            className="hidden h-px min-w-16 flex-1 bg-gradient-to-r from-[rgba(120,180,220,0.25)] to-transparent md:block"
          />
        </div>
        {sub && <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-cloud/70">{sub}</p>}
      </div>
    </Reveal>
  )
}

/* Glass card — the site's floating surface. Hover adds a cursor-following cyan
   spotlight (technique adapted from 21st.dev / MagicUI MagicCard, reworked to
   live in the element background so it never needs to wrap children) plus a
   smooth spring-eased lift and glow edge. */
export function GlassCard({
  className, children, hover = true,
}: { className?: string; children: ReactNode; hover?: boolean }) {
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const rxRaw = useMotionValue(0)
  const ryRaw = useMotionValue(0)
  const liftRaw = useMotionValue(0)
  const rotateX = useSpring(rxRaw, { stiffness: 150, damping: 18, mass: 0.4 })
  const rotateY = useSpring(ryRaw, { stiffness: 150, damping: 18, mass: 0.4 })
  const y = useSpring(liftRaw, { stiffness: 220, damping: 22, mass: 0.4 })
  const background = useMotionTemplate`radial-gradient(230px circle at ${mx}px ${my}px, rgba(34,211,238,0.12), transparent 72%), rgba(255,255,255,0.03)`

  if (!hover) {
    return <div className={cn("glass relative rounded-2xl", className)}>{children}</div>
  }
  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const lx = e.clientX - r.left
        const ly = e.clientY - r.top
        mx.set(lx)
        my.set(ly)
        // Cursor-reactive 3D tilt (±5°) + slight lift toward the viewer
        ryRaw.set((lx / r.width - 0.5) * 10)
        rxRaw.set(-(ly / r.height - 0.5) * 10)
        liftRaw.set(-6)
      }}
      onPointerLeave={() => {
        mx.set(-400)
        my.set(-400)
        rxRaw.set(0)
        ryRaw.set(0)
        liftRaw.set(0)
      }}
      style={{ background, rotateX, rotateY, y, transformPerspective: 900 }}
      className={cn(
        "glass group relative rounded-2xl [transform-style:preserve-3d] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.19,0.76,0.28,1)] will-change-transform hover:border-cyan-sig/50 hover:shadow-[0_30px_72px_-30px_rgba(7,148,217,0.55),0_0_0_1px_rgba(34,211,238,0.14)]",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

/* Brand CTA link-buttons */
export function CtaLink({
  href, variant = "primary", className, children,
}: { href: string; variant?: "primary" | "ghost" | "ghostDark" | "amber"; className?: string; children: ReactNode }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 font-heading text-[14.5px] font-semibold transition-[transform,box-shadow,opacity,background-color,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px"
  const ghost =
    "border border-cyan-sig/40 text-cloud hover:-translate-y-0.5 hover:border-cyan-sig/80 hover:bg-cyan-sig/10 focus-visible:outline-cyan-sig"
  const variants = {
    primary:
      "shine bg-ucs-gradient text-white shadow-[0_14px_34px_-14px_rgba(7,148,217,0.8)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-14px_rgba(7,148,217,0.95)] focus-visible:outline-cyan-sig",
    ghost,
    ghostDark: ghost,
    amber:
      "shine bg-amber-eng text-[#3a2405] shadow-[0_14px_34px_-14px_rgba(245,166,35,0.75)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-14px_rgba(245,166,35,0.9)] focus-visible:outline-amber-eng",
  }
  return (
    <a href={href} className={cn(base, variants[variant], className)}>
      {children}
    </a>
  )
}

/* Corner registration ticks — drawing-sheet signature */
export function RegMarks() {
  return (
    <>
      {(["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"] as const).map((pos) => (
        <span key={pos} aria-hidden="true" className={cn("pointer-events-none absolute size-3 border border-cyan-sig/50", pos)}>
          <span className="absolute inset-[4px] rounded-full bg-cyan-sig/50" />
        </span>
      ))}
    </>
  )
}
