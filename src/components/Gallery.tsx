import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import { galleryFilters, gallerySlides, workBrand, type GalleryFilterId } from '../work'
import { Lightbox } from './Lightbox'

type Filter = GalleryFilterId
const PAGE = 12

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [showAll, setShowAll] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduce = useReducedMotion()

  const items = useMemo(
    () => (filter === 'all' ? gallerySlides : gallerySlides.filter((s) => s.types.includes(filter))),
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
        Posts, carousels and campaign creatives from my {workBrand} work in one place. Filter by format and open any
        frame to see it full size.
      </p>

      <div className="-mx-5 mt-12 overflow-x-auto px-5 md:mx-0 md:px-0" data-reveal>
        <div role="group" aria-label="Filter gallery" className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {galleryFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => pick(f.id)}
              className={`min-h-[44px] rounded-full border px-5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                filter === f.id
                  ? 'border-ink bg-ink text-ivory'
                  : 'border-ink/20 text-ink-soft hover:border-ink/60 hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 && (
        <p className="mt-12 border-t border-ink/15 pt-8 text-ink-soft">
          Work for {galleryFilters.find((f) => f.id === filter)?.label.toLowerCase()} is being added. Check back soon.
        </p>
      )}

      <ul className="mt-12 columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((slide, i) => (
            <motion.li
              key={slide.id}
              layout={reduce ? false : 'position'}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 break-inside-avoid md:mb-5"
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
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: slide.ratio ?? '4 / 5' }}
                  className="block w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
                {slide.video && (
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-ivory backdrop-blur"
                  >
                    <Play size={15} strokeWidth={1.75} className="ml-0.5" />
                  </span>
                )}
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
