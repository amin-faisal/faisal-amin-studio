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
      <h2 className="t-h3 max-w-[320px] whitespace-pre-line">{title}</h2>
      {body && <p className="t-body mt-3 max-w-[320px] text-muted">{body}</p>}
      {children}
    </div>
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
      <div className="grid gap-8 lg:grid-cols-[354px_minmax(0,1fr)] lg:gap-10">
        <StickyHead title={title} body={body}>
          {aside}
        </StickyHead>
        <div>{children}</div>
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
