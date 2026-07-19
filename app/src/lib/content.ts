// Single source of copy — extracted from Content.docx + copy/brand-kit.md.
// Contact details are placeholders pending real client data (brand-kit appendix).

export const company = {
  name: "UCS Premier Consults LTD",
  shortName: "UCS Premier Consults",
  tagline: ["Innovative Thinking.", "Technical Excellence.", "Reliable Delivery."],
  heroSub:
    "Multidisciplinary engineering consultancy for public and private sector projects — from feasibility to final delivery, integrated under one roof.",
  positioning:
    "A modern, technology-forward consultancy pairing a young, highly skilled technical team with rigorous adherence to Nigerian regulations and international engineering standards.",
}

export const sectors = [
  "Government Agencies & Ministries",
  "Private Developers & Construction Firms",
  "Financial Institutions",
  "Development Partners",
  "Real Estate Investors",
  "Market Authorities & Local Governments",
  "PPP Sponsors",
]

export const highlights = [
  {
    title: "Engineering Excellence",
    body: "Innovative and sustainable consultancy services with a commitment to quality, safety, and technical excellence across civil, structural, transportation, and infrastructure projects.",
    icon: "DraftingCompass",
  },
  {
    title: "Experienced Professionals",
    body: "A multidisciplinary team of engineers, architects, quantity surveyors, project managers, environmental specialists, and ICT professionals delivering world-class solutions.",
    icon: "Users",
  },
  {
    title: "Infrastructure Development",
    body: "Successfully delivering roads, bridges, drainage systems, buildings, water supply projects, and public infrastructure that support sustainable community development.",
    icon: "Landmark",
  },
  {
    title: "Digital Innovation",
    body: "GIS, Building Information Modeling (BIM), drone surveys, digital project monitoring, and online client service portals — modern technology on every project.",
    icon: "Map",
  },
  {
    title: "Quality Assurance",
    body: "Projects that comply with Nigerian regulations, international engineering standards, and client specifications through robust quality management systems.",
    icon: "BadgeCheck",
  },
  {
    title: "Safety First",
    body: "A strong Health, Safety, and Environment culture that prioritizes the well-being of workers, clients, and surrounding communities on every project.",
    icon: "HardHat",
  },
]

export type Stat = {
  value: number | null
  display?: string
  suffix?: string
  label: string
}

export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Engineering & Construction Projects Delivered" },
  { value: 15, suffix: "+", label: "Years of Combined Professional Experience" },
  { value: 100, suffix: "%", label: "Commitment to Quality & Safety" },
  { value: 20, suffix: "+", label: "Professional Engineers & Technical Experts" },
  { value: 4, suffix: "+", label: "Government & Private Sector Partners" },
  { value: 20, suffix: "+", label: "Satisfied Clients & Beneficiaries" },
  { value: null, display: "24/7", label: "Client Support" },
  { value: null, display: "Nationwide", label: "Project Delivery Across Nigeria" },
]

export const services = [
  {
    title: "Civil & Structural Engineering",
    body: "Design and analysis for buildings, bridges, and structures — executed with precision and professionalism.",
    icon: "Building2",
  },
  {
    title: "Transportation & Highways",
    body: "Roads, bridges, drainage systems, and traffic and transport infrastructure across Nigeria.",
    icon: "Route",
  },
  {
    title: "Water Resources & Public Infrastructure",
    body: "Water supply, drainage, sanitation, and community infrastructure that supports development.",
    icon: "Droplets",
  },
  {
    title: "Feasibility & Engineering Design",
    body: "Feasibility studies, engineering design, and project planning that de-risk delivery from day one.",
    icon: "FileSearch",
  },
  {
    title: "Construction Supervision",
    body: "On-site supervision, quality control, and contract administration that protect your investment.",
    icon: "ClipboardCheck",
  },
  {
    title: "Project Management",
    body: "End-to-end planning, coordination, monitoring, and delivery — on schedule and on budget.",
    icon: "GanttChartSquare",
  },
  {
    title: "Quantity Surveying",
    body: "Cost planning, estimation, and value management for predictable project economics.",
    icon: "Calculator",
  },
  {
    title: "Real Estate & Property Development",
    body: "Real estate solutions, estate planning, facility management, and PPP project development.",
    icon: "KeyRound",
  },
  {
    title: "Market Development & Management",
    body: "Planning, digitization, and management of modern markets — online shop allocation, payments, and ownership verification.",
    icon: "Store",
  },
]

export const whyUs = {
  intro:
    "We combine innovation, technical excellence, and professionalism to deliver engineering and infrastructure solutions that exceed expectations — a trusted partner for public and private sector projects across Nigeria.",
  items: [
    {
      title: "Young, Vibrant & Promising Technical Team",
      body: "Fresh ideas, modern engineering practices, and a solution-driven mindset — grounded in industry standards and practical experience.",
    },
    {
      title: "Technical Excellence",
      body: "Multidisciplinary expertise across civil, structural, transportation, water resources, supervision, project management, and quantity surveying.",
    },
    {
      title: "Innovative Engineering Solutions",
      body: "Modern tools, digital technologies, and data-driven approaches that yield practical, sustainable, cost-effective designs.",
    },
    {
      title: "Quality Without Compromise",
      body: "Applicable engineering standards, regulatory requirements, and rigorous QA on every deliverable — durability, safety, long-term value.",
    },
    {
      title: "Client-Focused Service",
      body: "Every client is a partner. Open communication, transparency, and responsiveness aligned to objectives, budgets, and timelines.",
    },
    {
      title: "Timely Project Delivery",
      body: "Efficient planning, proactive management, and an experienced technical team keep projects on schedule at a high standard.",
    },
  ],
}

