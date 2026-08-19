import Image from 'next/image'
import type { Logo } from '@/data/content'

/* Renders a client logo as a CSS mask painted with currentColor.

   An SVG referenced through <img> is an opaque document — page CSS can't reach
   inside it, which is why the old raster logos needed brightness(0) invert(1).
   Masking uses the SVG's alpha channel as a stencil and fills it with the
   inherited text colour, so one file is black in light mode, white in dark,
   and muted grey in the footer.

   `brandOnHover` stacks the full-colour export on top and crossfades to it
   when an ancestor .group is hovered. Colour can't come through a mask — the
   mask only carries alpha — so the branded version has to be a real image. */

export default function LogoMark({
  logo,
  name,
  height = 28,
  className = '',
  brandOnHover = false,
}: {
  logo: Logo | null
  name: string
  /** Rendered height in px. Width follows from the logo's own proportions. */
  height?: number
  className?: string
  brandOnHover?: boolean
}) {
  /* No mark supplied yet — set the name instead of rendering a broken mask. */
  if (!logo) {
    return (
      <span
        className={`inline-block shrink-0 font-medium tracking-[-0.03em] whitespace-nowrap ${className}`}
        style={{ fontSize: Math.round(height * 0.72), lineHeight: `${height}px` }}
      >
        {name}
      </span>
    )
  }

  const width = Math.round(height * (logo.w / logo.h))

  const mask = {
    maskImage: `url("${logo.src}")`,
    WebkitMaskImage: `url("${logo.src}")`,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
  } as const

  if (!brandOnHover || !logo.brand) {
    return (
      <span
        role="img"
        aria-label={`${name} logo`}
        className={`inline-block shrink-0 bg-current ${className}`}
        style={{ width, height, ...mask }}
      />
    )
  }

  return (
    <span
      role="img"
      aria-label={`${name} logo`}
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width, height }}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-current transition-opacity duration-300 group-hover:opacity-0"
        style={mask}
      />
      <Image
        src={logo.brand}
        alt=""
        aria-hidden
        fill
        sizes={`${width}px`}
        className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  )
}
