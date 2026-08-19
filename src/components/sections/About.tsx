import Image from 'next/image'
import { Mail } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from '@/components/BrandIcons'
import { SplitSection } from '@/components/ui'
import { ABOUT, SITE } from '@/data/content'

/* Same shape as every other section: heading and copy running down the left,
   the frame on the right edge. The portrait now lines up with the pricing
   cards and the case study visuals rather than sitting at its own width. */

export default function About() {
  return (
    <SplitSection
      id="about"
      title={ABOUT.title}
      aside={
        <div className="mt-4">
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} className="t-body mt-4 first:mt-0 text-muted">
              {p}
            </p>
          ))}
        </div>
      }
    >
      <div className="panel" data-reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-2">
          <Image
            src={SITE.photo}
            alt={`${ABOUT.name}, ${ABOUT.role}`}
            fill
            sizes="636px"
            priority
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 px-5 py-5">
          <div>
            <p className="t-h4">{ABOUT.name}</p>
            <p className="t-small mt-1 text-muted">{ABOUT.role}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
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
    </SplitSection>
  )
}
