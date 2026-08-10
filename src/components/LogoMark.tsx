import type { Logo } from '@/data/content'

/* Renders a client logo as a CSS mask painted with currentColor.

   An SVG referenced through <img> is an opaque document — page CSS can't reach
   inside it, which is why the old raster logos needed brightness(0) invert(1)
   to survive dark mode. That filter flattens everything and looks muddy.

   Masking uses the SVG's alpha channel as a stencil and fills it with the
   inherited text colour, so one file is black in light mode, white in dark,
   and muted grey in the footer — no second export, no filter, no flash of the
   wrong colour when the theme flips. It stays vector-crisp at any size.

   Each logo carries its intrinsic viewBox size so the width is derived rather
   than guessed; the marks are all 55 units tall but range from 127 to 223
   wide, and a fixed width would squash half of them. */

export default function LogoMark({
  logo,
  name,
  height = 28,
  className = '',
}: {
  logo: Logo
  name: string
  /** Rendered height in px. Width follows from the logo's own proportions. */
  height?: number
  className?: string
}) {
  const width = Math.round(height * (logo.w / logo.h))

  return (
    <span
      role="img"
      aria-label={`${name} logo`}
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        width,
        height,
        maskImage: `url("${logo.src}")`,
        WebkitMaskImage: `url("${logo.src}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    />
  )
}
