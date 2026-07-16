import { Navbar } from "@/sections/Navbar"
import { Hero } from "@/sections/Hero"
import { TrustBar } from "@/sections/TrustBar"
import { Highlights } from "@/sections/Highlights"
import { Stats } from "@/sections/Stats"
import { Services } from "@/sections/Services"
import { WhyUs } from "@/sections/WhyUs"
import { Management } from "@/sections/Management"
import { Digital } from "@/sections/Digital"
import { Process } from "@/sections/Process"
import { Projects } from "@/sections/Projects"
import { Safety, Careers, CtaBand } from "@/sections/Bands"
import { Contact } from "@/sections/Contact"
import { Footer } from "@/sections/Footer"
import { SmoothScroll, ScrollProgress, CustomCursor } from "@/components/motion"

export default function App() {
  return (
    <SmoothScroll>
      <a
        href="#highlights"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ucs-navy"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <div aria-hidden="true" className="noise" />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Highlights />
        <Stats />
        <Services />
        <WhyUs />
        <Management />
        <Digital />
        <Process />
        <Projects />
        <Safety />
        <Careers />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
