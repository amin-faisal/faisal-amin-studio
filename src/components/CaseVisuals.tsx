import Image from 'next/image'

/* Visual slots for a case study section.

   Four renders the arrangement from the reference: one wide frame, then two
   side by side, then another wide one. One renders a single wide frame.

   Until real screenshots exist each slot is a labelled placeholder — an empty
   grey box with no explanation reads as a broken image. */

type Props = {
  count: number
  section: string
  client: string
  images?: string[]
}

/* Slots sit on the panel, so they take the card radius and card background —
   the grey frame around them comes from the panel. */
const frame = 'relative flex items-center justify-center overflow-hidden rounded-card bg-card'

function Slot({
  index,
  section,
  client,
  src,
  className,
}: {
  index: number
  section: string
  client: string
  src?: string
  className: string
}) {
  return (
    <div className={`${frame} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={`${client} — ${section} visual ${index + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1218px"
          className="object-cover"
        />
      ) : (
        <span className="t-small px-4 text-center text-muted">
          {section} visual {index + 1}
        </span>
      )}
    </div>
  )
}

export default function CaseVisuals({ count, section, client, images = [] }: Props) {
  if (count < 1) return null

  /* Grouped inside a panel, the same nesting used everywhere else on the site:
     grey frame, 8px inset, content sitting on it. */
  if (count === 1) {
    return (
      <div className="panel mt-8" data-reveal>
        <Slot index={0} section={section} client={client} src={images[0]} className="aspect-[16/9]" />
      </div>
    )
  }

  return (
    <div className="panel mt-8 flex flex-col gap-2" data-reveal>
      <Slot index={0} section={section} client={client} src={images[0]} className="aspect-[16/9]" />

      <div className="grid gap-2 sm:grid-cols-2">
        <Slot index={1} section={section} client={client} src={images[1]} className="aspect-[4/3]" />
        <Slot index={2} section={section} client={client} src={images[2]} className="aspect-[4/3]" />
      </div>

      <Slot index={3} section={section} client={client} src={images[3]} className="aspect-[16/9]" />
    </div>
  )
}
