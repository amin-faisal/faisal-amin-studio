# Client logos

Single-colour SVGs, rendered as **CSS masks** filled with `currentColor` (see
`src/components/LogoMark.tsx`). One file serves every context — black in light
mode, white in dark, muted grey in the footer marquee. No second export, no
filters, and it stays vector-crisp at any size.

| File | Client | viewBox |
| --- | --- | --- |
| `modalys.svg` | Modalys | 165 × 55 |
| `natural-heroes.svg` | Natural Heroes | 202 × 55 |
| `clyro.svg` | Clyro | 127 × 55 |
| `truid.svg` | truID | 142 × 55 |
| `octilearn.svg` | OctiLearn | 214 × 55 |
| `chipxprt.svg` | ChipXprt | 217 × 55 |
| `takhleeq.svg` | Takhleeq | 223 × 55 |
| `face44.svg` | Face44 | 136 × 55 |

## Replacing one

Overwrite the file **and** update its width in the `LOGOS` map in
`src/data/content.ts`. The width is how the layout keeps each mark's true
proportions — they all share a 55-unit height but range from 127 to 223 wide,
so a shared width would squash most of them.

## Export requirements

A mask uses only the file's **alpha channel**. Anything that depends on colour
is discarded, so:

- **Solid fill on transparent.** Colour is irrelevant — `#0A0A0A` is what these
  use — but it must be opaque where the mark is.
- **Outlines, not strokes.** Expand strokes and convert text to paths, or thin
  parts will vanish.
- **No gradients, `<style>` blocks, filters or embedded raster.** All dropped.
- **Tight viewBox**, cropped to the mark. Built-in padding makes one logo look
  smaller than its neighbours.
- Normalise to a **55-unit height** so everything shares a baseline.
- Wordmarks beat icon-only marks — these render 24–30px tall.

## Adding a new client

1. Drop the SVG in here.
2. Add it to `LOGOS` in `src/data/content.ts` with its viewBox width.
3. Add a `CASE_STUDIES` entry referencing `LOGOS.yourClient`.

The hover grid, footer marquee, `/work` index and the `/work/<slug>` page all
read from that one array.
