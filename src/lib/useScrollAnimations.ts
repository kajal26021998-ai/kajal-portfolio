import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap, ScrollTrigger, SplitText } from './scroll'

/**
 * Page-wide scroll animations, declared with data attributes:
 *   data-split     heading lines rise out of a mask
 *   data-reveal    fades up when it enters the viewport
 *   data-clip      image frame wipes open from the bottom
 *   data-parallax  image drifts inside its frame (value = strength in %)
 *   data-draw      vertical rule grows with scroll
 * Everything is skipped when the visitor prefers reduced motion,
 * so content is always visible without JS animation.
 */
export function useScrollAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.15,
                ease: 'expo.out',
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          })
        })

        gsap.set('[data-reveal]', { autoAlpha: 0, y: 32 })
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
        })

        gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.4,
              ease: 'expo.inOut',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax) || 8
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((el) => {
          gsap.fromTo(
            el,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              transformOrigin: 'top',
              scrollTrigger: { trigger: el.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: true },
            },
          )
        })
      })

      // Web fonts change line lengths; re-measure once they are in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
      return () => mm.revert()
    },
    { scope },
  )
}
