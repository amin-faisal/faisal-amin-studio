import { Container } from '@/components/ui'
import { PROBLEMS, SOLUTIONS } from '@/data/content'

function Column({
  eyebrow,
  items,
  tone,
}: {
  eyebrow: string
  items: string[]
  tone: 'problem' | 'solution'
}) {
  return (
    <div className="panel">
      <p className="t-small px-4 pt-3 pb-4 text-muted">{eyebrow}</p>
      <div className="flex flex-col gap-2">
        {items.map((t, i) => (
          <div key={t} className="card flex items-start gap-3 px-5 py-5" data-reveal data-stagger={i}>
            <span
              aria-hidden="true"
              className={[
                'mt-[5px] flex size-4 shrink-0 items-center justify-center rounded-full',
                tone === 'problem' ? 'bg-surface-3' : 'bg-text',
              ].join(' ')}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                <path
                  d={tone === 'problem' ? 'M6 6l12 12M18 6L6 18' : 'M5 12.8l4.2 4.2L19 7.2'}
                  stroke={tone === 'problem' ? 'currentColor' : 'var(--bg)'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="t-body">{t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProblemSolution() {
  return (
    <Container className="py-14 lg:py-20">
      <h2 className="t-h3 mb-6 max-w-[520px]" data-reveal>
        Bad design is costing you users, trust, and money
      </h2>
      <div className="grid gap-2 lg:grid-cols-2">
        <Column eyebrow="Sound familiar?" items={PROBLEMS} tone="problem" />
        <Column eyebrow="What changes when I step in" items={SOLUTIONS} tone="solution" />
      </div>
    </Container>
  )
}
