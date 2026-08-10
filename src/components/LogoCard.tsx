import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

/* Two stacked layers crossfading vertically inside an overflow:hidden card.

   The logo lifts out through the top while the label rises into its place from
   below, each blurring as it travels. Vertical rather than horizontal because
   the cards are much wider than they are tall.

   Note `blur-none`, not `blur-0` — the latter isn't a Tailwind v4 utility, so
   it generated no rule at all and the label stayed permanently blurred on
   hover. */

type Props = {
  name: string
  logo: string
  href?: string
  /** No case study yet — the card still reacts, it just says so. */
  comingSoon?: boolean
}

export default function LogoCard({ name, logo, href, comingSoon }: Props) {
  const label = comingSoon ? 'Coming Soon' : 'See Case Study'

  const inner = (
    <>
      <span className="absolute inset-0 flex items-center justify-center px-6 transition-all duration-[380ms] ease-[var(--ease-out-soft)] group-hover:-translate-y-9 group-hover:opacity-0 group-hover:blur-[3px]">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={140}
          height={40}
          className="h-8 w-auto max-w-[65%] rounded-[6px] object-contain dark:opacity-90 dark:brightness-0 dark:invert"
        />
      </span>

      {/* Starts below its resting place, blurred and transparent. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex translate-y-9 items-center justify-center gap-1.5 px-4 text-center text-[14px] font-medium tracking-[-0.03em] text-text opacity-0 blur-[3px] transition-all duration-[380ms] ease-[var(--ease-out-soft)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none"
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

  const className =
    'card group relative flex h-[112px] items-center justify-center overflow-hidden transition-colors'

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
