import { Container } from '@/components/ui'
import { KPIS } from '@/data/content'

/* Cards are top-aligned rather than centred. Centring lets a two-line label
   push its heading down, so the four headings lose their shared eye line. */

export default function Kpis() {
  return (
    <Container className="py-10">
      <div className="panel grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
        {KPIS.map((k) => (
          <div key={k.value} className="card flex flex-col justify-start px-6 py-7">
            <p className="t-h3">{k.value}</p>
            <p className="t-small mt-1.5 text-muted">{k.label}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
