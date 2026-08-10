import { StackSection } from '@/components/ui'
import { PROCESS } from '@/data/content'

export default function Process() {
  return (
    <StackSection title={PROCESS.title} body={PROCESS.body}>
      <div className="panel grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.steps.map((s, i) => (
          <div key={s.title} className="card flex flex-col px-6 py-6" data-reveal data-stagger={i}>
            <h3 className="t-h4">{s.title}</h3>
            <p className="t-body mt-2 text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </StackSection>
  )
}
