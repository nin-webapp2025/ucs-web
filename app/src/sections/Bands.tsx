import { Leaf, GraduationCap, ArrowRight, Check } from "lucide-react"
import { sustainability, careers } from "@/lib/content"
import { Container, CtaLink, GlassCard, Reveal } from "@/components/shared"
import { Magnetic, Parallax } from "@/components/motion"

/* HSE commitment band — Verdant accent (its one appearance) */
export function Safety() {
  return (
    <section aria-labelledby="hse-title" className="relative bg-midnight py-16 md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(700px 380px at 8% 50%, rgba(22,163,74,0.08), transparent 60%)" }}
      />
      <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0 opacity-50" />
      <Container>
        <Reveal>
          <GlassCard hover={false} className="p-7 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-verdant/30 bg-verdant/10 text-verdant shadow-[0_0_30px_-6px_rgba(22,163,74,0.4)]">
                <Leaf className="size-7" aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow mb-2 text-[10.5px] tracking-[0.2em] text-verdant">{sustainability.eyebrow}</p>
                <h2 id="hse-title" className="font-heading text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl">
                  {sustainability.title}
                </h2>
                <p className="mt-3 max-w-3xl text-[14px] leading-[1.7] text-cloud/65">{sustainability.body}</p>
              </div>
              <ul className="space-y-2.5">
                {sustainability.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-[13px] font-medium text-cloud/80">
                    <Check className="size-4 shrink-0 text-verdant" aria-hidden="true" strokeWidth={3} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  )
}

export function Careers() {
  return (
    <section id="careers" className="relative bg-midnight py-16 md:py-24">
      <Container>
        <Reveal>
          <GlassCard hover={false} className="relative overflow-hidden p-8 md:p-12">
            <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-40" />
            <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow mb-3 flex items-center gap-2.5 text-[10.5px] tracking-[0.2em] text-cyan-sig">
                  <GraduationCap className="size-4" aria-hidden="true" />
                  {careers.eyebrow}
                </p>
                <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl">
                  {careers.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-[1.7] text-cloud/65">{careers.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {careers.points.map((pt) => (
                    <li key={pt} className="rounded-full border border-cyan-sig/25 bg-cyan-sig/5 px-3.5 py-1.5 text-[12px] font-medium text-cloud/80">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <Magnetic className="justify-self-start md:justify-self-end">
                <CtaLink href="#contact" variant="ghost">
                  Ask about placements
                  <ArrowRight className="size-4" aria-hidden="true" />
                </CtaLink>
              </Magnetic>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  )
}

/* Final CTA — aurora drama; the single Engineer Amber moment on the page */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(760px 420px at 50% 120%, rgba(7,148,217,0.30), transparent 65%)," +
            "linear-gradient(180deg, #060B1A 0%, #0A1330 100%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora aurora-a left-[14%] top-[8%] h-[300px] w-[480px]" style={{ background: "radial-gradient(closest-side, rgba(7,148,217,0.26), transparent)" }} />
        <div className="aurora aurora-b right-[10%] bottom-[0%] h-[320px] w-[520px]" style={{ background: "radial-gradient(closest-side, rgba(245,166,35,0.10), transparent)" }} />
      </div>
      <div
        aria-hidden="true"
        className="bg-blueprint absolute inset-0 -z-10"
        style={{
          maskImage: "radial-gradient(90% 90% at 50% 100%, black 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(90% 90% at 50% 100%, black 30%, transparent 85%)",
        }}
      />
      <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0" />
      <Container className="text-center">
        <Parallax distance={30}>
          <Reveal>
            <p className="eyebrow mb-6 text-[11px] tracking-[0.22em] text-cyan-sig">Let&rsquo;s build it together</p>
            <h2 id="cta-title" className="mx-auto max-w-3xl font-heading text-[2.1rem] leading-[1.12] font-bold tracking-[-0.03em] text-white md:text-[3rem]">
              Have a project in view?
              <br />
              <span className="text-ucs-gradient">Bring it to the team that delivers.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.7] text-cloud/65">
              Feasibility to final delivery — one accountable partner, working to Nigerian and international standards.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <CtaLink href="#contact" variant="amber">
                  Request a Consultation
                </CtaLink>
              </Magnetic>
              <Magnetic>
                <CtaLink href="#services" variant="ghost">
                  Explore Services
                </CtaLink>
              </Magnetic>
            </div>
          </Reveal>
        </Parallax>
      </Container>
    </section>
  )
}
