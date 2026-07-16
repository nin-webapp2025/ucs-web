import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { contact } from "@/lib/content"
import { Container, GlassCard, Reveal, SectionHead } from "@/components/shared"
import { ContactForm } from "@/components/ContactForm"

export function Contact() {
  return (
    <section id="contact" className="relative bg-midnight py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(900px 500px at 10% 100%, rgba(7,148,217,0.10), transparent 62%)" }}
      />
      <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0 opacity-60" />
      <Container>
        <SectionHead
          tag="Contact"
          title="Request a consultation"
          sub="Tell us about your project and the right specialist on our team will respond immediately."
        />
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <GlassCard hover={false} className="h-full p-7 md:p-8">
              <ContactForm />
            </GlassCard>
          </Reveal>

          <Reveal delay={0.12}>
            <GlassCard hover={false} className="h-full p-7">
              <h3 className="font-heading text-[16px] font-semibold text-white">Reach us directly</h3>
              <ul className="mt-5 space-y-4">
                {[
                  [MapPin, contact.address],
                  [Phone, contact.phone],
                  [Mail, contact.email],
                  [Clock, contact.hours],
                ].map(([IconC, val]) => {
                  const I = IconC as typeof MapPin
                  return (
                    <li key={String(val)} className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-cyan-sig/25 bg-cyan-sig/5 text-cyan-sig">
                        <I className="size-4" aria-hidden="true" />
                      </span>
                      <span className="pt-1.5 text-[13.5px] leading-relaxed text-cloud/65">{String(val)}</span>
                    </li>
                  )
                })}
              </ul>
              {/* Map placeholder — swap for an embed when the office location is final */}
              <div className="bg-blueprint relative mt-6 flex h-40 items-center justify-center overflow-hidden rounded-xl border border-border bg-inknavy">
                <span aria-hidden="true" className="blink absolute top-[38%] left-[52%] size-2 rounded-full bg-cyan-sig shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                <span className="eyebrow text-[10px] tracking-[0.2em] text-cloud/40">Map placeholder</span>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
