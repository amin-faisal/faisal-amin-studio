import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import LogoMark from './LogoMark'
import type { Logo } from '@/data/content'

/* Two stacked layers crossfading vertically inside an overflow:hidden card.

   The logo lifts out through the top while the label rises into its place from
   below, each blurring as it travels. Vertical rather than horizontal because
   the cards are much wider than they are tall.

   Note `blur-none`, not `blur-0` — the latter isn't a Tailwind v4 utility, so
   it generated no rule at all and the label stayed permanently blurred. */

type Props = {
  name: string
  logo: Logo | null
  href?: string
  /** No case study yet — the card still reacts, it just says so. */
  comingSoon?: boolean
}

export default function LogoCard({ name, logo, href, comingSoon }: Props) {
  const label = comingSoon ? 'Coming Soon' : 'See Case Study'

  const inner = (
    <>
      <span className="absolute inset-0 flex items-center justify-center px-6 text-text transition-[opacity,filter,translate] duration-[380ms] ease-[var(--ease-out-soft)] group-hover:-translate-y-9 group-hover:opacity-0 group-hover:blur-[3px]">
        <LogoMark logo={logo} name={name} height={26} />
      </span>

      {/* Starts below its resting place, blurred and transparent. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex translate-y-9 items-center justify-center gap-1.5 px-4 text-center text-[14px] font-medium tracking-[-0.03em] text-text opacity-0 blur-[3px] transition-[opacity,filter,translate] duration-[380ms] ease-[var(--ease-out-soft)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none"
      >
        {label}
        {!comingSoon && <ArrowUpRight size={15} strokeWidth={2} className="shrink-0" />}
      </span>

      {/* The label is the actual destination — keep it in the accessible name
          rather than only revealing it on hover. */}
      <span className="sr-only">
        {name} — {label}
      </span>
    </>
  )

  const className = 'card group relative flex h-[88px] items-center justify-center overflow-hidden'

  if (!href || comingSoon) {
    return (
      <div className={className} aria-label={`${name} — ${label}`}>
        {inner}
      </div>
    )
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}
