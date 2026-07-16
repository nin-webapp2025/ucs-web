import { projects } from "@/lib/content"
import { Container, SectionHead } from "@/components/shared"
import { Stagger, StaggerItem, Tilt } from "@/components/motion"
import { cn } from "@/lib/utils"

/* Bento portfolio — first tile is the feature; placeholders keep the blueprint
   treatment until real UCS project photography arrives. */
const spans = [
  "sm:col-span-2 sm:row-span-2", // feature — 2×2 + five singles closes a 3-col grid exactly
  "", "", "", "", "",
]

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(880px 520px at 95% 20%, rgba(7,148,217,0.10), transparent 62%)," +
            "linear-gradient(180deg, #060B1A 0%, #081026 100%)",
        }}
      />
      <Container>
        <SectionHead
          tag="Projects"
          title="Selected work across Nigeria"
          refNote="Ref · Portfolio (imagery pending)"
          sub="Representative project categories — real project photography will replace these placeholders as it becomes available."
        />
        <Stagger className="grid auto-rows-[190px] gap-4 sm:grid-cols-3 md:auto-rows-[210px]">
          {projects.map((p, i) => (
            <StaggerItem key={p.title} className={cn("h-full", spans[i])} variant="scale">
              <Tilt className="size-full" max={7}>
                <figure className="glass group relative size-full overflow-hidden rounded-2xl">
                  {/* Blueprint placeholder treatment — real project photography drops in later */}
                  <div className="absolute inset-0 overflow-hidden bg-inknavy">
                    <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-70 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100" />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                      style={{ background: "radial-gradient(75% 60% at 68% 28%, rgba(7,148,217,0.34), transparent 70%)" }}
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-midnight/92 via-midnight/25 to-transparent" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 [transform:translateZ(45px)]">
                    <span className="eyebrow text-[9.5px] tracking-[0.18em] text-cyan-sig">{p.tag}</span>
                    <h3 className={cn("mt-1 font-heading font-semibold text-white", i === 0 ? "text-[20px]" : "text-[15px]")}>
                      {p.title}
                    </h3>
                  </figcaption>
                  {/* Hover corner tick */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 size-10 rounded-bl-2xl border-b border-l border-cyan-sig/0 transition-colors duration-300 group-hover:border-cyan-sig/50"
                  />
                </figure>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
