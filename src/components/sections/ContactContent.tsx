'use client'

import { useState } from 'react'
import { Mail, CalendarDays, FileText, MapPin } from 'lucide-react'
import { Container, Check, Swap } from '@/components/ui'
import { LinkedInIcon, GitHubIcon } from '@/components/BrandIcons'
import BookCall from '@/components/BookCall'
import QuoteForm from '@/components/QuoteForm'
import LocalTime from '@/components/LocalTime'
import { SITE, PRICING } from '@/data/content'

export default function ContactContent() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const monthly = PRICING.plans.find((p) => p.id === 'monthly') ?? PRICING.plans[0]

  return (
    <>
      <Container className="pt-[140px] pb-10 lg:pt-[170px]">
        {/* Details card is pushed to the right edge of the grid — justify-end on
            the second column rather than a wider track, so it stays aligned
            with the container edge the rest of the page uses. */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <div data-reveal>
            <h1 className="t-h1 max-w-[640px]">Let’s talk about what you’re building.</h1>
            <p className="t-body mt-4 max-w-[560px] text-muted">
              Whether it’s an ongoing retainer or a single scoped project, the first step is the
              same — a short conversation about the product and what it actually needs.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <BookCall>Book a Call</BookCall>
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="btn btn-secondary"
              >
                <FileText size={15} strokeWidth={1.9} aria-hidden />
                Get a Custom Quote
              </button>
            </div>
          </div>

          <div className="panel h-fit lg:justify-self-end lg:w-full" data-reveal data-stagger="1">
            <div className="card flex flex-col gap-4 px-6 py-6">
              <a
                href={`mailto:${SITE.email}`}
                className="t-small flex items-center gap-3 transition-opacity hover:opacity-60"
              >
                <Mail size={15} strokeWidth={1.8} aria-hidden className="shrink-0 text-muted" />
                {SITE.email}
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="t-small flex items-center gap-3 transition-opacity hover:opacity-60"
              >
                <LinkedInIcon size={15} className="shrink-0 text-muted" />
                LinkedIn
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="t-small flex items-center gap-3 transition-opacity hover:opacity-60"
              >
                <GitHubIcon size={15} className="shrink-0 text-muted" />
                GitHub
              </a>
              <p className="t-small flex items-center gap-3 border-t border-hairline pt-4">
                <MapPin size={15} strokeWidth={1.8} aria-hidden className="shrink-0 text-muted" />
                <LocalTime />
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-10">
        {/* Each card carries its own CTA. flex-1 on the copy pushes every
            button onto the same line regardless of how long the text runs. */}
        <div className="panel grid gap-2 md:grid-cols-3">
          <div className="card flex flex-col px-6 py-6" data-reveal>
            <CalendarDays size={17} strokeWidth={1.7} aria-hidden className="text-muted" />
            <h2 className="t-h4 mt-4">Book a call</h2>
            <p className="t-small mt-2 flex-1 text-muted">
              Thirty minutes, no pitch. We talk through what you’re building and whether I’m the
              right fit.
            </p>
            <BookCall className="btn btn-secondary mt-5 self-start">Book a Call</BookCall>
          </div>

          <div className="card flex flex-col px-6 py-6" data-reveal data-stagger="1">
            <FileText size={17} strokeWidth={1.7} aria-hidden className="text-muted" />
            <h2 className="t-h4 mt-4">Request a quote</h2>
            <p className="t-small mt-2 flex-1 text-muted">{PRICING.custom.body}</p>
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="btn btn-secondary mt-5 self-start"
            >
              <FileText size={15} strokeWidth={1.9} aria-hidden />
              Get a Quote
            </button>
          </div>

          <div className="card flex flex-col px-6 py-6" data-reveal data-stagger="2">
            <Mail size={17} strokeWidth={1.7} aria-hidden className="text-muted" />
            <h2 className="t-h4 mt-4">Just email me</h2>
            <p className="t-small mt-2 flex-1 text-muted">
              Prefer to write it out? That works too — I read everything that lands in my inbox.
            </p>
            <a href={`mailto:${SITE.email}`} className="btn btn-secondary mt-5 self-start">
              <Swap>
                <Mail size={15} strokeWidth={1.9} aria-hidden />
                Email Me
              </Swap>
            </a>
          </div>
        </div>
      </Container>

      <Container className="py-10 pb-16">
        <div className="grid gap-8 lg:grid-cols-[354px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-[100px] lg:self-start" data-reveal>
            <h2 className="t-h3">What happens next</h2>
            <p className="t-body mt-3 max-w-[320px] text-muted">
              No forms disappearing into a void — here’s the actual sequence.
            </p>
          </div>

          <div className="panel flex flex-col gap-2">
            {[
              'You get a reply within one business day, either way.',
              'If it looks like a fit, we set up a 30-minute call to go through the product and priorities.',
              'You get scope, timeline and price in writing before anything starts.',
              `Retainer work starts at ${monthly.price}${monthly.period}, and you can pause or cancel at the end of any month.`,
            ].map((p, i) => (
              <div
                key={p}
                className="card flex items-start gap-3 px-6 py-5"
                data-reveal
                data-stagger={i}
              >
                <Check />
                <p className="t-body text-muted">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <QuoteForm open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
