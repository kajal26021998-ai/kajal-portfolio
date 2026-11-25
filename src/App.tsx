import { motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'
import { About } from './components/About'
import { Craft } from './components/Craft'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Expertise } from './components/Expertise'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Work } from './components/Work'
import { initSmoothScroll } from './lib/scroll'
import { useScrollAnimations } from './lib/useScrollAnimations'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-clay"
      style={{ scaleX }}
    />
  )
}

export default function App() {
  const main = useRef<HTMLElement>(null)
  useEffect(() => initSmoothScroll(), [])
  useScrollAnimations(main)

  return (
    <>
      <a
        href="#about"
        className="sr-only z-[90] bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main ref={main}>
        <Hero />
        <Craft />
        <About />
        <Expertise />
        <Experience />
        <Work />
        <Gallery />
        <Education />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
