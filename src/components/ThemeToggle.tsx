'use client'

import { Sun, Moon } from 'lucide-react'

export type Theme = 'light' | 'dark'

/* Runs before paint in layout.tsx to stop the wrong theme flashing on load.
   Kept as a string so it can be inlined verbatim. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}catch(e){}})()`

/* No React state for the current theme.

   Mirroring the <html> class into state means reading the DOM in an effect and
   setting state on mount, which is both a cascading render and a hydration
   hazard. The class is already the source of truth, so the icons are swapped
   by CSS and the component never needs to know which theme is active. */

export default function ThemeToggle() {
  const toggle = () => {
    const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    document.documentElement.style.colorScheme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private mode / storage disabled — the toggle still works for this session.
    }
    // The Cal.com booker lives in an iframe and can't observe our <html> class.
    window.dispatchEvent(new CustomEvent('themechange', { detail: next }))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="flex size-[34px] shrink-0 items-center justify-center rounded-pill bg-surface-2 text-text transition-[background-color] hover:bg-surface-3"
    >
      <Moon size={15} strokeWidth={1.8} aria-hidden className="block dark:hidden" />
      <Sun size={15} strokeWidth={1.8} aria-hidden className="hidden dark:block" />
    </button>
  )
}
