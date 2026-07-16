import { highlights } from "@/lib/content"
import { Container, GlassCard, Icon, SectionHead } from "@/components/shared"
import { Stagger, StaggerItem } from "@/components/motion"

export function Highlights() {
  return (
    <section id="highlights" className="relative bg-midnight py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(900px 500px at 12% 0%, rgba(7,148,217,0.08), transparent 60%)" }}
      />
      <Container>
        <SectionHead
          tag="Highlights"
          title="A consultancy built for modern infrastructure"
          refNote="Ref · Company profile"
          sub="Innovative and sustainable engineering consultancy services, delivered by a multidisciplinary team with a commitment to quality, safety, and technical excellence."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <StaggerItem key={h.title} className="h-full">
              <GlassCard className="h-full p-6 md:p-7">
                <span className="relative mb-6 inline-flex size-12 items-center justify-center rounded-xl bg-ucs-gradient text-white shadow-[0_12px_28px_-10px_rgba(7,148,217,0.8)]">
                  <span aria-hidden="true" className="absolute -inset-1.5 rounded-2xl bg-ucs-sky/20 blur-md" />
                  <Icon name={h.icon} className="relative size-5" />
                </span>
                <h3 className="font-heading text-[17px] font-semibold tracking-[-0.01em] text-white">{h.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.7] text-cloud/65">{h.body}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
