import { User } from "lucide-react"
import { management } from "@/lib/content"
import { Container, GlassCard, SectionHead } from "@/components/shared"
import { Stagger, StaggerItem } from "@/components/motion"

/* Inline LinkedIn glyph — lucide dropped its brand icons */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8h4.5v12H.25V8zM8 8h4.3v1.64h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V20h-4.5v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.19 1.48-2.19 3v5.8H8V8z" />
    </svg>
  )
}

/* Initials from a placeholder / real name, for the photo-pending state */
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
                <div className="relative aspect-[4/3] overflow-hidden bg-inknavy">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      className="flex size-full items-center justify-center"
                      style={{ background: "radial-gradient(120% 120% at 50% 0%, rgba(7,148,217,0.18), transparent 60%), linear-gradient(160deg, #0A1330, #060B1A)" }}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="flex size-16 items-center justify-center rounded-full border border-cyan-sig/25 bg-cyan-sig/5 font-heading text-lg font-semibold text-cyan-sig">
                          {initials(m.name) || <User className="size-6" aria-hidden="true" />}
                        </span>
                        <span className="eyebrow text-[9px] tracking-[0.2em] text-cloud/40">Photo pending</span>
                      </div>
                    </div>
                  )}
                  <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-30" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-midnight/70 to-transparent" />
                </div>
                {/* Details */}
                <div className="flex items-start justify-between gap-3 p-6">
                  <div>
                    <h3 className="font-heading text-[16px] font-semibold tracking-[-0.01em] text-white">{m.name}</h3>
                    <p className="eyebrow mt-1.5 text-[9.5px] tracking-[0.16em] text-cyan-sig">{m.role}</p>
                    <p className="mt-3 text-[13px] leading-[1.65] text-cloud/60">{m.bio}</p>
                  </div>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      aria-label={`${m.name} on LinkedIn`}
                      className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-cyan-sig/25 bg-cyan-sig/5 text-cyan-sig transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-cyan-sig/60 hover:bg-cyan-sig/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-sig"
                    >
                      <LinkedInIcon className="size-4" />
                    </a>
                  )}
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
