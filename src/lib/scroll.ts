import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

export const NAV_HEIGHT = 72

let lenis: Lenis | null = null

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Smooth scrolling driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ lerp: 0.11 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    // Sections carry scroll-margin-top for the fixed nav; Lenis respects it.
    // force: the mobile menu may still have Lenis stopped at this moment.
    lenis.scrollTo(id === 'home' ? 0 : el, { duration: 1.4, force: true })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
  history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`)
}

/** Stops page scroll while a dialog or the mobile menu is open. */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
