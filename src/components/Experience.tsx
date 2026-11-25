import { experience } from '../content'

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <h2 data-split className="display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02]">
        Experience
      </h2>

      <ol className="mt-16 md:mt-24">
        {experience.map((job) => (
          <li
            key={job.company}
            className="grid grid-cols-1 gap-6 border-t border-ink/15 pt-10 pb-16 md:grid-cols-12 md:gap-10 md:pb-24"
          >
            <div className="md:col-span-4">
              <div className="md:sticky md:top-28" data-reveal>
                <p className="display text-[clamp(1.9rem,3vw,2.6rem)] leading-tight">{job.company}</p>
                <p className="mt-2 text-sm text-ink-soft">
                  {job.period}
                  <span className="mx-2 text-ink/30">/</span>
                  {job.location}
                </p>
                {job.current && (
                  <p className="mt-4 inline-block rounded-full border border-clay-deep/40 px-3 py-1 text-xs font-semibold text-clay-deep">
                    Current role
                  </p>
                )}
              </div>
            </div>

            <div className="relative md:col-span-8 md:pl-12">
              <span aria-hidden="true" className="absolute top-0 left-0 hidden h-full w-px bg-ink/10 md:block" />
              <span aria-hidden="true" data-draw className="absolute top-0 left-0 hidden h-full w-px bg-clay md:block" />
              <h3 className="display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-tight italic" data-reveal>
                {job.role}
              </h3>
              <p className="mt-4 max-w-[42rem] text-[1.0625rem] leading-relaxed text-ink-soft" data-reveal>
                {job.summary}
              </p>
              <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 xl:grid-cols-2">
                {job.points.map((point) => (
                  <li key={point} data-reveal className="flex gap-4 text-[0.9875rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-clay" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
