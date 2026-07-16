import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/motion-pref"
import { NumberTicker } from "@/components/ui/number-ticker"
import { stats } from "@/lib/content"
import { Container } from "@/components/shared"
import { Stagger, StaggerItem } from "@/components/motion"

/* Animated counters on the elevated ink-navy band */
export function Stats() {
  const reduce = useReducedMotion()
  return (
    <section aria-label="Company statistics" className="relative isolate overflow-hidden py-20 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 460px at 85% 0%, rgba(7,148,217,0.14), transparent 60%)," +
            "linear-gradient(160deg, #081026 0%, #0A1330 100%)",
        }}
      />
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0" />
      <div aria-hidden="true" className="glow-line absolute inset-x-0 bottom-0 opacity-60" />
      <Container>
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="relative pl-5">
                {/* Hairline draws in */}
                <motion.span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-full w-px origin-top bg-gradient-to-b from-cyan-sig/60 to-transparent"
                  initial={reduce ? undefined : { scaleY: 0 }}
                  whileInView={reduce ? undefined : { scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.21, 0.62, 0.21, 1] }}
                />
                {/* Soft glow behind value */}
                <span aria-hidden="true" className="absolute -top-4 -left-2 size-20 rounded-full bg-ucs-sky/10 blur-2xl" />
                <div className="relative font-heading text-[2.1rem] leading-none font-bold tracking-[-0.02em] md:text-[2.6rem]">
                  {s.value !== null ? (
                    <>
                      <NumberTicker value={s.value} className="text-ucs-gradient tracking-[-0.02em]" />
                      <span className="text-ucs-gradient">{s.suffix}</span>
                    </>
                  ) : (
                    // Word values (e.g. "Nationwide") are sized down so they never
                    // clip the narrow 2-column cell on mobile.
                    <span className="text-ucs-gradient block text-[1.45rem] leading-tight sm:text-[1.85rem] md:text-[2.1rem]">
                      {s.display}
                    </span>
                  )}
                </div>
                <p className="eyebrow relative mt-3 max-w-[22ch] text-[10px] leading-[1.5] tracking-[0.12em] text-cloud/55">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
