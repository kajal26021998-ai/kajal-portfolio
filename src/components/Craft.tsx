import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useRef, type CSSProperties } from 'react'
import { craft, pillTints } from '../content'
import { go, ResumeLink } from './Nav'

/** Pill positions over the giant word, as % of the word block. */
const spots: CSSProperties[] = [
  { top: '58%', left: '1%' },
  { top: '30%', left: '9%' },
  { top: '64%', left: '25%' },
  { top: '24%', left: '44%' },
  { top: '60%', left: '52%' },
  { top: '30%', left: '78%' },
  { top: '70%', left: '82%' },
]
const tilt = [-6, 7, -9, 3, -4, 10, -6]

/**
 * A poster-style band: one giant word with the skills that make it up
 * scattered over it. Pills can be dragged around on pointer devices.
 */
export function Craft() {
  const area = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  return (
    <section aria-labelledby="craft-word" className="mx-auto max-w-[1400px] px-5 pt-24 pb-20 md:px-10 md:pt-32 md:pb-28">
      <p className="max-w-[26rem] text-[1.0625rem] leading-relaxed text-ink-soft" data-reveal>
        {craft.intro}
      </p>

      <div ref={area} className="relative mt-6 select-none md:mt-2">
        <h2
          id="craft-word"
          data-split
          className="poster text-center text-[clamp(5.5rem,27.5vw,30rem)] text-ink uppercase"
        >
          {craft.word}
        </h2>
        <ul aria-label="Kinds of content" className="mt-6 flex flex-wrap gap-2.5 md:absolute md:inset-0 md:mt-0 md:block">
          {craft.pills.map((pill, i) => (
            <motion.li
              key={pill}
              className="md:absolute"
              style={spots[i % spots.length]}
              drag={!reduce}
              dragConstraints={area}
              dragElastic={0.18}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
              whileHover={reduce ? undefined : { scale: 1.06 }}
              whileDrag={{ scale: 1.1, zIndex: 5 }}
              initial={reduce ? false : { opacity: 0, y: 24, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt[i] }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 220, damping: 16 }}
            >
              <span
                className="inline-block cursor-grab rounded-full border border-ink/10 px-3 py-1.5 text-[0.75rem] font-bold whitespace-nowrap text-ink shadow-[0_10px_24px_-14px_rgba(32,37,31,0.55)] active:cursor-grabbing sm:px-5 sm:py-2.5 sm:text-[0.9375rem]"
                style={{ background: pillTints[i % pillTints.length] }}
              >
                {pill}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-0">
        <div className="md:col-span-5 md:border-r md:border-ink/12 md:pr-10" data-reveal>
          <h3 className="text-[0.8125rem] font-bold tracking-[0.06em] text-clay-deep uppercase">{craft.listTitle}</h3>
          <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
            {craft.list.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[0.9875rem] font-medium">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7 md:pl-10" data-reveal>
          <div className="grid max-w-[36rem] gap-4 text-[1.0625rem] leading-relaxed text-ink-soft">
            {craft.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn btn-solid">
              Let's talk <ArrowUpRight size={16} strokeWidth={1.75} />
            </a>
            <ResumeLink className="btn btn-outline" label="Download resume" />
          </div>
        </div>
      </div>
    </section>
  )
}
