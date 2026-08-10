# Client logos

Drop replacements straight into this folder. The filename is the contract —
`src/data/content.ts` points at `/logos/<name>.webp`, so overwriting a file is
all that's needed. No code change, no rebuild config.

| File | Client |
| --- | --- |
| `modalys.webp` | Modalys |
| `natural-heroes.webp` | Natural Heroes |
| `clyro.webp` | Clyro |
| `truid.webp` | truID |
| `octilearn.webp` | OctiLearn |
| `chipxprt.webp` | ChipXprt |
| `takhleeq.webp` | Takhleeq |
| `face44.webp` | Face44 |

## How they need to look

These render at **28px tall** in three places — the hover cards, the footer
marquee, and the case study pages — so they're small. Wordmarks read better
than icon-only marks at that size.

- **Format** — `.webp`, or `.svg` if you have it (then update the path in
  `content.ts`). SVG is sharper and usually smaller.
- **Size** — export around 3× the display size: roughly **420 × 84px**.
- **Colour** — solid **black on transparent**. Not dark grey, not the brand
  colour. Dark mode inverts them with `brightness(0) invert(1)`, which turns
  any pure-black mark pure white — a coloured or grey logo comes out muddy.
- **Padding** — trim it. Crop tight to the mark; the layout supplies spacing,
  and built-in padding makes one logo look smaller than its neighbours.
- **Weight** — keep hairlines above ~2px at export size or they'll disappear
  when scaled down.

## Adding a new client

1. Drop the file in here.
2. Add an entry to `BRANDS` and a `CASE_STUDIES` entry in
   `src/data/content.ts`.

The case study page, the `/work` card, the hover grid and the footer marquee
all read from that one array — the page at `/work/<slug>` builds itself.
