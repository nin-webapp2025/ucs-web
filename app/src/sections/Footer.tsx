import { useEffect, useRef } from "react"
import type { COBEOptions } from "cobe"
import { services, contact, company } from "@/lib/content"
import { Globe } from "@/components/ui/globe"
import { useNearViewport } from "@/components/motion"
import { gsap } from "@/lib/gsap" // importing registers ScrollTrigger (side effect)
import logo from "@/assets/ucs-logo.jpeg"

const quickLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why UCS" },
  { href: "#leadership", label: "Team" },
  { href: "#digital", label: "Digital Innovation" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

/* Dim, Africa-facing globe reprise for the footer horizon */
const FOOTER_GLOBE: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 4.57,
  theta: 0.16,
  dark: 1,
  diffuse: 1.0,
  mapSamples: 18000,
  mapBrightness: 2.4,
  baseColor: [0.11, 0.22, 0.4],
  markerColor: [34 / 255, 211 / 255, 238 / 255],
  glowColor: [0.04, 0.1, 0.24],
  markers: [
    { location: [9.0765, 7.3986], size: 0.08 },
    { location: [6.5244, 3.3792], size: 0.07 },
    { location: [12.0022, 8.592], size: 0.05 },
    { location: [4.8156, 7.0498], size: 0.05 },
    { location: [10.5222, 7.4384], size: 0.04 },
    { location: [6.4584, 7.5464], size: 0.04 },
  ],
}

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const globeGate = useNearViewport<HTMLDivElement>("500px")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // GSAP ScrollTrigger "curtain reveal" — content rises into place on entry
    const ctx = gsap.context(() => {
      gsap.from(".foot-reveal", {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-midnight pt-20 pb-24 text-cloud">
      <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0" />

      {/* 3D globe — only its top cap rises behind the content; the rest is pushed
          below the footer edge and clipped, so there's no empty space under it. */}
      <div ref={globeGate.ref} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-[58%] justify-center">
        <div className="relative aspect-square w-[min(980px,150vw)] [mask-image:radial-gradient(circle_at_50%_32%,black_40%,transparent_62%)]">
          <Globe config={FOOTER_GLOBE} className="max-w-none" autoRotate active={globeGate.near} />
        </div>
      </div>
      {/* Legibility + horizon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 118%, rgba(7,148,217,0.16), transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Closing brand statement */}
        <div className="foot-reveal mb-14 max-w-2xl">
          <p className="eyebrow mb-4 text-[10.5px] tracking-[0.22em] text-cyan-sig">Nationwide delivery · Nigeria</p>
          <h2 className="font-heading text-[2rem] leading-[1.12] font-bold tracking-[-0.03em] text-white md:text-[2.6rem]">
            Reliable delivery, <span className="text-ucs-gradient">nationwide.</span>
          </h2>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 font-heading text-[14px] font-semibold text-cyan-sig transition-[gap,color] duration-200 hover:gap-3 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-sig"
          >
            Request a Consultation →
          </a>
        </div>

        <div className="foot-reveal grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-sig">
              <span className="flex size-12 items-center justify-center overflow-hidden rounded-[10px] bg-ucs-cream p-1">
                <img src={logo} alt="UCS Premier Consults LTD logo" className="size-full object-contain" />
              </span>
              <span className="font-heading text-[15px] font-bold text-white">
                UCS Premier <span className="text-ucs-sky">Consults</span> LTD
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[13px] leading-[1.7] text-cloud/60">{company.positioning}</p>
            <p className="eyebrow mt-6 text-[10px] tracking-[0.18em] text-cyan-sig/80">
              Innovative Thinking · Technical Excellence · Reliable Delivery
            </p>
          </div>

          <nav aria-label="Footer quick links">
            <h3 className="eyebrow mb-4 text-[10.5px] tracking-[0.2em] text-cloud/50">Explore</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="rounded text-[13.5px] text-cloud/75 transition-colors duration-200 hover:text-cyan-sig focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-sig"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow mb-4 text-[10.5px] tracking-[0.2em] text-cloud/50">Services</h3>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.title} className="text-[13px] text-cloud/60">{s.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-[10.5px] tracking-[0.2em] text-cloud/50">Contact</h3>
            <ul className="space-y-2.5 text-[13px] text-cloud/60">
              <li>{contact.address}</li>
              <li>{contact.phone}</li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="rounded text-cloud/75 transition-colors duration-200 hover:text-cyan-sig focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-sig"
                >
                  {contact.email}
                </a>
              </li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="foot-reveal mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-cloud/45">
            © {new Date().getFullYear()} UCS Premier Consults LTD. All rights reserved.
          </p>
          <p className="eyebrow text-[9.5px] tracking-[0.18em] text-cloud/35">
            Engineering &amp; Infrastructure Consultancy · Nigeria
          </p>
        </div>
      </div>
    </footer>
  )
}
