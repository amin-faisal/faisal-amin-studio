'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/* Drives every [data-reveal] element on the page from one rAF loop.

   Deliberately not Framer Motion: this is two custom properties written per
   element per frame, and the reference implementation it's ported from is
   already the cheapest correct version. Adding an animation library here
   would cost ~30KB to do less. */

const IN_START = 1.02 // element anchor at 102% of viewport height → invisible
const IN_END = 0.66 //   …at 66% → fully in
const OUT_START = 0.22 // starts leaving
const OUT_END = -0.22 //  gone
const RISE = 46 //        px travelled on the way in
const LIFT = 40 //        px travelled on the way out
const STAGGER = 0.035 //  viewport fractions of delay per stagger step

type Item = {
  el: HTMLElement
  offset: number
  intro: boolean
  p: number
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export default function ScrollReveal() {
  /* Re-run on every route change.

     This component is mounted once by the root layout, so with an empty
     dependency array it scanned the first page and never looked again. After a
     client-side navigation the new page's elements kept the stylesheet default
     of --p: 0 — present in the DOM, fully transparent. The page looked like it
     had failed to load. */
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.remove('no-js')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let items: Item[] = []
    let ticking = false
    let introDone = false

    const collect = () => {
      items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).map((el) => ({
        el,
        offset: (parseFloat(el.getAttribute('data-stagger') || '0') || 0) * STAGGER,
        intro: el.dataset.intro === '1', // survives a resize re-collect
        p: -1,
      }))
    }

    const write = (it: Item, p: number, y: number) => {
      if (Math.abs(p - it.p) < 0.002) return
      it.p = p
      it.el.style.setProperty('--p', p.toFixed(3))
      it.el.style.setProperty('--y', y.toFixed(1) + 'px')
    }

    const update = () => {
      ticking = false
      const vh = window.innerHeight
      if (!vh) return // background tab with no viewport yet — nothing to measure against

      for (const it of items) {
        const rect = it.el.getBoundingClientRect()

        // Skip work for anything far outside the viewport
        if (rect.bottom < -vh || rect.top > vh * 2) {
          if (it.p !== 0) write(it, 0, RISE)
          continue
        }

        // Anchor near the element's top for tall blocks, its centre for short ones
        const anchor = rect.top + Math.min(rect.height, vh * 0.5) * 0.5
        const c = anchor / vh

        // Anything on screen at load is already "in" — it never has to earn it
        const inP = it.intro ? 1 : clamp01((IN_START - it.offset - c) / (IN_START - IN_END))
        const outP = clamp01((c - OUT_END) / (OUT_START - OUT_END))

        const p = easeOut(inP) * (outP < 1 ? easeOut(outP) : 1)
        const y = (1 - easeOut(inP)) * RISE - (1 - outP) * LIFT

        write(it, p, y)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    /* Flag everything already on screen and arm its entrance transition.
       Reading offsetHeight commits the --p: 0 start value, so the first
       update() actually animates instead of snapping. */
    const markIntro = () => {
      const vh = window.innerHeight
      if (!vh) return // retried from the resize handler once there is a viewport
      introDone = true

      const armed: HTMLElement[] = []
      for (const it of items) {
        if (it.el.getBoundingClientRect().top >= vh * 0.98) continue
        it.intro = true
        it.el.dataset.intro = '1'
        it.el.style.setProperty('--i', String(it.offset / STAGGER))
        it.el.classList.add('is-intro')
        armed.push(it.el)
      }
      if (!armed.length) return

      void document.body.offsetHeight

      // Once the entrance has played, drop the transition so scrolling stays exact
      window.setTimeout(() => {
        for (const el of armed) el.classList.remove('is-intro')
      }, 1800)
    }

    collect()
    markIntro()
    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    const onResize = () => {
      collect()
      if (!introDone) markIntro()
      onScroll()
    }
    window.addEventListener('resize', onResize, { passive: true })

    /* A prerendered or background tab reports a zero-sized viewport, so the
       intro never ran and every element is still at opacity 0. Becoming
       visible is the first chance to measure — and it doesn't always come
       with a resize event. Same for a bfcache restore. */
    const recover = () => {
      if (document.hidden) return
      collect()
      if (!introDone) markIntro()
      update()
    }
    document.addEventListener('visibilitychange', recover)
    window.addEventListener('pageshow', recover)

    // Fonts land late and shift layout — recompute once they do
    document.fonts?.ready.then(() => {
      collect()
      update()
    })

    /* Last resort. A blank page is a far worse outcome than a missing
       animation, so if the intro still hasn't run, take the normal path if the
       viewport has since become measurable and otherwise just show everything. */
    const bail = window.setTimeout(() => {
      if (introDone) return
      if (window.innerHeight) {
        recover()
        return
      }
      for (const it of items) {
        it.intro = true
        it.el.style.setProperty('--p', '1')
        it.el.style.setProperty('--y', '0px')
      }
    }, 3000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', recover)
      window.removeEventListener('pageshow', recover)
      window.clearTimeout(bail)
    }
  }, [pathname])

  return null
}
