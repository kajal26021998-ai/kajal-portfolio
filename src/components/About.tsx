import { about, profile } from '../content'
import { Artwork } from './Artwork'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div data-clip>
              <Artwork
                tone="clay"
                src={profile.aboutImage.src}
                alt={profile.aboutImage.alt}
                ratio="3 / 4"
                className="w-full max-w-[520px]"
                innerProps={{ 'data-parallax': '7', className: 'absolute inset-[-10%_0]' }}
              >
                <span className="text-xs font-semibold tracking-[0.18em] text-ink/55 uppercase">Photo</span>
              </Artwork>
            </div>
            <p className="mt-4 text-sm text-ink-soft">
              {profile.role}, Cure Forever. {profile.location}.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <h2 data-split className="display text-[clamp(2rem,3.9vw,3.5rem)] leading-[1.12]">
            {about.statement}
          </h2>

          <div className="mt-12 grid max-w-[40rem] gap-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} data-reveal>
                {p}
              </p>
            ))}
          </div>

          <h3 className="mt-20 text-[0.8125rem] font-semibold tracking-[0.14em] text-clay-deep uppercase" data-reveal>
            How I work
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
            {about.approach.map((item) => (
              <div key={item.title} data-reveal className="border-t border-ink/15 pt-5">
                <h4 className="display text-[1.5rem] leading-tight">{item.title}</h4>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
