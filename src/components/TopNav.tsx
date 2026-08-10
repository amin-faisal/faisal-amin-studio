'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import BookCall from './BookCall'
import { NAV_LINKS, SITE } from '@/data/content'

const HIDE_AFTER = 120 // don't start hiding until well clear of the hero
const DELTA = 6 //        ignore sub-pixel scroll jitter

export default function TopNav() {
  const [hidden, setHidden] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastY.current

      if (Math.abs(diff) > DELTA) {
        // Down past the hero hides it; any upward scroll brings it straight back.
        setHidden(diff > 0 && y > HIDE_AFTER)
        lastY.current = y
      }

      setStuck(y > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // An open mobile menu that slides away under the user is worse than no
  // auto-hide at all.
  useEffect(() => {
    if (open) setHidden(false)
  }, [open])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out',
        hidden && !open ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div
        className={[
          // Not background-color: it's var()-driven and would go stale on a
          // theme switch (see the note in globals.css).
          'transition-[backdrop-filter] duration-300',
          stuck || open
            ? 'border-b border-hairline bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1218px] items-center gap-6 px-6">
          <Link href="/" className="t-h4 mr-auto shrink-0">
            {SITE.name}
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="t-small text-muted transition-colors hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <BookCall className="btn btn-primary hidden sm:inline-flex">Book a Call</BookCall>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex size-[34px] items-center justify-center rounded-pill bg-surface-2 md:hidden"
            >
              {open ? (
                <X size={16} strokeWidth={1.9} aria-hidden />
              ) : (
                <Menu size={16} strokeWidth={1.9} aria-hidden />
              )}
            </button>
          </div>
        </nav>

        {open && (
          <ul className="flex flex-col gap-1 px-6 pb-5 md:hidden">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="t-body block border-b border-hairline py-3 text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <BookCall className="btn btn-primary w-full">Book a Call</BookCall>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
