import type { ReactNode } from 'react'
import type { Tone } from '../content'

const toneClass: Record<Tone, string> = {
  ink: 'bg-ink text-ivory',
  clay: 'bg-clay text-paper',
  sand: 'bg-sand text-ink',
  paper: 'bg-paper text-ink',
  stone: 'bg-stone text-ink',
}

interface Props {
  tone: Tone
  src?: string
  alt?: string
  ratio?: string
  className?: string
  /** Extra props for the inner layer, e.g. data-parallax. */
  innerProps?: Record<string, string>
  children?: ReactNode
  priority?: boolean
}

/**
 * An image frame. Shows the real image when `src` is set,
 * otherwise a typeset placeholder in one of the palette tones.
 */
export function Artwork({ tone, src, alt = '', ratio, className = '', innerProps, children, priority }: Props) {
  return (
    <div
      className={`frame relative isolate overflow-hidden ${toneClass[tone]} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div className="absolute inset-[-10%_0]" {...innerProps}>
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-[12%]" aria-hidden="true">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
