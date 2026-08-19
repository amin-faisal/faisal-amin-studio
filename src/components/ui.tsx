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
      {/* The frame is the fixed column and the heading takes whatever's left.

          The reverse — a fixed 224px rail beside a 1fr column with the frame
          right-aligned inside it — left a 270px dead gutter between the two,
          with the copy crammed into a quarter of the space it had available. */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_var(--frame-w)] lg:gap-10">
        <StickyHead title={title} body={body}>
          {aside}
        </StickyHead>
        <div className="w-full">{children}</div>
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

/* Duplicates a button's label so it can be swapped on hover.

   The first copy lifts out through the top, the second rises into its place —
   the same motion as the logo cards. One element can't do both, hence the
   duplicate; the second is aria-hidden so screen readers hear the label once. */
export function Swap({ children }: { children: ReactNode }) {
  return (
    <span className="btn-swap">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}
