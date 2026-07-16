import { services } from "@/lib/content"
import { Container, GlassCard, Icon, SectionHead } from "@/components/shared"
import { Stagger, StaggerItem } from "@/components/motion"

export function Services() {
  return (
    <section id="services" className="relative bg-midnight py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(1000px 560px at 90% 10%, rgba(3,60,129,0.25), transparent 62%)" }}
      />
      <Container>
        <SectionHead
          tag="Services"
          title="Comprehensive services under one roof"
          refNote="Ref · Service catalogue"
          sub="From feasibility studies and engineering design to construction supervision, project management, real estate advisory, and market development — integrated solutions that simplify project delivery."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.title} className="h-full">
              <GlassCard className="h-full overflow-hidden p-6 md:p-7">
                {/* Corner tick lights up on hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 size-8 rounded-bl-2xl border-b border-l border-cyan-sig/0 transition-colors duration-300 group-hover:border-cyan-sig/50"
                />
                <div className="mb-5 flex items-center justify-between">
                  <span className="relative inline-flex size-10 items-center justify-center rounded-lg border border-cyan-sig/25 bg-cyan-sig/5 text-cyan-sig transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={s.icon} className="size-[18px]" />
                  </span>
                  <span className="eyebrow text-[10px] tracking-[0.16em] text-cloud/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-[15.5px] font-semibold tracking-[-0.01em] text-white">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-cloud/60">{s.body}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
