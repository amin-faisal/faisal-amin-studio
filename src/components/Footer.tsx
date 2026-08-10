import Link from 'next/link'
import { Mail } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from '@/components/BrandIcons'
import { Container } from '@/components/ui'
import LogoMarquee from '@/components/LogoMarquee'
import LocalTime from '@/components/LocalTime'
import BookCall from '@/components/BookCall'
import { BRANDS, FOOTER_LINKS, SITE } from '@/data/content'

const isInternal = (href: string) => href.startsWith('/')

export default function Footer() {
  return (
    <footer id="contact" className="mt-10 border-t border-hairline pt-16 pb-10">
      <Container>
        <div data-reveal>
          <h2 className="t-h1 max-w-[520px]">{SITE.tagline}</h2>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <BookCall>Book a Call</BookCall>
            <a href={`mailto:${SITE.email}`} className="btn btn-secondary">
              <Mail size={14} strokeWidth={1.9} aria-hidden />
              Email Me
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3" data-reveal>
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <p className="t-small text-muted">{col.heading}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {isInternal(l.href) ? (
                      <Link href={l.href} className="t-body transition-opacity hover:opacity-60">
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noreferrer"
                        className="t-body transition-opacity hover:opacity-60"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
                {col.more && (
                  <li>
                    <Link
                      href={col.more.href}
                      className="t-body underline underline-offset-4 transition-opacity hover:opacity-60"
                    >
                      {col.more.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16" data-reveal>
          <p className="t-small mb-6 text-muted">Brands I’ve worked with</p>
          <LogoMarquee brands={BRANDS} duration={42} />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
          <span className="t-small text-muted">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-text"
            >
              <LinkedInIcon size={15} />
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-text"
            >
              <GitHubIcon size={15} />
            </a>
            <LocalTime />
          </div>
        </div>
      </Container>
    </footer>
  )
}
