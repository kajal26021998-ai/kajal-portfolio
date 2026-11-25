import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'
import { gallerySlides, galleryTopics, workBrand, type GalleryTopic } from '../work'
import { Lightbox } from './Lightbox'

type Filter = 'All' | GalleryTopic
const filters: Filter[] = ['All', ...galleryTopics]
const PAGE = 12

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [showAll, setShowAll] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduce = useReducedMotion()

  const items = useMemo(
    () => (filter === 'All' ? gallerySlides : gallerySlides.filter((s) => s.topic === filter)),
    [filter],
  )
  const visible = showAll ? items : items.slice(0, PAGE)

  const pick = (f: Filter) => {
    setFilter(f)
    setShowAll(false)
  }

  return (
    <section id="gallery" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <h2 data-split className="display max-w-[12ch] text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">
        Content &amp; creative gallery
      </h2>
      <p className="mt-6 max-w-[36rem] text-[1.0625rem] leading-relaxed text-ink-soft" data-reveal>
        Every slide and post from my {workBrand} work in one place, {gallerySlides.length} frames in all. Filter by
        topic and open any frame to see it full size.
      </p>

      <div className="-mx-5 mt-12 overflow-x-auto px-5 md:mx-0 md:px-0" data-reveal>
        <div role="group" aria-label="Filter gallery by topic" className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {filters.map((f) => {
            const count = f === 'All' ? gallerySlides.length : gallerySlides.filter((s) => s.topic === f).length
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => pick(f)}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                  filter === f
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-ink/20 text-ink-soft hover:border-ink/60 hover:text-ink'
                }`}
              >
                {f}
                <span className={`text-xs tabular-nums ${filter === f ? 'text-ivory/60' : 'text-ink-soft/70'}`}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((slide, i) => (
            <motion.li
              key={slide.id}
              layout={reduce ? false : 'position'}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group frame relative block w-full overflow-hidden bg-ivory-dim"
                aria-label={`Open ${slide.label}`}
                aria-haspopup="dialog"
              >
                <img
                  src={slide.srcSm}
                  alt={slide.alt}
                  width={480}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {items.length > PAGE && (
        <div className="mt-12 flex justify-center">
          <button type="button" onClick={() => setShowAll((v) => !v)} className="btn btn-outline">
            {showAll ? 'Show fewer' : `Show all ${items.length}`}
          </button>
        </div>
      )}

      <Lightbox items={visible} index={openIndex} onChange={setOpenIndex} />
    </section>
  )
}
