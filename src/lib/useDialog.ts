import { useEffect, useRef } from 'react'
import { setScrollLocked } from './scroll'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared dialog behaviour: locks page scroll, closes on Escape,
 * keeps Tab focus inside the panel and returns focus on close.
 */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const panelRef = useRef<T>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    setScrollLocked(true)

    const focusFirst = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(focusFirst)
      document.removeEventListener('keydown', onKey)
      setScrollLocked(false)
      previouslyFocused?.focus?.()
    }
  }, [open])

  return panelRef
}
