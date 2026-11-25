import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { expertise } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

function SkillList({ skills }: { skills: string[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2">
      {skills.map((skill) => (
        <li key={skill} className="flex items-baseline gap-3 border-t border-ink/12 py-4 pr-4">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-clay" aria-hidden="true" />
          <span className="text-[1rem] leading-snug font-medium">{skill}</span>
        </li>
      ))}
    </ul>
  )
}

/** Desktop: an index of categories with a detail panel. Mobile: an accordion. */
export function Expertise() {
  const [active, setActive] = useState(0)
  const [openMobile, setOpenMobile] = useState<number | null>(0)
  const reduce = useReducedMotion()
  const current = expertise[active]

  return (
    <section id="expertise" className="bg-ivory-dim py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <h2 data-split className="display max-w-[14ch] text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">
          Areas of expertise
        </h2>

        {/* Desktop */}
        <div className="mt-16 hidden grid-cols-12 gap-10 lg:grid">
          <div role="tablist" aria-label="Expertise areas" aria-orientation="vertical" className="col-span-6 flex flex-col">
            {expertise.map((area, i) => (
              <button
                key={area.title}
                type="button"
                role="tab"
                id={`exp-tab-${i}`}
                aria-selected={active === i}
                aria-controls="exp-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault()
                    const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + expertise.length) % expertise.length
                    setActive(next)
                    document.getElementById(`exp-tab-${next}`)?.focus()
                  }
                }}
                className={`group flex items-center justify-between border-t border-ink/15 py-5 text-left transition-colors duration-300 last:border-b ${
                  active === i ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
                }`}
              >
                <span className="display text-[clamp(1.9rem,2.8vw,2.75rem)] leading-tight">{area.title}</span>
                <ArrowRight
                  size={26}
                  strokeWidth={1.25}
                  className={`text-clay transition-all duration-500 ${active === i ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <div className="col-span-6 col-start-7">
            <div
              id="exp-panel"
              role="tabpanel"
              aria-labelledby={`exp-tab-${active}`}
              className="frame sticky top-28 min-h-[420px] bg-paper p-10 xl:p-12"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.title}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <p className="display text-[2.25rem] leading-tight italic">{current.title}</p>
                  <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink-soft">{current.summary}</p>
                  <div className="mt-10">
                    <SkillList skills={current.skills} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile and tablet */}
        <div className="mt-12 lg:hidden">
          {expertise.map((area, i) => {
            const isOpen = openMobile === i
            return (
              <div key={area.title} className="border-t border-ink/15 last:border-b">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`exp-acc-${i}`}
                    onClick={() => setOpenMobile(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="display text-[clamp(1.6rem,6vw,2.2rem)] leading-tight">{area.title}</span>
                    <Plus
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className={`shrink-0 text-clay transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`exp-acc-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[1rem] leading-relaxed text-ink-soft">{area.summary}</p>
                      <div className="pb-6">
                        <SkillList skills={area.skills} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