export const digital = {
  eyebrow: "Digital Innovation",
  title: "Engineering, upgraded by technology",
  body: "We leverage modern technologies to enhance accuracy, efficiency, and transparency at every project stage.",
  items: [
    { title: "GIS", body: "Geographic Information Systems for spatial planning and asset intelligence.", icon: "Map" },
    { title: "BIM", body: "Building Information Modeling for coordinated, clash-free design.", icon: "Boxes" },
    { title: "Drone Surveys", body: "Rapid aerial capture for surveys, inspections, and progress tracking.", icon: "Radar" },
    { title: "Digital Monitoring", body: "Live project monitoring dashboards and online client service portals.", icon: "MonitorCheck" },
  ],
}

export const process = [
  {
    step: "01",
    title: "Feasibility & Studies",
    body: "Technical, economic, and environmental studies that establish viability before commitments are made.",
  },
  {
    step: "02",
    title: "Engineering Design",
    body: "Detailed multidisciplinary design and planning to applicable standards and regulatory requirements.",
  },
  {
    step: "03",
    title: "Construction Supervision",
    body: "On-site supervision, quality control, and contract administration through the build phase.",
  },
  {
    step: "04",
    title: "Delivery & Handover",
    body: "Commissioning, documentation, and handover — delivered on schedule, backed by 24/7 client support.",
  },
]

export const projects = [
  { title: "Highway & Interchange Works", tag: "Transportation", img: "https://placehold.co/800x600/0A1330/22D3EE?text=+" },
  { title: "Bridge Design & Supervision", tag: "Civil & Structural", img: "https://placehold.co/800x600/060B1A/0794D9?text=+" },
  { title: "Urban Drainage Systems", tag: "Water Resources", img: "https://placehold.co/800x600/0A1330/076CB0?text=+" },
  { title: "Public Buildings & Facilities", tag: "Buildings", img: "https://placehold.co/800x600/060B1A/22D3EE?text=+" },
  { title: "Community Water Supply", tag: "Public Infrastructure", img: "https://placehold.co/800x600/0A1330/0794D9?text=+" },
  { title: "Modern Market Development", tag: "Markets & PPP", img: "https://placehold.co/800x600/060B1A/076CB0?text=+" },
]

export const sustainability = {
  eyebrow: "Safety & Sustainability",
  title: "HSE built into every stage",
  body: "Health, Safety, and Environmental principles are integrated into every stage of our work. We are committed to protecting people, preserving the environment, and promoting sustainable development — designing environmentally responsible infrastructure that promotes resilience, resource efficiency, and long-term economic growth.",
  points: ["HSE integrated at every project stage", "Environmentally responsible design", "Resilient, resource-efficient infrastructure"],
}

export const careers = {
  eyebrow: "Capacity Building",
  title: "Building the engineers of tomorrow",
  body: "We support the development of young professionals through internship opportunities, NYSC placements, technical mentoring, and continuous professional development.",
  points: ["Internship opportunities", "NYSC placements", "Technical mentoring", "Continuous professional development"],
}

// Management board. Cards show PHOTO + NAME + TITLE only.
// To add a headshot: drop the image file into  app/public/team/  and set `image`
// to its path, e.g.  image: "/team/jane-okafor.jpg". Portrait crops best (4:5).
// While `image` is empty the card shows an initials placeholder. Array order = display order.
export type Member = {
  name: string
  role: string
  phone?: string // display form; the WhatsApp/tel link is derived from the digits
  image?: string
}

export const management: Member[] = [
  { name: "Muhammad Bashir Abdullahi", role: "Architect & Head of Architectural Department", phone: "+234 803 592 9308", image: "/team/muhammad-bashir-abdullahi.jpeg" },
  { name: "Yusuf Aliyu", role: "Architect", phone: "+234 703 188 6735", image: "/team/yusuf-aliyu.jpeg" },
  { name: "Adam Abdulwahid", role: "Site Architect", phone: "+234 903 252 0108", image: "/team/adam-abdulwahid.jpeg" },
  { name: "Bala Abubakar Hassan", role: "Site Architect", phone: "+234 806 633 7088", image: "/team/bala-abubakar-hassan.jpeg" },
  { name: "Abubakar Alhassan Sanusi", role: "Site Architect", phone: "+234 816 235 5381", image: "/team/abubakar-alhassan-sanusi.jpeg" },
  { name: "Sani S. Adoga", role: "Site Architect", phone: "+234 805 405 2888", image: "/team/sani-adoga.jpeg" },
]

export const contact = {
  address: "No 14, Datunchi Plaza, off Mike Akhigbe Street, Jabi, Abuja",
  phone: "+234 813 846 5702",
  email: "Info@ucsconsults.com",
  hours: "Mon–Fri, 8:00 — 17:00 WAT", // placeholder — confirm business hours
  // Datunchi Plaza, Jabi, Abuja (9.0603520, 7.4481664)
  mapEmbedSrc: "https://www.google.com/maps?q=9.0603520,7.4481664&z=16&hl=en&output=embed",
  mapLink: "https://maps.app.goo.gl/ktdbEMFDsapqPHat5",
  projectTypes: [
    "Roads / Transportation",
    "Bridges & Structures",
    "Water & Public Infrastructure",
    "Buildings & Real Estate",
    "Market Development",
    "Digital / GIS / BIM Services",
    "Other",
  ],
}
