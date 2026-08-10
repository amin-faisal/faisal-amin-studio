import { Container } from '@/components/ui'
import { asset } from '@/lib/asset'

/* Full-width visual sitting directly under the client logos. Same treatment as
   the carousel's cover: 24px radius, panel-grey well.

   Pass `video` (a muted looping mp4 in /public) or `image` once the asset
   exists. With neither it renders a labelled placeholder rather than an empty
   grey box, so it's obvious what belongs here. */

export default function Showcase({
  video,
  poster,
  label = 'Showcase reel',
}: {
  video?: string
  poster?: string
  label?: string
}) {
  return (
    <Container className="py-10">
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-panel bg-surface-2 lg:aspect-[1218/685]"
        data-reveal
      >
        {video ? (
          <video
            className="absolute inset-0 size-full object-cover"
            src={asset(video)}
            poster={poster ? asset(poster) : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <span className="t-small absolute inset-0 flex items-center justify-center text-muted">
            {label} — pass a `video` path to Showcase once the file is in /public
          </span>
        )}
      </div>
    </Container>
  )
}
