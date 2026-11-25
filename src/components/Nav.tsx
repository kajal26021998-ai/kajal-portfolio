import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'
import { navItems, profile } from '../content'
import { scrollToId } from '../lib/scroll'
import { useDialog } from '../lib/useDialog'

type NavId = (typeof navItems)[number]['id']
const navIds = navItems.map((n) => n.id) as string[]

function useActiveSection() {
  const [active, setActive] = useState<NavId>('home')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && navIds.includes(entry.target.id)) {
            setActive(entry.target.id as NavId)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])
  return active
}

export function go(e: MouseEvent, id: string, after?: () => void) {
  e.preventDefault()
  if (!after) {
    scrollToId(id)
    return
  }
  // Closing the menu releases the scroll lock in an effect; scroll once that has run.
  after()
  setTimeout(() => scrollToId(id), 80)
}

/** Resume download link, shared by nav, hero and contact. */
export function ResumeLink({ className = '', label = 'Resume' }: { className?: string; label?: string }) {
  return (
    <a href={profile.resume} download="Kajal-Sharma-Resume.pdf" className={className}>
      <Download size={16} strokeWidth={1.75} aria-hidden="true" />
      {label}
    </a>
  )
}

export function Nav() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 24
    if (next !== scrolled) setScrolled(next)
  })
  const menuRef = useDialog<HTMLDivElement>(open, () => setOpen(false))

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-[60px] max-w-[1400px] items-center justify-between rounded-full border pr-2 pl-5 transition-[background-color,border-color,box-shadow] duration-500 md:pl-6 ${
          scrolled
            ? 'border-ink/10 bg-paper/80 shadow-[0_10px_30px_-18px_rgba(32,37,31,0.35)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#home" onClick={(e) => go(e, 'home')} className="flex items-center gap-2.5" aria-label="Kajal Sharma, home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[0.6875rem] font-extrabold tracking-[-0.02em] text-ivory">
            KS
          </span>
          <span className="text-[0.95rem] font-extrabold tracking-[-0.02em] uppercase">Kajal Sharma</span>
        </a>

        <ul className="hidden items-center gap-0.5 rounded-full p-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <a
                  href={`#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-4 py-2 text-[0.75rem] font-bold tracking-[0.06em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-ivory' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <ResumeLink className="btn btn-outline hidden !min-h-[44px] !px-4 !text-[0.8125rem] md:inline-flex" />
          <a
            href="#contact"
            onClick={(e) => go(e, 'contact')}
            className="btn btn-solid hidden !min-h-[44px] !px-4 !text-[0.8125rem] sm:inline-flex"
          >
            Let's talk <ArrowUpRight size={15} strokeWidth={1.75} />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-ivory lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-ink fixed inset-0 z-[70] flex flex-col bg-ink px-5 pb-8 text-ivory"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-[84px] items-center justify-between">
              <span className="text-[0.95rem] font-extrabold uppercase">Kajal Sharma</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-1">
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id, () => setOpen(false))}
                    className={`poster block py-1 text-[clamp(3rem,15vw,4.6rem)] uppercase ${
                      active === item.id ? 'text-clay' : ''
                    }`}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-ivory/15 pt-6">
              <div className="space-y-1 text-sm text-ivory/70">
                <a href={`mailto:${profile.email}`} className="block text-base text-ivory">
                  {profile.email}
                </a>
                <p>{profile.location}</p>
              </div>
              <ResumeLink className="btn btn-light" label="Download resume" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
