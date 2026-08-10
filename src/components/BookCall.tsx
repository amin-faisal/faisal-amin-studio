'use client'

import { useEffect, type ReactNode } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { CAL } from '@/data/content'

/* Cal.com element-click embed, restyled to the site.

   Cal renders the booker in its own iframe, so none of our CSS reaches it —
   the only lever is cssVarsPerTheme, which maps its internal design tokens.
   Everything below is chosen to match the greyscale palette: black brand in
   light, white in dark, our panel/card greys for surfaces. */

const brand = (theme: 'light' | 'dark') =>
  theme === 'dark'
    ? {
        'cal-brand': '#ffffff',
        'cal-text-emphasis': '#ffffff',
        'cal-text': '#ffffff',
        'cal-text-subtle': '#8a8a8a',
        'cal-text-muted': '#8a8a8a',
        'cal-bg': '#0a0a0a',
        'cal-bg-emphasis': '#262626',
        'cal-bg-subtle': '#1b1b1b',
        'cal-bg-muted': '#121212',
        'cal-border': '#262626',
        'cal-border-subtle': '#1b1b1b',
        'cal-border-emphasis': '#3a3a3a',
        'cal-brand-emphasis': '#e5e5e5',
        'cal-brand-text': '#0a0a0a',
      }
    : {
        'cal-brand': '#000000',
        'cal-text-emphasis': '#000000',
        'cal-text': '#000000',
        'cal-text-subtle': '#8a8a8a',
        'cal-text-muted': '#8a8a8a',
        'cal-bg': '#ffffff',
        'cal-bg-emphasis': '#ebebeb',
        'cal-bg-subtle': '#f5f5f5',
        'cal-bg-muted': '#f5f5f5',
        'cal-border': '#ebebeb',
        'cal-border-subtle': '#f5f5f5',
        'cal-border-emphasis': '#8a8a8a',
        'cal-brand-emphasis': '#292929',
        'cal-brand-text': '#ffffff',
      }

let configured = false

export function useCalEmbed() {
  useEffect(() => {
    let cancelled = false

    const configure = async () => {
      const cal = await getCalApi({ namespace: CAL.namespace })
      if (cancelled) return
      const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      cal('ui', {
        theme,
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: { light: brand('light'), dark: brand('dark') },
      })
    }

    configure()
    configured = true

    // The booker has to be reconfigured when the site theme flips — it can't
    // see our <html> class from inside its iframe.
    const onThemeChange = () => configure()
    window.addEventListener('themechange', onThemeChange)
    return () => {
      cancelled = true
      window.removeEventListener('themechange', onThemeChange)
    }
  }, [])

  return configured
}

/** Mount once, high in the tree, so the embed script loads a single time. */
export function CalProvider() {
  useCalEmbed()
  return null
}

export default function BookCall({
  children = 'Book a Call',
  className = 'btn btn-primary',
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      className={className}
      data-cal-namespace={CAL.namespace}
      data-cal-link={CAL.link}
      data-cal-config={JSON.stringify({
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true',
        theme: 'auto',
      })}
    >
      {children}
    </button>
  )
}
