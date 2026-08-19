'use client'

import { useState } from 'react'
import { Plus, Mail } from 'lucide-react'
import { SplitSection, Swap } from '@/components/ui'
import { FAQ, SITE } from '@/data/content'

/* Controlled rather than native <details> so the open/close can actually be
   animated — <details> snaps between states and there's no hook to ease. The
   body uses a 0fr→1fr grid transition, which is the only way to animate to an
   intrinsic height without measuring in JS. */

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <SplitSection
      id="faq"
      title="Frequently asked questions"
      body="How I work, what to expect, and whether we’re a good fit."
      aside={
        <div>
          <p className="t-small text-muted">Still have questions?</p>
          <a href={`mailto:${SITE.email}`} className="btn btn-primary mt-3">
            <Swap>
              <Mail size={14} strokeWidth={1.9} aria-hidden />
              Email me
            </Swap>
          </a>
        </div>
      }
    >
      <div className="panel flex flex-col gap-2">
        {FAQ.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className="card px-6 py-5" data-reveal data-stagger={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="t-body flex w-full cursor-pointer items-center justify-between gap-4 text-left"
              >
                {f.q}
                <Plus
                  size={17}
                  strokeWidth={1.9}
                  aria-hidden
                  className={[
                    'shrink-0 transition-[transform,color] duration-[380ms] ease-[var(--ease-elastic)]',
                    // 45° turns the plus into an X, and the open one sits at
                    // full text colour rather than muted.
                    isOpen ? 'rotate-45 text-text' : 'rotate-0 text-muted',
                  ].join(' ')}
                />
              </button>

              <div className="accordion-body" data-open={isOpen}>
                <div>
                  <p className="t-body pt-3 text-muted">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SplitSection>
  )
}
