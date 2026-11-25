import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { contact, navItems, profile } from '../content'
import { go, ResumeLink } from './Nav'

function SocialLink({ label, url }: { label: string; url: string }) {
  if (!url) {
    return <p className="text-ivory/50">Link coming soon</p>
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1.5 text-ivory">
      {label} <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
    </a>
  )
}

function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  useEffect(() => {
    if (state === 'idle') return
    const t = setTimeout(() => setState('idle'), 2200)
    return () => clearTimeout(t)
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setState('copied')
    } catch {
      setState('failed')
    }
  }

  return (
    <button type="button" onClick={copy} className="btn btn-light">
      {state === 'copied' ? <Check size={16} strokeWidth={1.75} /> : <Copy size={16} strokeWidth={1.75} />}
      <span aria-live="polite">
        {state === 'copied' ? 'Email copied' : state === 'failed' ? 'Copy failed, select the address' : 'Copy email'}
      </span>
    </button>
  )
}

export function Contact() {
  const year = new Date().getFullYear()

  return (
    <div className="on-ink bg-ink text-ivory">
      <section id="contact" className="mx-auto max-w-[1440px] px-5 pt-24 pb-20 md:px-10 md:pt-36 md:pb-28">
        <h2 data-split className="display max-w-[16ch] text-[clamp(2.7rem,7vw,6.5rem)] leading-[1.03]">
          {contact.headline} <em className="text-sand">{contact.headlineEmphasis}</em>
        </h2>
        <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ivory/75" data-reveal>
          {contact.intro}
        </p>

        <div className="mt-14 border-t border-ivory/15 pt-10" data-reveal>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent('Hello Kajal')}`}
            className="display group inline-flex items-center gap-3 text-[clamp(1.5rem,4.6vw,3.6rem)] leading-tight break-all"
          >
            <span className="link-line">{profile.email}</span>
            <ArrowUpRight
              className="hidden shrink-0 text-clay transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block"
              size={44}
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-light">
              Send an email <ArrowUpRight size={16} strokeWidth={1.75} />
            </a>
            <CopyEmail />
            <ResumeLink className="btn btn-light" label="Download resume" />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-8 text-[0.9375rem] sm:grid-cols-2 md:max-w-[44rem]" data-reveal>
          <div>
            <dt className="text-ivory/55">Location</dt>
            <dd className="mt-2">{profile.location}</dd>
          </div>
          <div>
            <dt className="text-ivory/55">LinkedIn</dt>
            <dd className="mt-2">
              <SocialLink label="LinkedIn" url={profile.linkedin} />
            </dd>
          </div>
        </dl>
      </section>

      <footer className="mx-auto max-w-[1440px] px-5 pb-10 md:px-10">
        <div className="grid grid-cols-1 gap-10 border-t border-ivory/15 pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-3xl">{profile.name}</p>
            <p className="mt-2 text-sm text-ivory/65">
              {profile.role}, {profile.focus}
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-5">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={(e) => go(e, item.id)} className="link-line text-ivory/80 hover:text-ivory">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2 md:text-right">
            <a
              href="#home"
              onClick={(e) => go(e, 'home')}
              className="group inline-flex items-center gap-2 text-sm font-semibold"
            >
              Back to top
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors group-hover:bg-ivory group-hover:text-ink">
                <ArrowUp size={16} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
        <p className="mt-12 text-xs text-ivory/50">
          &copy; {year} {profile.name}. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
