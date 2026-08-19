import type { Metadata } from 'next'
import { Container, Check } from '@/components/ui'
import Pricing from '@/components/sections/Pricing'
import Faq from '@/components/sections/Faq'
import Process from '@/components/sections/Process'
import Footer from '@/components/Footer'
import BookCall from '@/components/BookCall'
import { SITE, PRICING } from '@/data/content'

export const metadata: Metadata = {
  title: `Pricing — ${SITE.name}`,
  description:
    'Two-week sprints and monthly retainers for product and web design. No contracts, cancel anytime.',
}

/* Reuses the homepage sections rather than duplicating them, so the numbers and
   copy can only ever be defined once.

   The hero deliberately doesn't repeat the two prices — the card below already
   shows them behind the switcher, and printing them twice within a screen of
   each other is what made this section feel redundant. It carries what's
   included instead. */

export default function PricingPage() {
  return (
    <main>
      <Container className="pt-[140px] pb-6 lg:pt-[170px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_var(--frame-w)] lg:gap-10">
          <div data-reveal>
            <h1 className="t-h1">Simple pricing, no contracts.</h1>
            <p className="t-body mt-4 max-w-[440px] text-muted">
              Take a two-week sprint for one focused push, or a monthly retainer for an ongoing
              design partner. Pause or cancel at the end of any cycle — there’s nothing to get out
              of.
            </p>
            <BookCall className="btn btn-primary mt-7">Book a Call</BookCall>
          </div>

          <div className="panel" data-reveal data-stagger="1">
            <div className="card px-6 py-6">
              <p className="t-h4">Included in every engagement</p>
              <ul className="mt-5 flex flex-col gap-3">
                {PRICING.retainer.points.map((p) => (
                  <li key={p} className="t-small flex items-start gap-3">
                    <Check />
                    <span className="text-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Pricing />
      <Process />
      <Faq />
      <Footer />
    </main>
  )
}
