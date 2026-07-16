import { useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { contact } from "@/lib/content"

type ServiceLine =
  | "Comprehensive Consultancy"
  | "Engineering Design & Consultancy"
  | "Construction Supervision"
  | "Real Estate & PPP Development"
  | "Market Development & Management"
  | "Digital Services (GIS / BIM / Drone)"
  | "Other"

type Status = "idle" | "submitting" | "success" | "error"

interface FormData {
  name: string
  organization: string
  email: string
  phone: string
  service: ServiceLine
  location: string
  message: string
}

const SERVICES: ServiceLine[] = [
  "Comprehensive Consultancy",
  "Engineering Design & Consultancy",
  "Construction Supervision",
  "Real Estate & PPP Development",
  "Market Development & Management",
  "Digital Services (GIS / BIM / Drone)",
  "Other",
]

const initialData: FormData = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  service: "Comprehensive Consultancy", // most valuable enquiry, pre-selected
  location: "",
  message: "",
}

// Static site for now: flip to true once /api/contact (or a form service) exists.
const USE_BACKEND = false

export function ContactForm() {
  const [data, setData] = useState<FormData>(initialData)
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {}
    if (!data.name.trim()) next.name = "Enter your full name."
    if (!data.email.trim()) next.email = "Enter your email address."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Enter a valid email address."
    if (!data.phone.trim()) next.phone = "Enter a phone number we can reach you on."
    if (!data.message.trim()) next.message = "Tell us briefly about your project."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    if (!validate()) return
    setStatus("submitting")
    try {
      if (USE_BACKEND) {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error("Request failed")
      } else {
        // Simulate the network round-trip so the states read realistically.
        await new Promise((r) => setTimeout(r, 900))
      }
      setStatus("success")
      setData(initialData)
    } catch {
      setStatus("error")
    }
  }

  const fieldBase =
    "w-full rounded-[10px] border bg-white/[0.04] px-4 py-3 text-[14px] text-cloud " +
    "placeholder:text-cloud/35 transition-[border-color,box-shadow] duration-200 focus:outline-none " +
    "focus:border-cyan-sig/70 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]"

  const errClass = (f: keyof FormData) =>
    errors[f] ? "border-red-400/70" : "border-input"

  const label =
    "mb-1.5 block font-eyebrow text-[10.5px] font-medium uppercase tracking-[0.12em] text-cloud/60"

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          role="status"
          className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
        >
          <span className="inline-flex size-16 items-center justify-center rounded-full border border-verdant/40 bg-verdant/10 text-verdant shadow-[0_0_34px_-6px_rgba(22,163,74,0.5)]">
            <CheckCircle2 className="size-8" strokeWidth={1.5} />
          </span>
          <h3 className="font-heading text-xl font-semibold text-white">
            Your request has reached us
          </h3>
          <p className="max-w-sm text-[14px] leading-[1.7] text-cloud/65">
            Our team responds immediately during business hours. Expect to hear from us
            shortly at the email or phone number you provided.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 font-eyebrow text-[13px] font-medium tracking-[0.06em] text-cyan-sig underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-sig"
          >
            Send another request
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="grid gap-5"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={label}>Full name *</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                className={`${fieldBase} ${errClass("name")}`}
                placeholder="Jane Okafor"
              />
              {errors.name && <FieldError msg={errors.name} />}
            </div>
            <div>
              <label htmlFor="organization" className={label}>Organization</label>
              <input
                id="organization"
                type="text"
                autoComplete="organization"
                value={data.organization}
                onChange={(e) => update("organization", e.target.value)}
                className={`${fieldBase} border-input`}
                placeholder="Company or agency"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={label}>Email *</label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                className={`${fieldBase} ${errClass("email")}`}
                placeholder="you@company.com"
              />
              {errors.email && <FieldError msg={errors.email} />}
            </div>
            <div>
              <label htmlFor="phone" className={label}>Phone *</label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={`${fieldBase} ${errClass("phone")}`}
                placeholder="+234 ..."
              />
              {errors.phone && <FieldError msg={errors.phone} />}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className={label}>Service of interest</label>
              <select
                id="service"
                value={data.service}
                onChange={(e) => update("service", e.target.value as ServiceLine)}
                className={`${fieldBase} border-input appearance-none`}
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="bg-inknavy text-cloud">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location" className={label}>Project location</label>
              <input
                id="location"
                type="text"
                value={data.location}
                onChange={(e) => update("location", e.target.value)}
                className={`${fieldBase} border-input`}
                placeholder="State / city (optional)"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className={label}>Project brief *</label>
            <textarea
              id="message"
              rows={5}
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              className={`${fieldBase} ${errClass("message")} resize-none`}
              placeholder="Scope, objectives, timeline, or any details that help us prepare."
            />
            {errors.message && <FieldError msg={errors.message} />}
          </div>

          {status === "error" && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
              <p className="text-[13.5px] text-red-300">
                Something went wrong sending your request. Please try again, or email us
                directly at {contact.email}.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="shine bg-ucs-gradient mt-1 inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 font-heading text-[14.5px] font-semibold text-white shadow-[0_14px_34px_-14px_rgba(7,148,217,0.8)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-14px_rgba(7,148,217,0.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-sig active:translate-y-px disabled:pointer-events-none disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending
              </>
            ) : (
              "Request a Consultation"
            )}
          </button>

          <p className="text-center text-[12px] text-cloud/50">
            We respond immediately during business hours. Your details are used only to
            reply to this enquiry.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-[12px] text-red-400">
      <AlertCircle className="size-3" />
      {msg}
    </p>
  )
}
