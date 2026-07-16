import { useEffect, useRef, useState, type ReactNode } from "react"
import Lenis from "lenis"
import {
  motion, useScroll, useSpring, useTransform,
  useMotionValue, type MotionValue,
} from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/lib/motion-pref"
import { gsap, ScrollTrigger } from "@/lib/gsap"

/* Custom cursor — a trailing cyan ring that lags the pointer and expands over
   interactive elements. Fine-pointer devices only; the OS cursor stays for
   precision, so it never hurts usability. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false) // over an interactive target
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 380, damping: 30, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return
    setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as Element | null
      setActive(!!t?.closest("a, button, input, select, textarea, label, [role='button']"))
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)
    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", dn)
    window.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", dn)
      window.removeEventListener("mouseup", up)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden rounded-full border border-cyan-sig lg:block"
      style={{ x: rx, y: ry, width: 30, height: 30, marginLeft: -15, marginTop: -15 }}
      animate={{
        scale: down ? 0.8 : active ? 2.15 : 1,
        borderColor: active ? "rgba(34,211,238,0.9)" : "rgba(34,211,238,0.55)",
        backgroundColor: active ? "rgba(34,211,238,0.10)" : "rgba(34,211,238,0)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
    />
  )
}

/* Smooth inertia scrolling (Lenis) driven by the GSAP ticker, with
   ScrollTrigger kept in sync so pinned/scrubbed timelines track the smooth
   scroll. Under automation (screenshots) we skip Lenis and let ScrollTrigger
   run on native scroll so captures stay deterministic. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (navigator.webdriver) {
      ScrollTrigger.refresh()
      return
    }
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.05 })
    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000) // gsap ticker is seconds
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    // Let ScrollTrigger measure once layout settles.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(id)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
  return <>{children}</>
}

/* Top scroll progress — the page's "dimension line" */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  return (
    <motion.div
      aria-hidden="true"
      className="bg-ucs-gradient fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left"
      style={{ scaleX }}
    />
  )
}

/* Parallax wrapper — shifts children on scroll (transform only) */
export function Parallax({
  children, distance = 60, className,
}: { children: ReactNode; distance?: number; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}

/* Tracks whether an element is near the viewport, so expensive work (WebGL,
   heavy canvases) can pause when scrolled far away. `margin` pre-activates it
   before it scrolls in, avoiding a visible pop. */
export function useNearViewport<T extends HTMLElement>(margin = "600px") {
  const ref = useRef<T>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setNear(e.isIntersecting),
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return { ref, near }
}

/* Cursor-reactive 3D tilt for non-GlassCard elements (e.g. bento tiles).
   `depth` children (marked with data-tilt-layer) can float for a parallax feel. */
export function Tilt({
  children, className, max = 8, lift = -6,
}: { children: ReactNode; className?: string; max?: number; lift?: number }) {
  const rxRaw = useMotionValue(0)
  const ryRaw = useMotionValue(0)
  const liftRaw = useMotionValue(0)
  const rotateX = useSpring(rxRaw, { stiffness: 150, damping: 18, mass: 0.4 })
  const rotateY = useSpring(ryRaw, { stiffness: 150, damping: 18, mass: 0.4 })
  const y = useSpring(liftRaw, { stiffness: 220, damping: 22, mass: 0.4 })
  return (
    <motion.div
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, y, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        ryRaw.set((( e.clientX - r.left) / r.width - 0.5) * max * 2)
        rxRaw.set(-(((e.clientY - r.top) / r.height - 0.5) * max * 2))
        liftRaw.set(lift)
      }}
      onPointerLeave={() => {
        rxRaw.set(0)
        ryRaw.set(0)
        liftRaw.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* Staggered reveal container + items */
export function Stagger({
  children, className, delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children, className, variant = "up",
}: { children: ReactNode; className?: string; variant?: "up" | "fade" | "scale" }) {
  const variants = {
    up: { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.62, 0.21, 1] as const } } },
    fade: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.9 } } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.21, 0.62, 0.21, 1] as const } } },
  }
  return (
    <motion.div className={className} variants={variants[variant]}>
      {children}
    </motion.div>
  )
}

/* Magnetic hover — CTAs lean toward the cursor */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 })
  if (reduce) return <div className={cn("inline-block", className)}>{children}</div>
  return (
    <motion.div
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.22)
        y.set((e.clientY - r.top - r.height / 2) * 0.22)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* Scroll-linked hook for section-scoped progress (process line, hero fade) */
export function useSectionProgress(offset: ["start end" | "start start" | "start 0.8", "end start" | "end end" | "center center"] = ["start end", "end start"]) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset })
  return { ref, progress: scrollYProgress as MotionValue<number> }
}
