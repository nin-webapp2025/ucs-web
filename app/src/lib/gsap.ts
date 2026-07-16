import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register once, globally.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
