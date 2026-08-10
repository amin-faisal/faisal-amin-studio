import { SplitSection } from '@/components/ui'
import { PROCESS } from '@/data/content'

export default function Process() {
  return (
    <SplitSection title={PROCESS.title} body={PROCESS.body}>
      <div className="panel flex flex-col gap-2">
        {PROCESS.steps.map((s, i) => (
          <div key={s.title} className="card px-6 py-6" data-reveal data-stagger={i}>
            <h3 className="t-h4">{s.title}</h3>
            <p className="t-body mt-2 text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </SplitSection>
  )
}
