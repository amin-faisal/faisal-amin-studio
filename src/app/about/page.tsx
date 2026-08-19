import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react'
import { Container, Check, Swap } from '@/components/ui'
import { LinkedInIcon, GitHubIcon } from '@/components/BrandIcons'
import BookCall from '@/components/BookCall'
import Footer from '@/components/Footer'
import LogoMarquee from '@/components/LogoMarquee'
import { ABOUT, BRANDS, KPIS, SITE, TOOLS, EXPERIENCE, EDUCATION } from '@/data/content'

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description:
    'Senior product designer working on SaaS across AI, fintech, healthcare and e-commerce.',
}

export default function AboutPage() {
  return (
    <main>
      <Container className="pt-[140px] pb-10 lg:pt-[170px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal>
            <p className="t-small text-muted">{SITE.role}</p>
            <h1 className="t-h1 mt-3">{ABOUT.title}</h1>
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="t-body mt-4 text-muted">
                {p}
              </p>
            ))}

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <BookCall>Book a Call</BookCall>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <Swap>
                  <LinkedInIcon size={14} />
                  LinkedIn
                </Swap>
              </a>
              <a href={SITE.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <Swap>
                  <GitHubIcon size={14} />
                  GitHub
                </Swap>
              </a>
            </div>
          </div>

          <div className="panel h-fit lg:justify-self-end lg:w-full" data-reveal data-stagger="1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-2">
              <Image
                src={SITE.photo}
                alt={`${ABOUT.name}, ${SITE.role}`}
                fill
                sizes="420px"
                priority
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col gap-3 px-5 py-5">
              <p className="t-small flex items-center gap-3">
                <MapPin size={15} strokeWidth={1.8} aria-hidden className="shrink-0 text-muted" />
                {SITE.location}
              </p>
              <p className="t-small flex items-center gap-3">
                <Briefcase
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden
                  className="shrink-0 text-muted"
                />
                {EXPERIENCE[0].company} · {EXPERIENCE[0].role}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-10">
        <div className="panel grid gap-2 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {KPIS.map((k) => (
            <div key={k.value} className="card flex flex-col justify-start px-6 py-7">
              <p className="t-h3">{k.value}</p>
              <p className="t-small mt-1.5 text-muted">{k.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="py-14 lg:py-20">
        <h2 className="t-h3 mb-8" data-reveal>
          Where I’ve worked
        </h2>
        <div className="panel flex flex-col gap-2">
          {EXPERIENCE.map((e, i) => (
            <div key={e.company} className="card px-6 py-6" data-reveal data-stagger={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="t-h4">{e.company}</h3>
                <span className="t-small text-muted">{e.period}</span>
              </div>
              <p className="t-small mt-1 text-muted">{e.role}</p>
              <p className="t-body mt-3 text-muted">{e.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-hairline pt-4">
                {e.highlights.map((h) => (
                  <span key={h} className="pill">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-14 lg:pb-20">
        <div className="grid gap-2 lg:grid-cols-2">
          <div className="panel flex flex-col" data-reveal>
            <p className="t-small flex items-center gap-2 px-4 pt-3 pb-4">
              <GraduationCap size={15} strokeWidth={1.8} aria-hidden className="text-muted" />
              Education
            </p>
            {/* One card each rather than a stacked list — three entries running
                together in a single card read as one block of text. */}
            <div className="flex flex-1 flex-col gap-2">
              {EDUCATION.map((e) => (
                <div
                  key={e.title}
                  className="card flex flex-wrap items-center justify-between gap-4 px-6 py-5"
                >
                  <div className="min-w-0">
                    <p className="t-small">{e.title}</p>
                    <p className="t-small mt-1 text-muted">
                      {e.place} · {e.period}
                    </p>
                  </div>
                  {'href' in e && e.href && (
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm shrink-0"
                    >
                      <Swap>
                        See credential
                        <ArrowUpRight size={13} strokeWidth={2} aria-hidden />
                      </Swap>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="panel flex flex-col" data-reveal data-stagger="1">
            <p className="t-small px-4 pt-3 pb-4">Tools I work in</p>
            <div className="card flex flex-1 flex-wrap content-start gap-2 px-6 py-6">
              {TOOLS.map((t) => (
                <span
                  key={t.name}
                  className="t-small inline-flex items-center gap-2 rounded-pill bg-surface-2 px-3 py-2 text-text-soft"
                >
                  <Image
                    src={t.icon}
                    alt=""
                    aria-hidden
                    width={16}
                    height={16}
                    className="size-4"
                  />
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-14 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-[354px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-[100px] lg:self-start" data-reveal>
            <h2 className="t-h3">How I like to work</h2>
          </div>
          <div className="panel flex flex-col gap-2">
            {[
              'Directly with the people building the product — no account manager in between.',
              'Structure before surface. Most “design problems” turn out to be information architecture problems.',
              'Progress every other business day, so nobody waits weeks to find out a direction is wrong.',
              'I care whether it ships, not whether the file looks good in Figma.',
            ].map((p, i) => (
              <div
                key={p}
                className="card flex items-start gap-3 px-6 py-5"
                data-reveal
                data-stagger={i}
              >
                <Check />
                <p className="t-body text-muted">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <p className="t-small mb-6 text-muted" data-reveal>
          Brands I’ve worked with
        </p>
        <div data-reveal>
          <LogoMarquee brands={BRANDS} duration={42} />
        </div>
      </Container>

      <Footer />
    </main>
  )
}
