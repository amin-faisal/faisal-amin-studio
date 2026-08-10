'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import { StackSection, Check } from '@/components/ui'
import BookCall from '@/components/BookCall'
import QuoteForm from '@/components/QuoteForm'
import { PRICING, SITE } from '@/data/content'

export default function Pricing() {
  const { plans, retainer, custom } = PRICING
  const [planId, setPlanId] = useState(plans[1].id) // month is the default
  const [quoteOpen, setQuoteOpen] = useState(false)
  const plan = plans.find((p) => p.id === planId) ?? plans[0]

  return (
    <StackSection
      id="pricing"
      title="Plans that fit how startups actually work"
      body="No long-term lock-in, no scope negotiation, no surprises. Pick the model that fits and get started."
    >
      <div className="grid gap-2 lg:grid-cols-2">
        <div className="panel flex flex-col" data-reveal>
          <div className="card flex flex-1 flex-col px-6 py-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="t-h4">{retainer.title}</h3>
                <span className="t-label mt-2 inline-block rounded-pill bg-surface-2 px-3 py-1.5 text-muted">
                  {retainer.badge}
                </span>
              </div>

              {/* Switcher sits top-right in the card. The sliding pill is a
                  sibling behind the labels rather than a background on the
                  active one, so it can animate between the two. */}
              <div
                role="tablist"
                aria-label="Billing period"
                className="relative flex shrink-0 rounded-pill bg-surface-2 p-1"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-1 rounded-pill bg-card shadow-[var(--card-shadow)] transition-[left] duration-300 ease-[var(--ease-out-soft)]"
                  style={{ width: 'calc(50% - 4px)', left: planId === plans[0].id ? '4px' : '50%' }}
                />
                {plans.map((p) => (
                  <button
                    key={p.id}
                    role="tab"
                    type="button"
                    aria-selected={planId === p.id}
                    onClick={() => setPlanId(p.id)}
                    className={[
                      'relative z-10 rounded-pill px-4 py-2 text-[13px] font-medium tracking-[-0.03em] transition-[color] duration-200',
                      planId === p.id ? 'text-text' : 'text-muted hover:text-text',
                    ].join(' ')}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="t-body mt-4 text-muted">{plan.body}</p>

            <div key={plan.id} className="mt-5 flex animate-[fadeIn_.3s_ease-out] items-baseline gap-1">
              <span className="t-h2">{plan.price}</span>
              <span className="t-small text-muted">{plan.period}</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <BookCall>Book a Call</BookCall>
              <a href={`mailto:${SITE.email}`} className="btn btn-secondary">
                Email Me
              </a>
            </div>

            <ul className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
              <li className="t-small flex items-start gap-3">
                <Check />
                <span className="text-muted">{plan.cadence}</span>
              </li>
              {retainer.points.map((p) => (
                <li key={p} className="t-small flex items-start gap-3">
                  <Check />
                  <span className="text-muted">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div key={`${plan.id}-cap`} className="animate-[fadeIn_.3s_ease-out] px-6 py-5">
            <p className="t-small">{plan.capacity.title}</p>
            <p className="t-small mt-1.5 text-muted">{plan.capacity.body}</p>
          </div>
        </div>

        <div className="panel flex flex-col" data-reveal data-stagger="1">
          <div className="card flex flex-1 flex-col px-6 py-6">
            <h3 className="t-h4">{custom.title}</h3>
            <p className="t-body mt-2 text-muted">{custom.body}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setQuoteOpen(true)} className="btn btn-primary">
                <FileText size={15} strokeWidth={1.9} aria-hidden />
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
      </div>

      <QuoteForm open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </StackSection>
  )
}
