import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui'
import Footer from '@/components/Footer'
import { CASE_STUDIES, SITE } from '@/data/content'

export const metadata: Metadata = {
  title: `Work — ${SITE.name}`,
  description: 'Selected product design, web design and design system work.',
}

export default function WorkIndex() {
  return (
    <main>
      <Container className="pt-[140px] pb-10 lg:pt-[170px]">
        <h1 className="t-h1 max-w-[520px]" data-reveal>
          Work
        </h1>
        <p className="t-body mt-4 max-w-[520px] text-muted" data-reveal data-stagger="1">
          Selected projects across healthcare, identity, e-commerce and EdTech. Each one is a
          product I worked on end to end.
        </p>
      </Container>

      <Container className="pb-16">
        <div className="panel grid gap-2 sm:grid-cols-2">
          {CASE_STUDIES.map((c, i) => {
            const ready = c.sections.length > 0
            return (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className="card group flex flex-col p-6 transition-transform duration-300 hover:-translate-y-0.5"
                data-reveal
                data-stagger={i}
              >
                <div className="flex items-start justify-between gap-4">
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={140}
                    height={40}
                    className="h-6 w-auto max-w-[45%] object-contain dark:opacity-90 dark:brightness-0 dark:invert"
                  />
                  <span className="t-label shrink-0 rounded-pill bg-surface-2 px-3 py-1.5 text-muted">
                    {ready ? c.year : 'Coming soon'}
                  </span>
                </div>

                <h2 className="t-h4 mt-6">{c.title}</h2>
                <p className="t-small mt-2 flex-1 text-muted">{c.summary}</p>

                {c.result && <p className="t-small mt-4">{c.result}</p>}

                <span className="t-small mt-5 inline-flex items-center gap-1.5 border-t border-hairline pt-5 text-muted transition-colors group-hover:text-text">
                  {c.tag}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden className="ml-auto" />
                </span>
              </Link>
            )
          })}
        </div>
      </Container>

      <Footer />
    </main>
  )
}
