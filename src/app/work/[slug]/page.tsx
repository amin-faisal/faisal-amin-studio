import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import Footer from '@/components/Footer'
import BookCall from '@/components/BookCall'
import CaseStudyNav from '@/components/CaseStudyNav'
import CaseSection from '@/components/CaseSection'
import LogoMark from '@/components/LogoMark'
import { CASE_STUDIES, caseBlocks, caseStudyBySlug, SITE } from '@/data/content'

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
  // Every case study renders the same eight sections, so the TOC is identical
  // across the site — sections without content show their placeholder state.
  const blocks = caseBlocks(study)
  const headings = blocks.map((b) => b.heading)

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

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,700px)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal>
            <LogoMark logo={study.logo} name={study.name} height={30} />
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
                <dt className="t-small text-muted">Service</dt>
                <dd className="t-small mt-1">{study.service}</dd>
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
        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <CaseStudyNav headings={headings} />

          <div className="flex flex-col gap-16">
            {blocks.map((b) => (
              <CaseSection key={b.heading} block={b} client={study.name} />
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-4">
        <div className="panel" data-reveal>
          <div className="card flex flex-wrap items-center justify-between gap-4 px-6 py-6">
            <div>
              <h2 className="t-h4">Working on something like this?</h2>
              <p className="t-small mt-1 text-muted">
                Thirty minutes, no pitch — just what you’re building and whether I can help.
              </p>
            </div>
            <BookCall className="btn btn-primary">Book a Call</BookCall>
          </div>
        </div>
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
