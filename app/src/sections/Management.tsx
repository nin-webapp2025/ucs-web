import { User } from "lucide-react"
import { management } from "@/lib/content"
import { Container, GlassCard, SectionHead } from "@/components/shared"
import { Stagger, StaggerItem } from "@/components/motion"

/* Initials from a name, for the photo-pending placeholder */
function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function Management() {
  return (
    <section id="leadership" className="relative bg-midnight py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(880px 500px at 88% 0%, rgba(7,148,217,0.09), transparent 60%)" }}
      />
      <Container>
        <SectionHead
          tag="Leadership"
          title="The management board"
          sub="The multidisciplinary team steering UCS Premier Consults — engineering, delivery, and governance under one leadership."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {management.map((m) => (
            <StaggerItem key={m.role} className="h-full">
              <GlassCard className="group h-full overflow-hidden p-0">
                {/* Portrait: real headshot if provided, else initials placeholder */}
                <div className="relative aspect-[4/5] overflow-hidden bg-inknavy">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={`${m.name}, ${m.role}`}
                      loading="lazy"
                      className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      className="flex size-full items-center justify-center"
                      style={{ background: "radial-gradient(120% 120% at 50% 0%, rgba(7,148,217,0.18), transparent 60%), linear-gradient(160deg, #0A1330, #060B1A)" }}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="flex size-20 items-center justify-center rounded-full border border-cyan-sig/25 bg-cyan-sig/5 font-heading text-xl font-semibold text-cyan-sig">
                          {initials(m.name) || <User className="size-7" aria-hidden="true" />}
                        </span>
                        <span className="eyebrow text-[9px] tracking-[0.2em] text-cloud/40">Photo pending</span>
                      </div>
                    </div>
                  )}
                  <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-25" />
                  {/* Name + title sit over the base of the portrait */}
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-midnight via-midnight/70 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-heading text-[17px] font-semibold tracking-[-0.01em] text-white">{m.name}</h3>
                    <p className="eyebrow mt-1.5 text-[9.5px] tracking-[0.16em] text-cyan-sig">{m.role}</p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
