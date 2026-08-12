import CaseVisuals from './CaseVisuals'
import { sectionId, type CaseBlock } from '@/data/content'

/* One templated case study section.

   Layout follows the reference: a small uppercase label in a left rail, all
   the prose in a measured column on the right. Every section is the same
   shape, which is what lets the sticky TOC be trustworthy. */

export default function CaseSection({ block, client }: { block: CaseBlock; client: string }) {
  const id = sectionId(block.heading)

  return (
    <section id={id} className="scroll-mt-[100px] border-t border-hairline pt-12">
      <div className="grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-10">
        <p className="t-label pt-1 tracking-[0.08em] text-muted uppercase" data-reveal>
          {block.heading}
        </p>

        <div className="ml-auto w-full max-w-[var(--frame-w)]">
          {block.title && (
            <h2 className="t-h2 mb-4" data-reveal>
              {block.title}
            </h2>
          )}

          {block.body?.map((p, i) => (
            <p key={i} className="t-body mt-4 first:mt-0 text-muted" data-reveal data-stagger={i}>
              {p}
            </p>
          ))}

          {block.bullets && (
            <ul className="mt-6 flex flex-col gap-3" data-reveal>
              {block.bullets.map((b, i) => (
                <li key={i} className="t-body flex gap-3 text-muted">
                  <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-muted" />
                  <span>
                    {b.lead && <strong className="font-medium text-text">{b.lead} </strong>}
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {block.meta && (
            <dl className="mt-8 grid gap-6 sm:grid-cols-3" data-reveal>
              {block.meta.map((m) => (
                <div key={m.label}>
                  <dt className="t-small text-muted">{m.label}</dt>
                  <dd className="t-small mt-1">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {block.pending && (
            <p className="t-small mt-6 rounded-inner bg-surface-2 px-4 py-3 text-muted">
              Placeholder — add this section in <code>CASE_STUDIES</code> in content.ts.
            </p>
          )}
        </div>
      </div>

      {/* Numbered process cards get the full width — they're a grid, not prose. */}
      {block.steps && (
        <div className="panel mt-10 ml-auto flex w-full max-w-[var(--frame-w)] flex-col gap-2">
          {block.steps.map((s, i) => (
            <div key={s.num} className="card flex flex-col px-5 py-6" data-reveal data-stagger={i}>
              <span className="t-h4 text-muted">{s.num}</span>
              <h3 className="t-h4 mt-6">{s.title}</h3>
              <p className="t-small mt-2 text-muted">{s.body}</p>
              <ul className="mt-4 flex flex-col gap-2 border-t border-hairline pt-4">
                {s.points.map((p) => (
                  <li key={p} className="t-small flex gap-2">
                    <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-muted" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {block.visuals ? (
        <CaseVisuals count={block.visuals} section={block.heading} client={client} />
      ) : null}
    </section>
  )
}
