import Image from 'next/image'
import type { Brand } from '@/data/content'

/* Continuously rotating brand strip.

   The track holds two identical copies and translates by exactly -50%, so the
   second copy is in the first one's place at the moment the animation loops —
   no visible seam, no JS. Edges are masked so logos fade out rather than
   getting clipped mid-letterform. */

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
          <Image
            key={`${b.name}-${i}`}
            src={b.logo}
            alt={i < brands.length ? `${b.name} logo` : ''}
            aria-hidden={i >= brands.length}
            width={140}
            height={40}
            className="h-6 w-auto shrink-0 rounded-[5px] object-contain opacity-45 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 dark:brightness-0 dark:invert"
          />
        ))}
      </div>
    </div>
  )
}
