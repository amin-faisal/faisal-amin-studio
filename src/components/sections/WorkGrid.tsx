import { Container } from '@/components/ui'
import LogoCard from '@/components/LogoCard'
import { WORK } from '@/data/content'

export default function WorkGrid() {
  return (
    <Container id="work" className="py-10">
      <div className="panel" data-reveal>
        <p className="t-small px-4 pt-2.5 pb-3 text-muted">
          Teams who trusted me to design for them
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {WORK.map((w) => (
            <LogoCard key={w.name} {...w} />
          ))}
        </div>
      </div>
    </Container>
  )
}
