import { Check } from "lucide-react"
import { whyUs } from "@/lib/content"
import { Container, GlassCard, Reveal } from "@/components/shared"
import { Stagger, StaggerItem } from "@/components/motion"

/* Sticky scroll storytelling: pinned intro left, commitments cascade right */
export function WhyUs() {
  return (
    <section id="why-us" className="relative py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(800px 480px at 6% 30%, rgba(7,148,217,0.10), transparent 60%)," +
            "linear-gradient(180deg, #060B1A 0%, #081026 50%, #060B1A 100%)",
        }}
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow rounded-[5px] bg-cyan-sig px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] text-midnight">
                Why UCS
              </span>
              <h2 className="mt-6 font-heading text-[2rem] leading-[1.12] font-bold tracking-[-0.03em] text-white md:text-[2.6rem]">
                A partner that <span className="text-ucs-gradient">exceeds expectations</span>, not just specifications.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-cloud/70">{whyUs.intro}</p>
              <div aria-hidden="true" className="mt-10 hidden lg:block">
                <div className="glow-line w-2/3" />
              </div>
            </Reveal>
          </div>

          <Stagger className="space-y-4">
            {whyUs.items.map((w, i) => (
              <StaggerItem key={w.title}>
                <GlassCard className="p-6 md:p-7">
                  <div className="flex gap-5">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-cyan-sig/30 bg-cyan-sig/10 text-cyan-sig">
                      <Check className="size-4" aria-hidden="true" strokeWidth={3} />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="eyebrow text-[10px] tracking-[0.16em] text-cloud/30">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="font-heading text-[16.5px] font-semibold tracking-[-0.01em] text-white">{w.title}</h3>
                      </div>
                      <p className="mt-2 text-[13.5px] leading-[1.7] text-cloud/60">{w.body}</p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
