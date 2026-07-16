import { lazy, Suspense } from "react"
import { useScroll } from "framer-motion"
import { digital } from "@/lib/content"
import { Container, GlassCard, Icon, SectionHead } from "@/components/shared"
import { Stagger, StaggerItem, useNearViewport } from "@/components/motion"
import { BorderBeam } from "@/components/ui/border-beam"

// Code-split three.js so it only loads for this section
const BimBuilding = lazy(() => import("@/components/BimBuilding"))

export function Digital() {
  // One ref serves both the scroll driver and the "near viewport" mount gate,
  // so three.js only runs while the section is on/near screen.
  const { ref: stageRef, near } = useNearViewport<HTMLDivElement>("500px")
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] })

  return (
    <section id="digital" className="relative isolate overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(820px 480px at 12% 10%, rgba(34,211,238,0.09), transparent 60%)," +
            "linear-gradient(200deg, #0A1330 0%, #060B1A 70%)",
        }}
      />
      <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0" />
      <Container>
        <SectionHead tag="Digital" title={digital.title} sub={digital.body} />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Flagship 3D showpiece — a BIM model that assembles + rotates on scroll */}
          <div ref={stageRef} className="glass relative h-full min-h-[380px] overflow-hidden rounded-2xl">
            <BorderBeam size={150} duration={9} colorFrom="#22D3EE" colorTo="#0794D9" borderWidth={1.5} />
            <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-40" />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 60% at 60% 45%, rgba(7,148,217,0.16), transparent 70%)" }}
            />
            {/* The WebGL model fills the card; only mounted while near the
                viewport so three.js isn't rendering off-screen. */}
            <div className="absolute inset-0">
              {near && (
                <Suspense fallback={null}>
                  <BimBuilding progress={scrollYProgress} />
                </Suspense>
              )}
            </div>
            {/* HUD overlay */}
            <div className="pointer-events-none absolute top-5 left-6">
              <p className="eyebrow text-[10px] tracking-[0.2em] text-cyan-sig">BIM model · assembling</p>
              <p className="mt-1 text-[11.5px] text-cloud/50">7 levels · coordinated · clash-free</p>
            </div>
            <div className="pointer-events-none absolute right-6 bottom-5 text-right">
              <p className="eyebrow text-[10px] tracking-[0.2em] text-cloud/40">GIS-referenced</p>
              <p className="eyebrow mt-1 text-[10px] tracking-[0.2em] text-verdant">● All systems compliant</p>
            </div>
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {digital.items.map((d) => (
              <StaggerItem key={d.title} className="h-full">
                <GlassCard className="h-full p-6">
                  <Icon name={d.icon} className="mb-4 size-6 text-cyan-sig" />
                  <h3 className="font-heading text-[16px] font-semibold text-white">{d.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-cloud/60">{d.body}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  )
}
