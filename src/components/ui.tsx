import type { ReactNode } from 'react'
import { ArrowUpRight, Check as LucideCheck } from 'lucide-react'

/* Shared layout primitives.

   The grid is one number: a 1218px content column. Everything else is that
   column subdivided — a 354px label rail and a 784px content panel for the
   two-column sections, full width for the rest. */

export function Container({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1218px] px-6 ${className}`}>
      {children}
    </section>
  )
}

/** The left rail that pins while its section's cards scroll past it. */
export function StickyHead({
  title,
  body,
  children,
}: {
  title: string
  body?: string
  children?: ReactNode
}) {
  return (
    <div className="lg:sticky lg:top-[100px] lg:self-start" data-reveal>
      <h2 className="t-h3 whitespace-pre-line">{title}</h2>
      {body && <p className="t-body mt-3 text-muted">{body}</p>}
      {children}
    </div>
  )
}

/* Heading above, content spanning the full 1218px container.

   Pricing, services, process and FAQ use this rather than the two-column
   SplitSection so their panels are exactly as wide as the case study visual
   frames — the page then has one content width instead of two. */
export function StackSection({
  id,
  title,
  body,
  aside,
  children,
}: {
  id?: string
  title: string
  body?: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <Container id={id} className="py-14 lg:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6" data-reveal>
        <div>
          <h2 className="t-h3 max-w-[440px] whitespace-pre-line">{title}</h2>
          {body && <p className="t-body mt-3 max-w-[560px] text-muted">{body}</p>}
        </div>
        {aside}
      </div>
      {children}
    </Container>
  )
}

/** Two-column section: pinned heading on the left, panel of cards on the right. */
export function SplitSection({
  id,
  title,
  body,
  children,
  aside,
}: {
  id?: string
  title: string
  body?: string
  children: ReactNode
  aside?: ReactNode
}) {
  return (
    <Container id={id} className="py-14 lg:py-20">
      {/* 224 rail + 40 gap + 906 content = the 1170 container.

          906 is deliberate: it's exactly the width of the visual frames inside
          a case study section, so the panels here line up with those instead of
          being their own width. The rail is narrower than it looks like it
          wants to be — the content width is the fixed quantity. */}
      <div className="grid gap-8 lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-10">
        <StickyHead title={title} body={body}>
          {aside}
        </StickyHead>
        {/* Capped to --frame-w and left-aligned, so these panels sit on the
            same edge and at the same width as the case study visuals. */}
        <div className="w-full max-w-[var(--frame-w)]">{children}</div>
      </div>
    </Container>
  )
}

export function Check() {
  return <LucideCheck size={16} strokeWidth={2} aria-hidden className="mt-[3px] shrink-0" />
}

export function Arrow() {
  return <ArrowUpRight size={14} strokeWidth={2} aria-hidden className="shrink-0" />
}
