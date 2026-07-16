import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useReducedMotion } from "@/lib/motion-pref"
import { process } from "@/lib/content"
import { Container, GlassCard, SectionHead } from "@/components/shared"
import { Stagger, StaggerItem } from "@/components/motion"

/* A true sequence — the delivery line literally draws itself as you scroll */
export function Process() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scaleX = useSpring(raw, { stiffness: 90, damping: 24 })

  return (
    <section id="process" className="relative bg-midnight py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(900px 480px at 50% 110%, rgba(3,60,129,0.30), transparent 65%)" }}
      />
      <Container>
        <SectionHead
          tag="Approach"
          title="One integrated lifecycle"
          refNote="Ref · Delivery method"
          sub="Project management and quality assurance wrap every stage, so nothing is handed off — it's carried through."
        />
        <div ref={ref}>
          {/* Scroll-linked delivery line */}
          <div aria-hidden="true" className="relative mb-8 hidden h-px bg-[rgba(120,180,220,0.14)] lg:block">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-ucs-sky via-ucs-azure to-cyan-sig"
              style={reduce ? { scaleX: 1 } : { scaleX }}
            />
            {process.map((_, i) => (
              <span
                key={i}
                className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-sig/60 bg-midnight"
                style={{ left: `${(i / (process.length - 1)) * 75 + 12.5}%` }}
              />
            ))}
          </div>

          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <StaggerItem key={p.step} className="h-full">
                <GlassCard className="relative h-full p-6 pt-9">
                  <span
                    aria-hidden="true"
                    className="eyebrow absolute -top-4 left-6 rounded-md bg-ucs-gradient px-2.5 py-1.5 text-[11px] font-bold tracking-[0.1em] text-white shadow-[0_10px_24px_-8px_rgba(7,148,217,0.85)]"
                  >
                    {p.step}
                  </span>
                  <h3 className="font-heading text-[16px] font-semibold tracking-[-0.01em] text-white">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-cloud/60">{p.body}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
