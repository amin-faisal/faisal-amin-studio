import type { Metadata } from 'next'
import { Container } from '@/components/ui'
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

/* Reuses the homepage sections rather than duplicating them, so the numbers
   and copy can only ever be defined once. */

export default function PricingPage() {
  const [fortnight, monthly] = PRICING.plans

  return (
    <main>
      <Container className="pt-[140px] pb-6 lg:pt-[170px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_var(--frame-w)] lg:gap-10">
          <div data-reveal>
            <h1 className="t-h1">Simple pricing, no contracts.</h1>
            <p className="t-body mt-4 text-muted">
              Pick a two-week sprint for one focused push, or a monthly retainer for an ongoing
              design partner. Pause or cancel at the end of any cycle — there’s nothing to get out
              of.
            </p>
            <BookCall className="btn btn-primary mt-7">Book a Call</BookCall>
          </div>

          <div className="panel grid gap-2 sm:grid-cols-2" data-reveal data-stagger="1">
            {[fortnight, monthly].map((p) => (
              <div key={p.id} className="card flex flex-col px-6 py-6">
                <p className="t-small text-muted">{p.label}</p>
                <p className="t-h2 mt-2">{p.price}</p>
                <p className="t-small mt-1 text-muted">{p.period}</p>
              </div>
            ))}
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
