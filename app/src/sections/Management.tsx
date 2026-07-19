import { User } from "lucide-react"
import { management } from "@/lib/content"
import { Container, GlassCard, SectionHead } from "@/components/shared"
import { Stagger, StaggerItem } from "@/components/motion"

/* Inline WhatsApp glyph — lucide dropped its brand icons */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.588 5.373l-.998 3.648 3.909-1.025zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.241-.579-.486-.5-.668-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
    </svg>
  )
}

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
          tag="Our Team"
          title="The architectural team"
          sub="The architects behind UCS Premier Consults — from design leadership to on-site delivery across every project."
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
                      style={{ filter: "grayscale(0.55) contrast(1.06) brightness(0.95) saturate(0.9)" }}
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
                  {/* Uniform brand duotone so the varied photos read as one set */}
                  <div aria-hidden="true" className="absolute inset-0 bg-ucs-navy/30 mix-blend-multiply" />
                  <div aria-hidden="true" className="absolute inset-0 bg-cyan-sig/10 mix-blend-screen" />
                  <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-15" />
                  {/* Name + title + WhatsApp sit over the base of the portrait */}
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-midnight via-midnight/75 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-heading text-[17px] font-semibold tracking-[-0.01em] text-white">{m.name}</h3>
                    <p className="eyebrow mt-1.5 text-[9.5px] tracking-[0.16em] text-cyan-sig">{m.role}</p>
                    {m.phone && (
                      <a
                        href={`https://wa.me/${m.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Message ${m.name} on WhatsApp`}
                        className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-cloud/75 transition-colors duration-200 hover:text-cyan-sig focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-sig"
                      >
                        <WhatsAppIcon className="size-3.5 text-cyan-sig" />
                        {m.phone}
                      </a>
                    )}
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
