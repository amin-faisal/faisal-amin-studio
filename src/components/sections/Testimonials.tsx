import { Quote } from 'lucide-react'
import { Container } from '@/components/ui'
import { TESTIMONIALS, TESTIMONIALS_ARE_SAMPLES } from '@/data/content'

/* Real quotes when there are any. The sample set is written to look like the
   finished thing so the layout can be judged, but it stays labelled — an
   invented testimonial is the one element on this page a visitor has no way to
   tell apart from a real one. Setting TESTIMONIALS_ARE_SAMPLES to false drops
   the marker. */

export default function Testimonials() {
  if (!TESTIMONIALS.length) return null

  return (
    <Container className="py-14 lg:py-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4" data-reveal>
        <h2 className="t-h3 max-w-[420px]">What it’s like to work with me</h2>
        {TESTIMONIALS_ARE_SAMPLES && (
          <p className="t-small rounded-pill bg-surface-2 px-3 py-1.5 text-muted">
            Sample quotes — replace before launch
          </p>
        )}
      </div>

      <div className="panel grid gap-2 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="card flex flex-col p-6" data-reveal data-stagger={i}>
            <Quote size={18} strokeWidth={1.7} aria-hidden className="text-muted" />
            <blockquote className="t-body mt-4 flex-1">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
              <span aria-hidden className="size-10 shrink-0 rounded-pill bg-surface-2" />
              <span className="min-w-0">
                <span className="t-small block">{t.name}</span>
                <span className="t-small block text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  )
}
