import { ArrowUpRight, GalleryHorizontal } from 'lucide-react'
import { useState } from 'react'
import { carousels, posts, workBrand, type WorkItem } from '../work'
import { go } from './Nav'
import { WorkViewer } from './WorkViewer'

function Thumb({ item, sizes }: { item: WorkItem; sizes: string }) {
  const cover = item.slides[0]
  return (
    <img
      src={cover.src}
      srcSet={`${cover.srcSm} 480w, ${cover.src} 864w`}
      sizes={sizes}
      alt={cover.alt}
      width={864}
      height={1080}
      loading="lazy"
      decoding="async"
      className="frame relative block aspect-[4/5] w-full bg-ivory-dim object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5"
    />
  )
}

function CarouselCard({ item, onOpen }: { item: WorkItem; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="group block w-full text-left" aria-haspopup="dialog">
      <div className="relative">
        {/* Two cards peeking out behind the cover, so it reads as a swipeable set. */}
        <span
          aria-hidden="true"
          className="frame absolute inset-0 translate-x-2 translate-y-2 rotate-[1.5deg] border border-ink/8 bg-ivory-dim transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:rotate-[3deg]"
        />
        <span
          aria-hidden="true"
          className="frame absolute inset-0 translate-x-1 translate-y-1 rotate-[0.75deg] border border-ink/8 bg-sand/60 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:rotate-[1.5deg]"
        />
        <Thumb item={item} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-[0.75rem] font-bold text-ink shadow-sm backdrop-blur transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5">
          <GalleryHorizontal size={14} strokeWidth={1.75} aria-hidden="true" />
          {item.slides.length} slides
        </span>
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-5 flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-ink text-ivory opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight size={20} strokeWidth={1.5} />
        </span>
      </div>
      <p className="mt-6 text-[0.8125rem] font-semibold text-clay-deep">{item.tag}</p>
      <h4 className="display mt-1.5 text-[clamp(1.35rem,1.9vw,1.7rem)] leading-tight">
        <span className="link-line">{item.title}</span>
      </h4>
      <p className="mt-2.5 line-clamp-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-soft">{item.description}</p>
    </button>
  )
}

function PostCard({ item, onOpen }: { item: WorkItem; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="group block w-full text-left" aria-haspopup="dialog">
      <Thumb item={item} sizes="(min-width: 1024px) 23vw, 46vw" />
      <p className="mt-4 text-[0.75rem] font-semibold text-clay-deep">{item.tag}</p>
      <h4 className="mt-1 text-[0.9875rem] leading-snug font-bold">
        <span className="link-line">{item.title}</span>
      </h4>
    </button>
  )
}

function GroupHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-ink/12 pt-6" data-reveal>
      <h3 className="text-[0.8125rem] font-bold tracking-[0.06em] uppercase">{title}</h3>
      <span className="text-[0.8125rem] font-semibold text-ink-soft tabular-nums">{String(count).padStart(2, '0')}</span>
    </div>
  )
}

export function Work() {
  const [selected, setSelected] = useState<WorkItem | null>(null)

  return (
    <section id="work" className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 data-split className="display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02] md:col-span-7">
            Selected work
          </h2>
          <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink-soft md:col-span-5 md:pb-3" data-reveal>
            Instagram carousels and posts from my work at {workBrand}, a healthcare and nutrition brand. Open any piece to
            swipe through every slide.
          </p>
        </div>

        <div className="mt-16 md:mt-24">
          <GroupHeading title="Carousels" count={carousels.length} />
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
            {carousels.map((item) => (
              <li key={item.id} data-reveal>
                <CarouselCard item={item} onOpen={() => setSelected(item)} />
              </li>
            ))}
            <li data-reveal>
              <a
                href="#contact"
                onClick={(e) => go(e, 'contact')}
                className="frame group flex aspect-[4/5] w-full flex-col justify-between bg-ink p-8 text-ivory"
              >
                <span className="text-[0.8125rem] font-semibold text-sand">More on request</span>
                <span>
                  <span className="display block text-[clamp(1.9rem,2.8vw,2.6rem)] leading-[1.05]">
                    Want to see the <em className="text-sand">full archive?</em>
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
                    Let's talk
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-24 md:mt-32">
          <GroupHeading title="Single posts" count={posts.length} />
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4 lg:gap-y-14">
            {posts.map((item) => (
              <li key={item.id} data-reveal>
                <PostCard item={item} onOpen={() => setSelected(item)} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <WorkViewer item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
