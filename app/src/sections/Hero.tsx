import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useReducedMotion } from "@/lib/motion-pref"
import { ArrowRight, ChevronDown } from "lucide-react"
import type { COBEOptions } from "cobe"
import { company } from "@/lib/content"
import { CtaLink, RegMarks } from "@/components/shared"
import { Magnetic, useNearViewport } from "@/components/motion"
import { Globe } from "@/components/ui/globe"

/* Nationwide delivery, literally: dot-matrix globe opening on Nigeria,
   Signal-Cyan markers on the cities UCS serves. */
const GLOBE_BRAND: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 4.57, // Nigeria-facing opening frame
  theta: 0.18,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 18000,
  mapBrightness: 3.4,
  baseColor: [0.16, 0.32, 0.55], // steel-blue dot matrix
  markerColor: [34 / 255, 211 / 255, 238 / 255], // Signal Cyan
  glowColor: [0.05, 0.12, 0.28], // deep navy halo
  markers: [
    { location: [9.0765, 7.3986], size: 0.09 }, // Abuja
    { location: [6.5244, 3.3792], size: 0.08 }, // Lagos
    { location: [12.0022, 8.592], size: 0.06 }, // Kano
    { location: [4.8156, 7.0498], size: 0.06 }, // Port Harcourt
    { location: [7.3775, 3.947], size: 0.05 }, // Ibadan
    { location: [10.5222, 7.4384], size: 0.05 }, // Kaduna
    { location: [6.4584, 7.5464], size: 0.04 }, // Enugu
    { location: [11.8311, 13.151], size: 0.04 }, // Maiduguri
  ],
}

const EASE = [0.21, 0.62, 0.21, 1] as const

