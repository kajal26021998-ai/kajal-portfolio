import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { workBrand, type WorkItem } from '../work'
import { useDialog } from '../lib/useDialog'

interface Props {
  item: WorkItem | null
  onClose: () => void
}

const SWIPE_PX = 50

/** Full-screen viewer for a carousel or single post: arrows, keys, swipe and thumbnails. */
export function WorkViewer({ item, onClose }: Props) {
  const panelRef = useDialog<HTMLDivElement>(item !== null, onClose)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const swipeStart = useRef<number | null>(null)
  const count = item?.slides.length ?? 0

  useEffect(() => setIndex(0), [item])

  const step = (dir: 1 | -1) => setIndex((i) => Math.min(Math.max(i + dir, 0), count - 1))

  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  const slide = item?.slides[index]
  const multi = count > 1

  return createPortal(
    <AnimatePresence>
      {item && slide && (
        <motion.div
          key="work-viewer"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-title"
          data-lenis-prevent
          className="on-ink fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink text-ivory lg:overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-10">
            <p className="text-sm text-ivory/70">
              {item.format}
              {multi && (
                <span className="ml-3 tabular-nums text-ivory" aria-live="polite">
                  {index + 1} / {count}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 flex h-11 w-11 items-center justify-center"
              aria-label="Close"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 px-5 pb-10 md:px-10 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:gap-12 lg:pb-8">
            <div className="flex flex-col items-center lg:col-span-8 lg:min-h-0">
              <div
                className="relative flex w-full items-center justify-center lg:min-h-0 lg:flex-1"
                onPointerDown={(e) => (swipeStart.current = e.clientX)}
                onPointerUp={(e) => {
                  if (swipeStart.current === null) return
                  const dx = e.clientX - swipeStart.current
                  swipeStart.current = null
                  if (Math.abs(dx) > SWIPE_PX) step(dx < 0 ? 1 : -1)
                }}
              >
                <motion.img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  width={864}
                  height={1080}
                  draggable={false}
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="frame aspect-[4/5] w-[min(100%,calc((100dvh-15rem)*0.8))] min-w-[min(100%,16rem)] bg-ink-soft object-cover select-none"
                />
                {multi && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      disabled={index === 0}
                      className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/10 transition-colors hover:bg-ivory/20 disabled:opacity-30 md:left-4"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={24} strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      disabled={index === count - 1}
                      className="absolute right-0 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/10 transition-colors hover:bg-ivory/20 disabled:opacity-30 md:right-4"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={24} strokeWidth={1.5} />
                    </button>
                  </>
                )}
              </div>

              {multi && (
                <ul className="mt-5 flex max-w-full shrink-0 gap-2 overflow-x-auto pb-1" aria-label="Slides">
                  {item.slides.map((s, i) => (
                    <li key={s.src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === index ? 'true' : undefined}
                        className={`block overflow-hidden rounded-[8px] border-2 transition-opacity ${
                          i === index ? 'border-sand opacity-100' : 'border-transparent opacity-50 hover:opacity-90'
                        }`}
                      >
                        <img src={s.srcSm} alt="" width={48} height={60} loading="lazy" className="block h-[60px] w-12 object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lg:col-span-4 lg:self-center">
              <p className="text-[0.8125rem] font-semibold text-sand">
                {item.tag} <span className="text-ivory/55">for {workBrand}</span>
              </p>
              <h2 id="work-title" className="display mt-3 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.05]">
                {item.title}
              </h2>
              <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ivory/75">{item.description}</p>
              {multi && <p className="mt-6 text-sm text-ivory/55">Swipe, use the arrows or press the arrow keys.</p>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
