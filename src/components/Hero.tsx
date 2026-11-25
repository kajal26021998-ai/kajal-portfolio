import { useGSAP } from '@gsap/react'
import { ArrowDownRight } from 'lucide-react'
import { useRef, type CSSProperties } from 'react'
import { hero, pillTints, profile } from '../content'
import { gsap } from '../lib/scroll'
import { go, ResumeLink } from './Nav'

/**
 * Desktop pill positions. They sit in the open space left of the photo and
 * over her dark top, never on the face. Below lg they flow as a row instead.
 */
const pillSpots: CSSProperties[] = [
  { top: '20%', left: '-20%' },
  { top: '35%', left: '-9%' },
  { top: '50%', left: '-22%' },
  { bottom: '10%', right: '5%' },
  { bottom: '23%', right: '3%' },
]
const pillTilt = [-7, 5, 4, -5, 6]

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 })
        tl.from('.hero-card', { y: 40, autoAlpha: 0, duration: 1.2 }, 0)
          .from('.hero-line', { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.25)
          .from('.hero-photo', { y: 80, autoAlpha: 0, duration: 1.6 }, 0.35)
          .from('.hero-disc', { scale: 0.6, autoAlpha: 0, duration: 1.6 }, 0.3)
          .from('.hero-pill', { scale: 0, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: 'back.out(1.8)' }, 0.9)
          .from('.hero-fade', { y: 18, autoAlpha: 0, duration: 1, stagger: 0.07 }, 0.7)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="home" ref={root} className="px-3 pt-[84px] md:px-6">
      <div className="hero-card frame relative mx-auto grid min-h-[calc(100dvh-96px)] max-w-[1400px] grid-cols-1 overflow-hidden rounded-[28px] border border-ink/8 bg-paper lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-between gap-12 px-6 pt-10 pb-8 sm:px-10 lg:col-span-7 lg:py-14 lg:pl-14">
          <div>
            <p className="hero-fade flex items-center gap-3 text-[0.8125rem] font-bold tracking-[0.06em] text-clay-deep uppercase">
              <span className="h-px w-8 bg-clay" aria-hidden="true" />
              {hero.role}
            </p>
            <h1 className="mt-8">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="hero-line display block text-[clamp(4.2rem,10.5vw,10rem)] leading-[0.88] font-extrabold tracking-[-0.06em]">
                  {hero.greeting}
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line display block text-[clamp(2.1rem,4.4vw,4.2rem)] leading-[1.05]">
                  I'm <em className="text-clay-deep">{profile.name}</em>
                </span>
              </span>
            </h1>
            <p className="hero-fade mt-7 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink-soft md:text-lg">
              {hero.lead}
            </p>
            <div className="hero-fade mt-9 flex flex-wrap gap-3">
              <a href="#work" onClick={(e) => go(e, 'work')} className="btn btn-solid">
                View my work <ArrowDownRight size={17} strokeWidth={1.75} />
              </a>
              <ResumeLink className="btn btn-outline" label="Download resume" />
            </div>
          </div>

          <dl className="hero-fade grid max-w-[34rem] grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {hero.stats.map((s) => (
              <div key={s.value + s.label}>
                <dt className="sr-only">{s.label.replace('\n', ' ')}</dt>
                <dd>
                  <span className="display block text-[clamp(2rem,3.4vw,3rem)] leading-none">{s.value}</span>
                  <span className="mt-2 block text-[0.75rem] leading-snug font-semibold tracking-[0.04em] whitespace-pre-line text-ink-soft uppercase">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[540px] sm:min-h-[640px] lg:col-span-5 lg:min-h-0">
          <div
            aria-hidden="true"
            className="hero-disc absolute bottom-[4%] left-1/2 aspect-square w-[min(88%,520px)] -translate-x-1/2 rounded-full bg-gradient-to-b from-sand to-[#ead9c6]"
          />
          <img
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            width={900}
            height={1015}
            fetchPriority="high"
            decoding="async"
            className="hero-photo absolute bottom-0 left-1/2 h-[76%] w-auto sm:h-[82%] lg:h-[96%] max-w-none -translate-x-1/2 object-contain object-bottom"
          />
          <ul
            aria-label="Focus areas"
            className="relative z-10 flex flex-wrap justify-center gap-x-2 gap-y-2.5 px-6 pt-1 lg:absolute lg:inset-0 lg:block lg:p-0"
          >
            {hero.pills.map((pill, i) => (
              <li key={pill} className="hero-pill lg:absolute" style={pillSpots[i]}>
                <span
                  className="bob inline-block rounded-full border border-ink/8 px-4 py-2 text-[0.8125rem] font-bold whitespace-nowrap text-ink shadow-[0_8px_20px_-12px_rgba(32,37,31,0.45)] sm:text-sm"
                  style={
                    {
                      background: pillTints[i % pillTints.length],
                      '--r': `${pillTilt[i]}deg`,
                      '--d': `${5 + i * 0.7}s`,
                    } as CSSProperties
                  }
                >
                  {pill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