/* Headline line with overflow-mask reveal */
function MaskedLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className="block">{children}</span>
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const globeGate = useNearViewport<HTMLDivElement>("400px")
  const mobileGlobeGate = useNearViewport<HTMLDivElement>("300px")
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  // Content rises & fades faster than the backdrop — cinematic depth on scroll
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160])

  // Globe cinematic exit: drift from the right toward center, scale up, then fade.
  const globeXraw = useTransform(scrollYProgress, [0, 1], ["0vw", "-32vw"])
  const globeScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.28])
  const globeOpacity = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 1, 0])
  const globeX = useSpring(globeXraw, { stiffness: 90, damping: 26, mass: 0.5 })
  const globeScale = useSpring(globeScaleRaw, { stiffness: 90, damping: 26, mass: 0.5 })
  // Spin tied to page scroll — scroll down spins forward, scroll up reverses.
  const { scrollY } = useScroll()
  const scrollSpin = useTransform(scrollY, (y) => y * 0.0016)

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        }

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100vh] items-center overflow-hidden bg-midnight">
      {/* Cinematic video slot — drop assets/videos/ucs-hero.mp4 into the repo and it plays. */}
      <video className="absolute inset-0 -z-40 size-full object-cover opacity-50" autoPlay muted loop playsInline aria-hidden="true">
        <source src="/assets/videos/ucs-hero.mp4" type="video/mp4" />
      </video>

      {/* Midnight canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30"
        style={{
          background:
            "radial-gradient(1100px 620px at 78% 16%, rgba(7,148,217,0.16), transparent 62%)," +
            "linear-gradient(175deg, #060B1A 0%, #081026 55%, #0A1330 100%)",
        }}
      />

      {/* Aurora drift */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden" style={reduce ? undefined : { y: glowY }}>
        <div className="aurora aurora-a left-[8%] top-[12%] h-[420px] w-[560px]" style={{ background: "radial-gradient(closest-side, rgba(7,148,217,0.34), transparent)" }} />
        <div className="aurora aurora-b right-[4%] top-[38%] h-[460px] w-[620px]" style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.16), transparent)" }} />
        <div className="aurora aurora-a bottom-[-12%] left-[35%] h-[380px] w-[700px]" style={{ background: "radial-gradient(closest-side, rgba(3,60,129,0.55), transparent)" }} />
      </motion.div>

      {/* Blueprint grid + perspective floor */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={reduce ? undefined : { y: gridY }}>
        <div
          className="bg-blueprint absolute inset-0"
          style={{
            maskImage: "radial-gradient(120% 85% at 50% 8%, black 40%, transparent 92%)",
            WebkitMaskImage: "radial-gradient(120% 85% at 50% 8%, black 40%, transparent 92%)",
          }}
        />
        {/* Futuristic grid floor receding to the horizon */}
        <div className="absolute inset-x-[-30%] bottom-[-6%] h-[46%] [perspective:600px]">
          <div
            className="absolute inset-0 origin-bottom"
            style={{
              transform: "rotateX(62deg)",
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.14) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "linear-gradient(to top, black 25%, transparent 90%)",
              WebkitMaskImage: "linear-gradient(to top, black 25%, transparent 90%)",
            }}
          />
        </div>
      </motion.div>

      {/* Mobile / tablet globe — a dim, centered ambient planet behind the hero
          content (the drifting desktop globe below is hidden under lg). */}
      <div
        ref={mobileGlobeGate.ref}
        className="pointer-events-none absolute top-[52%] left-1/2 w-[92vw] max-w-[430px] -translate-x-1/2 -translate-y-1/2 lg:hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-[-14%] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(7,148,217,0.18), transparent 72%)" }}
        />
        <div
          className="absolute inset-[3%] rounded-full"
          style={{ boxShadow: "inset 0 0 34px 2px rgba(34,211,238,0.12), 0 0 50px 0 rgba(7,148,217,0.16)", border: "1px solid rgba(34,211,238,0.14)" }}
        />
        <div className="relative aspect-square w-full opacity-55 [mask-image:radial-gradient(circle_at_center,black_80%,transparent_98%)]">
          <Globe config={GLOBE_BRAND} className="max-w-none" autoRotate active={mobileGlobeGate.near} />
        </div>
      </div>

      {/* Nationwide-delivery globe — the hero's motion graphic. As you scroll it
          drifts toward center, scales up, spins with the scroll, then fades out.
          Shows from lg (1024px) up; sizes down on laptops so it never crowds text. */}
      <motion.div
        ref={globeGate.ref}
        className="absolute top-[44%] right-6 hidden w-[380px] lg:block xl:right-16 xl:w-[500px]"
        style={{ x: globeX, scale: globeScale, opacity: globeOpacity, y: "-50%" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-[-18%] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(7,148,217,0.20), transparent 72%)" }}
        />
        {/* Atmosphere ring — keeps the full sphere reading as a complete planet
            even when the empty ocean face is toward the viewer */}
        <div
          aria-hidden="true"
          className="absolute inset-[3%] rounded-full"
          style={{
            boxShadow: "inset 0 0 40px 2px rgba(34,211,238,0.14), 0 0 60px 0 rgba(7,148,217,0.18)",
            border: "1px solid rgba(34,211,238,0.16)",
          }}
        />
        <div className="relative aspect-square w-full [mask-image:radial-gradient(circle_at_center,black_86%,transparent_99%)]">
          {/* Always rotates; scroll adds spin on top. Pauses when scrolled away. */}
          <Globe config={GLOBE_BRAND} className="max-w-none" autoRotate scrollSpin={scrollSpin} active={globeGate.near} />
        </div>
        {/* Drawing annotation pinned to the graphic */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
          <div className="eyebrow text-[9.5px] tracking-[0.2em] text-cyan-sig/90">Nationwide delivery</div>
          <div className="mt-1 text-[11.5px] text-cloud/50">8 active regions · Nigeria</div>
        </div>
      </motion.div>

      {/* Drawing-sheet frame + traveling data trace */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 z-10 rounded-md border border-cyan-sig/20 sm:inset-4">
        <RegMarks />
        <span className="absolute -top-px left-0 h-px w-[10%] overflow-visible">
          <span className="trace-x block h-px w-full bg-gradient-to-r from-transparent via-cyan-sig to-transparent" />
        </span>
      </div>

      <motion.div
        className="mx-auto w-full max-w-7xl px-6 pt-32 pb-28 sm:px-10 lg:px-14"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          <motion.p {...fade(0.05)} className="eyebrow mb-6 flex items-center gap-3 text-xs text-cyan-sig">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-cyan-sig/60" />
            Engineering &amp; Infrastructure Consultancy · Nigeria
          </motion.p>

          <h1 className="font-heading text-[2.6rem] leading-[1.06] font-bold tracking-[-0.03em] text-white sm:text-[3.4rem] lg:text-[4rem]">
            <MaskedLine delay={0.12}>{company.tagline[0]}</MaskedLine>
            <MaskedLine delay={0.24}>{company.tagline[1]}</MaskedLine>
            <MaskedLine delay={0.36}>
              <span className="text-ucs-gradient">{company.tagline[2]}</span>
            </MaskedLine>
          </h1>

          <motion.p {...fade(0.5)} className="mt-7 max-w-xl text-[16.5px] leading-[1.7] text-cloud/75">
            {company.heroSub}
          </motion.p>

          <motion.div {...fade(0.62)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <CtaLink href="#contact">
                Request a Consultation
                <ArrowRight className="size-4" aria-hidden="true" />
              </CtaLink>
            </Magnetic>
            <Magnetic>
              <CtaLink href="#services" variant="ghost">
                Explore Services
              </CtaLink>
            </Magnetic>
          </motion.div>

          <motion.div {...fade(0.78)} className="mt-16 flex flex-wrap gap-x-10 gap-y-3">
            {[
              ["Feasibility → Delivery", "Integrated under one roof"],
              ["Standards-driven", "Nigerian & international codes"],
              ["GIS · BIM · Drones", "Digitally monitored projects"],
            ].map(([k, v]) => (
              <div key={k} className="border-l border-cyan-sig/30 pl-4">
                <div className="eyebrow text-[10px] tracking-[0.18em] text-cyan-sig/90">{k}</div>
                <div className="mt-1 text-[12.5px] text-cloud/60">{v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <a
        href="#highlights"
        aria-label="Scroll to content"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-cloud/50 transition-[color,transform] duration-200 hover:translate-y-0.5 hover:text-cyan-sig focus-visible:outline-2 focus-visible:outline-cyan-sig"
      >
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
