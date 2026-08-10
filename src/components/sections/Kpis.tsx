import { Container } from '@/components/ui'
import { KPIS } from '@/data/content'

export default function Kpis() {
  return (
    <Container className="py-10">
      <div className="panel grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
        {KPIS.map((k) => (
          <div key={k.value} className="card flex flex-col justify-center px-6 py-7">
            <p className="t-h3">{k.value}</p>
            <p className="t-small mt-1.5 text-muted">{k.label}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
