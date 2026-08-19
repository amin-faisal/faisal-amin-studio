import type { Logo } from '@/data/content'

/* Renders a client logo as a CSS mask painted with currentColor.

   An SVG referenced through <img> is an opaque document — page CSS can't reach
   inside it, which is why the old raster logos needed brightness(0) invert(1).
   Masking uses the SVG's alpha channel as a stencil and fills it with the
   inherited text colour, so one file is black in light mode, white in dark,
   and muted grey in the footer.

   Monochrome everywhere by design: the full-colour exports exist in
   /public/logos as *-brand.svg but nothing references them. */

export default function LogoMark({
  logo,
  name,
  height = 28,
  className = '',
}: {
  logo: Logo | null
  name: string
  /** Rendered height in px. Width follows from the logo's own proportions. */
  height?: number
  className?: string
}) {
  /* No mark supplied yet — set the name instead of rendering a broken mask. */
  if (!logo) {
    return (
      <span
        className={`inline-block shrink-0 font-medium tracking-[-0.03em] whitespace-nowrap ${className}`}
        style={{
          fontSize: Math.round(height * 0.72),
          lineHeight: `${height}px`,
        }}
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

  return (
    <span
      role="img"
      aria-label={`${name} logo`}
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ width, height, ...mask }}
    />
  )
}
