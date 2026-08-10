import LogoMark from './LogoMark'
import type { Brand } from '@/data/content'

/* Continuously rotating brand strip.

   The track holds two identical copies and translates by exactly -50%, so the
   second copy is in the first one's place at the moment the animation loops —
   no visible seam, no JS. Edges are masked so logos fade out rather than
   getting clipped mid-letterform.

   Colour comes from the text colour the marks inherit, so the resting/hover
   states are a colour change rather than a grayscale filter. */

type Props = {
  brands: Brand[]
  /** Seconds for one full pass. Longer = slower. */
  duration?: number
  reverse?: boolean
}

export default function LogoMarquee({ brands, duration = 42, reverse }: Props) {
  const row = [...brands, ...brands]

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, #000 80px, #000 calc(100% - 80px), transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, #000 80px, #000 calc(100% - 80px), transparent)',
      }}
    >
      <div
        className="flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {row.map((b, i) => (
          <span
            key={`${b.name}-${i}`}
            aria-hidden={i >= brands.length}
            className="text-muted transition-[color] duration-300 hover:text-text"
          >
            <LogoMark logo={b.logo} name={i < brands.length ? b.name : ''} height={24} />
          </span>
        ))}
      </div>
    </div>
  )
}
