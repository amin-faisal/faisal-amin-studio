'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export type Theme = 'light' | 'dark'

/* Runs before paint in layout.tsx to stop the wrong theme flashing on load.
   Kept as a string so it can be inlined verbatim. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}catch(e){}})()`

export default function ThemeToggle() {
  // Starts null so the button renders a stable placeholder during hydration —
  // the real value only exists on the client.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
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
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex size-[34px] shrink-0 items-center justify-center rounded-pill bg-surface-2 text-text transition-colors hover:bg-surface-3"
    >
      {theme === 'dark' ? (
        <Sun size={15} strokeWidth={1.8} aria-hidden />
      ) : (
        <Moon size={15} strokeWidth={1.8} aria-hidden />
      )}
    </button>
  )
}
