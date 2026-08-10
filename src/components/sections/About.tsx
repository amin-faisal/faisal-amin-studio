import { Mail } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from '@/components/BrandIcons'
import { Container } from '@/components/ui'
import { ABOUT, SITE } from '@/data/content'

export default function About() {
  return (
    <Container id="about" className="py-14 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,528px)_minmax(0,1fr)] lg:gap-16">
        <div data-reveal>
          <h2 className="t-h3">{ABOUT.title}</h2>
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} className="t-body mt-4 text-muted">
              {p}
            </p>
          ))}
        </div>

        <div className="panel self-start" data-reveal>
          {/* Portrait goes here — dp.webp from the portfolio repo, or a new shot. */}
          <div className="flex h-[300px] items-center justify-center rounded-card bg-surface-2">
            <span className="t-small text-muted">Portrait</span>
          </div>
          <div className="px-5 py-5">
            <p className="t-h4">{ABOUT.name}</p>
            <p className="t-small mt-1 text-muted">{ABOUT.role}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <LinkedInIcon size={13} />
                LinkedIn
              </a>
              <a href={SITE.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <GitHubIcon size={13} />
                GitHub
              </a>
              <a href={`mailto:${SITE.email}`} className="btn btn-secondary">
                <Mail size={14} strokeWidth={1.9} aria-hidden />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
