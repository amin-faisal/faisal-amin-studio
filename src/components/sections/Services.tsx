import { AppWindow, Globe, ClipboardCheck } from 'lucide-react'
import { SplitSection } from '@/components/ui'
import { SERVICES } from '@/data/content'

/* Three columns, not the reference's three-including-brand. Brand identity and
   graphic design aren't offered, so that column is gone and Design Audit
   takes its place. */

const ICONS = { 'Product Design': AppWindow, 'Web Design': Globe, 'Design Audit': ClipboardCheck }

export default function Services() {
  return (
    <SplitSection
      id="services"
      title={'Everything you need,\none partner'}
      body="Product design, web design and design audits. Use the full month for one big push or spread it across smaller pieces."
    >
      <div className="grid gap-2 sm:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.title as keyof typeof ICONS] ?? AppWindow
          return (
            /* flex-col + flex-1 on the card, not h-full. h-full resolves
               against the panel's full height — which already includes the
               title row — so the card overflowed the frame and looked clipped. */
            <div key={s.title} className="panel flex flex-col" data-reveal data-stagger={i}>
              <p className="t-small flex items-center gap-2 px-4 pt-3 pb-4">
                <Icon size={15} strokeWidth={1.8} aria-hidden className="shrink-0 text-muted" />
                {s.title}
              </p>
              <div className="card flex flex-1 flex-col gap-2.5 px-5 py-5">
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
    </SplitSection>
  )
}
