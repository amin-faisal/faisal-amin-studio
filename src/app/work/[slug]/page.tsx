import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Container, Arrow } from '@/components/ui'
import Footer from '@/components/Footer'
import BookCall from '@/components/BookCall'
import { CASE_STUDIES, caseStudyBySlug, SITE } from '@/data/content'

type Params = { params: Promise<{ slug: string }> }

/** Every case study is known at build time, so they all prerender. */
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const c = caseStudyBySlug(slug)
  if (!c) return {}
  return { title: `${c.name} — ${SITE.name}`, description: c.summary }
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const study = caseStudyBySlug(slug)
  if (!study) notFound()

  const index = CASE_STUDIES.findIndex((c) => c.slug === slug)
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length]
  const ready = study.sections.length > 0

  return (
    <main>
      <Container className="pt-[140px] pb-10 lg:pt-[170px]">
        <Link
          href="/work"
          className="t-small inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          data-reveal
        >
          <ArrowLeft size={14} strokeWidth={1.9} aria-hidden />
          All work
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal>
            <Image
              src={study.logo}
              alt={`${study.name} logo`}
              width={140}
              height={40}
              className="h-7 w-auto object-contain dark:opacity-90 dark:brightness-0 dark:invert"
            />
            <h1 className="t-h1 mt-6">{study.title}</h1>
            <p className="t-body mt-4 text-muted">{study.summary}</p>
          </div>

          <dl className="panel h-fit" data-reveal data-stagger="1">
            <div className="card flex flex-col gap-4 px-6 py-6">
              <div>
                <dt className="t-small text-muted">Client</dt>
                <dd className="t-small mt-1">{study.name}</dd>
              </div>
              <div>
                <dt className="t-small text-muted">Discipline</dt>
                <dd className="t-small mt-1">{study.tag}</dd>
              </div>
              <div>
                <dt className="t-small text-muted">Year</dt>
                <dd className="t-small mt-1">{study.year}</dd>
              </div>
              {study.result && (
                <div>
                  <dt className="t-small text-muted">Outcome</dt>
                  <dd className="t-small mt-1">{study.result}</dd>
                </div>
              )}
            </div>
          </dl>
        </div>
      </Container>

      <Container className="pb-4">
        <div
          className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-panel bg-surface-2 lg:aspect-[1218/560]"
          data-reveal
        >
          {study.cover ? (
            <Image
              src={study.cover}
              alt={`${study.name} cover`}
              fill
              sizes="1218px"
              className="object-cover"
            />
          ) : (
            <span className="t-small text-muted">Cover image — {study.name}</span>
          )}
        </div>
      </Container>

      <Container className="py-14 lg:py-20">
        {ready ? (
          <div className="grid gap-8 lg:grid-cols-[354px_minmax(0,1fr)] lg:gap-10">
            <p className="t-h3 lg:sticky lg:top-[100px] lg:self-start" data-reveal>
              How it went
            </p>
            <div className="panel flex flex-col gap-2">
              {study.sections.map((s, i) => (
                <div key={s.heading} className="card px-6 py-6" data-reveal data-stagger={i}>
                  <h2 className="t-h4">{s.heading}</h2>
                  <p className="t-body mt-2 text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="panel" data-reveal>
            <div className="card flex flex-col items-start px-6 py-8">
              <h2 className="t-h4">Case study in progress</h2>
              <p className="t-body mt-2 max-w-[520px] text-muted">
                I’m still writing this one up. If you’d like to hear about the work in the meantime,
                the fastest route is a call.
              </p>
              <BookCall className="btn btn-primary mt-5">
                Book a Call
                <Arrow />
              </BookCall>
            </div>
          </div>
        )}
      </Container>

      <Container className="pb-16">
        <Link
          href={`/work/${next.slug}`}
          className="panel group block"
          data-reveal
          aria-label={`Next case study: ${next.name}`}
        >
          <div className="card flex flex-wrap items-center justify-between gap-4 px-6 py-6">
            <div>
              <p className="t-small text-muted">Next case study</p>
              <p className="t-h4 mt-1">{next.name}</p>
            </div>
            <span className="btn btn-secondary">
              View
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
            </span>
          </div>
        </Link>
      </Container>

      <Footer />
    </main>
  )
}
