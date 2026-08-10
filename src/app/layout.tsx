import type { Metadata } from 'next'
import { sans, display } from '@/lib/fonts'
import { themeInitScript } from '@/components/ThemeToggle'
import ScrollReveal from '@/components/ScrollReveal'
import TopNav from '@/components/TopNav'
import { CalProvider } from '@/components/BookCall'
import { SITE } from '@/data/content'
import './globals.css'

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    'Senior product designer working with startups on product design, websites and design systems. One monthly fee, new work every other business day.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`no-js ${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint so the correct theme is already on <html>. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {/* Loads the Cal.com embed script once and keeps its theme in sync. */}
        <CalProvider />
        <TopNav />
        {children}
        <ScrollReveal />
      </body>
    </html>
  )
}
