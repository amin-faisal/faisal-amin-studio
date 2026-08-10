'use client'

import { useEffect, useState } from 'react'
import { SITE } from '@/data/content'

/* Renders nothing until mounted. The server and the visitor's machine can
   disagree about the current minute, and a hydration mismatch on a clock is
   not worth the byte it's printed on. */

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          timeZone: SITE.timezone,
        }).format(new Date()),
      )

    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="t-small text-muted" suppressHydrationWarning>
      {time ? `${SITE.location} · ${time}` : SITE.location}
    </span>
  )
}
