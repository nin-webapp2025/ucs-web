import { Marquee } from "@/components/ui/marquee"
import { sectors } from "@/lib/content"

/* Who commissions UCS — glass strip on the midnight canvas */
export function TrustBar() {
  return (
    <section aria-label="Sectors we serve" className="relative bg-midnight py-6">
      <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0" />
      <div className="relative mx-auto max-w-7xl overflow-hidden">
        <Marquee pauseOnHover className="[--duration:38s] [--gap:3.5rem]">
          {sectors.map((s) => (
            <span key={s} className="eyebrow flex items-center gap-3 text-[11px] tracking-[0.18em] whitespace-nowrap text-cloud/55">
              <span aria-hidden="true" className="blink size-1.5 rounded-full bg-cyan-sig" />
              {s}
            </span>
          ))}
        </Marquee>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-midnight" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-midnight" />
      </div>
      <div aria-hidden="true" className="glow-line absolute inset-x-0 bottom-0 opacity-60" />
    </section>
  )
}
