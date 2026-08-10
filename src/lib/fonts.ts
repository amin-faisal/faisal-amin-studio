import localFont from 'next/font/local'

// Inter v4.1, self-hosted. Google Fonts serves Inter without the optical-size
// axis, so Display has to come from the official release as its own family.

// The variable file is here for one reason: weight 450. Suisse Book — the
// reference site's body weight — sits between Inter's static 400 and 500, and
// only the variable font can hit it exactly.
export const sans = localFont({
  src: [{ path: '../fonts/InterVariable.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
})

// Display optical size, one weight. Only used at 24px and up, where the
// tighter spacing and smaller apertures actually read differently.
export const display = localFont({
  src: [{ path: '../fonts/InterDisplay-Medium.woff2', weight: '500', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
})
