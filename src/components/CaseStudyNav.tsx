'use client'

import { useEffect, useState } from 'react'
import { sectionId } from '@/data/content'

/* Sticky section nav — the blog-style table of contents.

   Scroll-spy via IntersectionObserver rather than scroll maths: the rootMargin
   defines a band just under the fixed header, and whichever heading is inside
   that band is the active one. */

export default function CaseStudyNav({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(headings[0] ?? '')

  useEffect(() => {
    const ids = headings.map(sectionId)
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null)

    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Several headings can be on screen at once; the topmost one inside
        // the band wins, so the highlight never jumps backwards mid-section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActive(visible[0].target.id)
      },
      // Top offset clears the 68px header; the negative bottom keeps the band
      // to the upper third of the viewport.
      { rootMargin: '-88px 0px -65% 0px', threshold: 0 },
    )

    for (const n of nodes) observer.observe(n)
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav aria-label="Sections" className="lg:sticky lg:top-[100px] lg:self-start">
      <p className="t-small mb-4 text-muted">On this page</p>
      <ul className="flex flex-col gap-1 border-l border-hairline">
        {headings.map((h) => {
          const id = sectionId(h)
          const isActive = active === id
          return (
            <li key={h}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  't-small -ml-px block border-l py-1.5 pl-4 transition-colors duration-200',
                  isActive
                    ? 'border-text font-medium text-text'
                    : 'border-transparent text-muted hover:text-text',
                ].join(' ')}
              >
                {h}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
