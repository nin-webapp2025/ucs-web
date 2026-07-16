import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CtaLink } from "@/components/shared"
import logo from "@/assets/ucs-logo.jpeg"

const links = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why UCS" },
  { href: "#leadership", label: "Leadership" },
  { href: "#digital", label: "Digital" },
  { href: "#projects", label: "Projects" },
  { href: "#careers", label: "Careers" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-midnight/90 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main">
        <a
          href="#top"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-sig"
        >
          {/* Official logo on its cream plate (knockout export pending per brand guide) */}
          <span className="flex size-11 items-center justify-center overflow-hidden rounded-[10px] bg-ucs-cream p-1 shadow-[0_8px_20px_-8px_rgba(7,148,217,0.55)]">
            <img src={logo} alt="" className="size-full object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-[15px] font-bold tracking-[-0.01em] text-white">
              UCS Premier <span className="text-ucs-sky">Consults</span>
            </span>
            <span className="eyebrow block text-[9px] tracking-[0.24em] text-cloud/60">Engineering Consultancy</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-cloud/85 transition-[color] duration-300 ease-out hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-sig"
              >
                {l.label}
                {/* Underline grows from center on hover — smoother than a bg swap */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3.5 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-cyan-sig to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <CtaLink href="#contact" className="px-5 py-2.5 text-[13.5px]">
            Request a Consultation
          </CtaLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 text-cloud transition-[background-color] duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan-sig lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-white/10 bg-midnight/95 backdrop-blur-md lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-[15px] font-medium text-cloud/90 transition-[background-color] duration-200 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-cyan-sig"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <CtaLink href="#contact" className="w-full" >
                Request a Consultation
              </CtaLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
