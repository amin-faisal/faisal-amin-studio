import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Container } from '@/components/ui'
import { TESTIMONIALS, type Testimonial } from '@/data/content'

/* Renders real quotes when there are any, and the empty template when there
   aren't. The placeholders are deliberately obvious — inventing a plausible
   client name and quote would put words in a real person's mouth, and this
   section is the one place on the site where that would be believed. */

const TEMPLATE: Testimonial[] = [
  { quote: 'Client quote goes here — two or three lines is the sweet spot.', name: 'Client name', role: 'Role, Company' },
  { quote: 'Client quote goes here — two or three lines is the sweet spot.', name: 'Client name', role: 'Role, Company' },
  { quote: 'Client quote goes here — two or three lines is the sweet spot.', name: 'Client name', role: 'Role, Company' },
]

function Card({ t, placeholder }: { t: Testimonial; placeholder?: boolean }) {
  return (
    <div className="card flex flex-col p-6">
      <Quote
        size={18}
        strokeWidth={1.7}
        aria-hidden
        className={placeholder ? 'text-surface-3' : 'text-muted'}
      />
      <p className={`t-body mt-4 flex-1 ${placeholder ? 'text-muted/60' : ''}`}>
        {placeholder ? t.quote : `“${t.quote}”`}
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
        {t.avatar ? (
          <Image
            src={t.avatar}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-pill object-cover"
          />
        ) : (
          <span aria-hidden className="size-10 shrink-0 rounded-pill bg-surface-2" />
        )}
        <span className="min-w-0">
          <span className={`t-small block ${placeholder ? 'text-muted/60' : ''}`}>{t.name}</span>
          <span className="t-small block text-muted">{t.role}</span>
        </span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const isPlaceholder = TESTIMONIALS.length === 0
  const items = isPlaceholder ? TEMPLATE : TESTIMONIALS

  return (
    <Container className="py-14 lg:py-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4" data-reveal>
        <h2 className="t-h3 max-w-[420px]">What it’s like to work with me</h2>
        {isPlaceholder && (
          <p className="t-small text-muted">
            Template — add real quotes to <code>TESTIMONIALS</code> in content.ts
          </p>
        )}
      </div>

      <div className="panel grid gap-2 md:grid-cols-3">
        {items.map((t, i) => (
          <div key={i} data-reveal data-stagger={i}>
            <Card t={t} placeholder={isPlaceholder} />
          </div>
        ))}
      </div>
    </Container>
  )
}
