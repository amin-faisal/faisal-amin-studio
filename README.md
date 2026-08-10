# Faisal Amin — Studio Site

Next.js 16 · React 19 · Tailwind v4 · zero animation dependencies.

## Design system

Greyscale only, no brand hue. The whole visual language is three stacked
surfaces — page → panel → card — plus one shadow.

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#ffffff` | `#0a0a0a` |
| `--panel` | `#fafafa` | `#121212` |
| `--card` | `#ffffff` | `#1b1b1b` |
| `--surface-2` | `#f5f5f5` | `#1c1c1c` |
| `--text` | `#000000` | `#ffffff` |
| `--muted` | `#8a8a8a` | `#8a8a8a` |

Radii: `24px` panel · `16px` card · `999px` pill. Type: 32 / 24 / 20 / 18 / 16 /
14 / 12, all at `-0.03em`. Body weight 450, headings 500.

Light mode separates cards with `0 1px 8px -2px rgb(0 0 0 / .12)`. That shadow
is invisible on a near-black panel, so dark mode swaps it for a hairline
border. Same job, different mechanism.

## Fonts

Self-hosted Inter v4.1 — Google Fonts strips the optical-size axis, so Display
has to come from the official release.

- `InterVariable.woff2` (343KB) — body. The variable file is here for one
  reason: weight **450**, which no static Inter file provides.
- `InterDisplay-Medium.woff2` (110KB) — headings at 24px and up only.

## Two effects worth knowing about

**Logo hover** (`LogoCard.tsx`) — reads like a flip but isn't. The card is
`overflow:hidden` with no perspective; the logo blurs out to the right while
the label arrives from the left, sharpening as it lands.

**Scroll reveal** (`ScrollReveal.tsx`) — one rAF loop writes `--p` (0→1) and
`--y` per element from viewport position; CSS does the rest via
`filter: blur(calc((1 - var(--p)) * 6px))`. Nothing runs off the compositor.

## Gotcha: never transition a var()-driven colour

Chrome caches the resolved value of a transitioned property. When only the
custom property behind it changes — exactly what the theme toggle does — the
transition never re-resolves and the element keeps its old colour. This cost
real debugging time: `body`, `html` and `.btn-primary` all stayed light while
every untransitioned `.card` correctly went dark.

Theme switching is therefore instant. Don't add `transition: background-color`
to anything using `var(--bg)`, `var(--card)`, `var(--text)` etc.

## Before this goes live

- [ ] **Real pricing.** Every figure in `PRICING` and `COMPARISON` is a `$0,000`
      placeholder. `PRICING.placeholder` renders a visible warning until set to
      `false`.
- [ ] **Testimonials.** `TESTIMONIALS` is intentionally empty — real quotes from
      real clients only.
- [ ] **Booking URL.** `SITE.bookingUrl` points at `#contact`.
- [ ] **Case study pages.** `/work/*` links exist but the routes don't — they
      currently 404.
- [ ] **Images.** Featured cover and portrait are placeholder blocks.
- [ ] **FAQ copy.** Drafted, not confirmed.

## Develop

```bash
npm run dev
```
