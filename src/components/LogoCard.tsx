import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

/* Two stacked layers crossfading vertically inside an overflow:hidden card.

   The logo lifts out through the top while the label rises into its place from
   below, each blurring as it travels. Vertical rather than horizontal because
   the cards are much wider than they are tall — a sideways slide barely reads
   at this aspect ratio, and the label was landing off-centre. */

type Props = {
  name: string
  logo: string
  href?: string
  /** No case study yet — the card still reacts, it just says so. */
  comingSoon?: boolean
}

const SHIFT = 34 // px each layer travels

export default function LogoCard({ name, logo, href, comingSoon }: Props) {
  const label = comingSoon ? 'Coming Soon' : 'See Case Study'

  const inner = (
    <>
      <span
        className="absolute inset-0 flex items-center justify-center px-6 transition-all duration-[380ms] ease-[var(--ease-out-soft)] group-hover:-translate-y-[34px] group-hover:opacity-0 group-hover:blur-[3px]"
        style={{ ['--shift' as string]: `${SHIFT}px` }}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={140}
          height={40}
          className="h-7 w-auto max-w-[65%] object-contain dark:opacity-90 dark:brightness-0 dark:invert"
        />
      </span>

      {/* Starts one shift below its resting place, blurred and transparent. */}
      <span
        aria-hidden="true"
        className="t-label absolute inset-0 flex translate-y-[34px] items-center justify-center gap-1.5 px-4 text-center text-text opacity-0 blur-[3px] transition-all duration-[380ms] ease-[var(--ease-out-soft)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0"
      >
        {label}
        {!comingSoon && <ArrowUpRight size={13} strokeWidth={2} className="shrink-0" />}
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
