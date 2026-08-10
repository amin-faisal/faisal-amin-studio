'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { FEATURED_CASES } from '@/data/content'

const DURATION = 3000

export default function CaseCarousel() {
  const cases = FEATURED_CASES
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // Bumped on every manual navigation so the progress animation restarts
  // from zero instead of continuing the interrupted slide's run.
  const [cycle, setCycle] = useState(0)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const go = useCallback(
    (next: number) => {
      setIndex(((next % cases.length) + cases.length) % cases.length)
      setCycle((c) => c + 1)
    },
    [cases.length],
  )

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % cases.length)
    setCycle((c) => c + 1)
  }, [cases.length])

  /* The progress bar's animationend is what normally advances the carousel —
     see the note on the indicator below. This timer is the safety net for the
     cases where no animation runs at all: reduced motion (fires on time), or a
     throttled/background tab where animationend may never arrive (fires late,
     and only if animationend hasn't already bumped the cycle). */
  useEffect(() => {
    if (paused || cases.length < 2) return
    const id = window.setTimeout(advance, reduced.current ? DURATION : DURATION + 800)
    return () => window.clearTimeout(id)
  }, [index, cycle, paused, cases.length, advance])

  // A timer that keeps running in a hidden tab means coming back to a carousel
  // that has silently cycled through everything.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (!cases.length) return null
  const active = cases[index]

  return (
    <Container className="py-14 lg:py-20">
      {/* items-stretch so the left column matches the image height — that's
          what lets the controls sit on the image's bottom edge. */}
      <div
        className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,470px)_minmax(0,1fr)] lg:gap-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        data-reveal
      >
        <div className="flex flex-col">
          {/* Top-aligned copy. */}
          <div>
            <p className="t-small text-muted">
              Featured work · {String(index + 1).padStart(2, '0')} /{' '}
              {String(cases.length).padStart(2, '0')}
            </p>

            <div key={active.slug} className="animate-[fadeIn_.4s_ease-out]">
              <h2 className="t-h3 mt-3">{active.title}</h2>
              <p className="t-body mt-4 text-muted">{active.summary}</p>
              {active.result && <p className="t-small mt-4">{active.result}</p>}
            </div>

            <Link href={`/work/${active.slug}`} className="btn btn-secondary mt-6">
              View Case Study
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
            </Link>
          </div>

          {/* mt-auto pins the controls to the bottom of the column: arrows on
              the left, indicators hard right against the image. */}
          <div className="mt-auto flex items-center justify-between gap-6 pt-10">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous case study"
                className="flex size-9 items-center justify-center rounded-pill bg-surface-2 transition-colors hover:bg-surface-3"
              >
                <ChevronLeft size={16} strokeWidth={1.8} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next case study"
                className="flex size-9 items-center justify-center rounded-pill bg-surface-2 transition-colors hover:bg-surface-3"
              >
                <ChevronRight size={16} strokeWidth={1.8} aria-hidden />
              </button>
            </div>

            {/* Inactive slides are dots; the active one stretches into a bar
                that fills for exactly the slide's lifetime. */}
            <div className="flex items-center gap-2">
              {cases.map((c, i) => {
                const isActive = i === index
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to ${c.name}`}
                    aria-current={isActive}
                    className={[
                      'h-1.5 overflow-hidden rounded-pill transition-[width,background-color] duration-500 ease-[var(--ease-out-soft)]',
                      isActive ? 'w-10 bg-surface-3' : 'w-1.5 bg-surface-3 hover:bg-muted',
                    ].join(' ')}
                  >
                    {isActive && (
                      /* The bar finishing IS the advance. Running a separate
                         setTimeout alongside it meant the two drifted apart
                         every time hover paused the animation but not the
                         timer — the bar would fill, then sit there while the
                         timer caught up. */
                      <span
                        key={cycle}
                        onAnimationEnd={advance}
                        className="block h-full w-full origin-left rounded-pill bg-text"
                        style={{
                          animation: `progress-fill ${DURATION}ms linear forwards`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <Link
          href={`/work/${active.slug}`}
          className="group relative block aspect-[4/3] overflow-hidden rounded-panel bg-surface-2 lg:aspect-auto lg:min-h-[420px]"
        >
          {active.cover ? (
            <Image
              key={active.slug}
              src={active.cover}
              alt={`${active.name} case study cover`}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="animate-[fadeIn_.45s_ease-out] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          ) : (
            <span className="t-small absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted">
              <Image
                src={active.logo}
                alt={`${active.name} logo`}
                width={140}
                height={40}
                className="h-7 w-auto object-contain opacity-70 dark:brightness-0 dark:invert"
              />
              Cover image — {active.name}
            </span>
          )}
        </Link>
      </div>
    </Container>
  )
}
