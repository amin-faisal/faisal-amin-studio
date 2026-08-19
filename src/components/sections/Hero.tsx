import { Mail } from 'lucide-react'
import { Container, Swap } from '@/components/ui'
import BookCall from '@/components/BookCall'
import { HERO, SITE } from '@/data/content'

/* Headline animates per word, like the reference. Each word carries its own
   stagger index, so the reveal walks across the line instead of fading the
   whole block at once. */

export default function Hero() {
  const words = HERO.headline.split(' ')

  return (
    <Container className="pt-[140px] pb-10 lg:pt-[170px]">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,620px)_minmax(0,420px)] lg:gap-16">
        {/* The space has to live outside the inline-block. A trailing space
            inside one is collapsed away, which ran every word together. */}
        <h1 className="t-h1">
          {words.map((w, i) => (
            <span key={i}>
              <span className="inline-block" data-reveal data-stagger={i * 0.35}>
                {w}
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <div data-reveal data-stagger="4">
          <p className="t-body text-muted">{HERO.body}</p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <BookCall>Book a Call</BookCall>
            <a href={`mailto:${SITE.email}`} className="btn btn-secondary">
              <Swap>
                <Mail size={14} strokeWidth={1.9} aria-hidden />
                Email Me
              </Swap>
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}
