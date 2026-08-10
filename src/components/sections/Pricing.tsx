'use client'

import { useState } from 'react'
import { ArrowUpRight, FileText } from 'lucide-react'
import { SplitSection, Check } from '@/components/ui'
import BookCall from '@/components/BookCall'
import QuoteForm from '@/components/QuoteForm'
import { PRICING, SITE } from '@/data/content'

export default function Pricing() {
  const { retainer, custom } = PRICING
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <SplitSection
      id="pricing"
      title="Plans that fit how startups actually work"
      body="No long-term lock-in, no scope negotiation, no surprises. Pick the model that fits and get started."
    >
      <div className="panel" data-reveal>
        <div className="card px-6 py-6">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="t-h4">{retainer.title}</h3>
            <span className="t-label rounded-pill bg-surface-2 px-3 py-1.5 text-muted">
              {retainer.badge}
            </span>
          </div>
          <p className="t-body mt-2 text-muted">{retainer.body}</p>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="t-h4 text-muted line-through">{retainer.priceWas}</span>
            <span className="t-h2">{retainer.priceNow}</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <BookCall>
              Book a Call
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
            </BookCall>
            <a href={`mailto:${SITE.email}`} className="btn btn-secondary">
              Email Me
            </a>
          </div>

          <ul className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
            {retainer.points.map((p) => (
              <li key={p} className="t-small flex items-start gap-3">
                <Check />
                <span className="text-muted">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2 px-6 py-5">
          <p className="t-small">{retainer.footnote.title}</p>
          <p className="t-small mt-1.5 text-muted">{retainer.footnote.body}</p>
        </div>
      </div>

      <div className="panel mt-2" data-reveal>
        <div className="card px-6 py-6">
          <h3 className="t-h4">{custom.title}</h3>
          <p className="t-body mt-2 text-muted">{custom.body}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setQuoteOpen(true)} className="btn btn-primary">
              <FileText size={14} strokeWidth={1.9} aria-hidden />
              Get a Custom Quote
            </button>
            <BookCall className="btn btn-secondary">Book a Call</BookCall>
          </div>

          <ul className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
            {custom.points.map((p) => (
              <li key={p} className="t-small flex items-start gap-3">
                <Check />
                <span className="text-muted">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <QuoteForm open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </SplitSection>
  )
}
