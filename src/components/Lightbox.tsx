import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import { galleryFilters, type GallerySlide } from '../work'
import { useDialog } from '../lib/useDialog'

interface Props {
  items: GallerySlide[]
  index: number | null
  onChange: (index: number | null) => void
}

export function Lightbox({ items, index, onChange }: Props) {
  const open = index !== null && items[index] !== undefined
  const close = () => onChange(null)
  const panelRef = useDialog<HTMLDivElement>(open, close)
  const step = (dir: 1 | -1) => {
    if (index === null) return
    onChange((index + dir + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  const item = open ? items[index] : null
  const typeLabel = galleryFilters.find((f) => f.id === item?.types[0])?.label

  /** "9 / 16" -> 0.5625, fits the frame to the viewport height. */
  const ratio = item?.ratio ?? '4 / 5'
  const [rw, rh] = ratio.split('/').map(Number)
  const mediaStyle = {
    aspectRatio: ratio,
    width: `min(100%, calc((100dvh - 7rem) * ${rw && rh ? rw / rh : 0.8}))`,
  }

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.label}
          className="on-ink fixed inset-0 z-[70] flex flex-col bg-ink text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10">
            <p className="min-w-0 truncate text-sm text-ivory/70">
              <span className="text-sand">{typeLabel}</span>
              <span className="mx-2 text-ivory/30">/</span>
              {item.label}
            </p>
            <button
              type="button"
              onClick={close}
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center"
              aria-label="Close"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-6 md:px-24" onClick={close}>
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={mediaStyle}
              className="frame overflow-hidden bg-ink-soft"
              onClick={(e) => e.stopPropagation()}
            >
              {item.video ? (
                <video
                  src={item.video}
                  poster={item.src}
                  controls
                  playsInline
                  aria-label={item.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
              )}
            </motion.div>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 backdrop-blur transition-colors hover:bg-ivory/20 md:left-8 md:bg-ivory/10"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 backdrop-blur transition-colors hover:bg-ivory/20 md:right-8 md:bg-ivory/10"
                  aria-label="Next"
                >
                  <ChevronRight size={24} strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
