import { BadgeCheck } from 'lucide-react'
import { certifications, education } from '../content'

export function Education() {
  return (
    <section id="education" className="bg-ivory-dim py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 data-split className="display max-w-[11ch] lg:sticky lg:top-28 text-[clamp(2.6rem,5.4vw,5rem)] leading-[1.02]">
            Education &amp; certifications
          </h2>
        </div>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {education.map((e) => (
              <article key={e.degree} className="frame flex flex-col justify-between border border-ink/8 bg-paper p-7" data-reveal>
                <p className="display text-[clamp(3.5rem,6vw,5rem)] leading-none text-clay-deep">
                  {e.score}
                  <span className="ml-1 font-sans text-base font-semibold text-ink-soft">{e.scoreUnit}</span>
                </p>
                <div className="mt-10">
                  <h3 className="text-[1.0625rem] leading-snug font-semibold">{e.degree}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{e.school}</p>
                </div>
              </article>
            ))}
          </div>

          <h3 className="mt-16 text-[0.8125rem] font-semibold tracking-[0.14em] text-clay-deep uppercase" data-reveal>
            Certifications
          </h3>
          <ul className="mt-6">
            {certifications.map((c) => (
              <li key={c.title} data-reveal className="flex gap-4 border-t border-ink/12 py-5 last:border-b">
                <BadgeCheck size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-clay-deep" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
