import { AppWindow, Globe } from 'lucide-react'
import { StackSection } from '@/components/ui'
import { SERVICES } from '@/data/content'

/* Two columns. Brand identity and graphic design aren't offered, and the audit
   work folded into Product Design rather than standing on its own. */

const ICONS = { 'Product Design': AppWindow, 'Web Design': Globe }

export default function Services() {
  return (
    <StackSection
      id="services"
      title={'Everything you need,\none partner'}
      body="Product design and web design. Use the full engagement for one big push or spread it across smaller pieces."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.title as keyof typeof ICONS] ?? AppWindow
          return (
            <div key={s.title} className="panel flex flex-col" data-reveal data-stagger={i}>
              <p className="t-small flex items-center gap-2 px-4 pt-3 pb-4">
                <Icon size={15} strokeWidth={1.8} aria-hidden className="shrink-0 text-muted" />
                {s.title}
              </p>
              <div className="card grid flex-1 gap-2.5 px-5 py-5 sm:grid-cols-2">
                {s.points.map((p) => (
                  <span key={p} className="t-small text-muted">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </StackSection>
  )
}
