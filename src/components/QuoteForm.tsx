'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { X, Check, ChevronDown, AppWindow, Globe, ClipboardCheck } from 'lucide-react'
import { Swap } from '@/components/ui'
import { FORM, QUOTE_FORM, SITE } from '@/data/content'

/* Custom-quote request.

   Submits straight to a form endpoint so the enquiry lands in the inbox
   without the visitor having to send anything themselves. Until FORM.accessKey
   is filled in there's nowhere to POST to, so it degrades to opening a
   pre-filled email rather than silently failing. */

const ICONS = [AppWindow, Globe, ClipboardCheck]

/* A red asterisk on required fields, nothing on optional ones. The legend
   under the heading explains it once, which is the convention people already
   know. Red is reserved for this single use across the whole site. */
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="t-small mb-2 block">
      {children}
      {required && (
        <span className="text-danger" aria-hidden>
          {' '}
          *
        </span>
      )}
      {required && <span className="sr-only"> (required)</span>}
    </span>
  )
}

const field =
  'w-full rounded-inner bg-surface-2 px-4 py-3 t-small text-text outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-text/15'

/* A native select draws its chevron hard against the right edge, outside the
   field's own padding, and no amount of styling moves it. appearance-none
   removes it so we can place a real icon inside the frame — which also means
   it inherits the theme instead of being whatever grey the OS picked.

   pr-11 keeps a long option from running underneath the icon, and
   pointer-events-none on the icon keeps clicks falling through to the select. */
function Select({ name, options }: { name: string; options: string[] }) {
  return (
    <span className="relative block">
      <select name={name} required defaultValue="" className={`${field} appearance-none pr-11`}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={1.9}
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
      />
    </span>
  )
}

export default function QuoteForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [services, setServices] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [thanks, setThanks] = useState(false)

  // <dialog> gives us the focus trap, Esc handling and inert background for
  // free — but only via showModal(), not by rendering it open.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      setStatus('idle')
    }
    if (!open && el.open) el.close()
  }, [open])

  const toggle = (v: string) =>
    setServices((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    const subject = `Custom project enquiry — ${d.get('business') || d.get('name')}`
    const lines = [
      `Name: ${d.get('name')}`,
      `Email: ${d.get('email')}`,
      `Business: ${d.get('business')}`,
      `Website: ${d.get('website') || '—'}`,
      `Budget: ${d.get('budget')}`,
      `Timeline: ${d.get('timeline')}`,
      `Services: ${services.join(', ') || '—'}`,
      '',
      `${d.get('message') || ''}`,
    ].join('\n')

    // No key configured — fall back to a pre-filled email so the enquiry isn't
    // simply lost.
    if (!FORM.accessKey) {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(lines)}`
      onClose()
      return
    }

    const payload = {
      name: String(d.get('name') || ''),
      email: String(d.get('email') || ''),
      business: String(d.get('business') || ''),
      website: String(d.get('website') || ''),
      budget: String(d.get('budget') || ''),
      timeline: String(d.get('timeline') || ''),
      services: services.join(', '),
      message: String(d.get('message') || ''),
    }

    /* Mirror into the sheet without blocking or failing the submission — the
       inbox is the destination that actually matters. no-cors because Apps
       Script doesn't send CORS headers; the response is opaque either way. */
    if (FORM.sheetEndpoint) {
      void fetch(FORM.sheetEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
      }).catch(() => {})
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM.accessKey,
          subject,
          from_name: d.get('name'),
          // Replies go straight to the person who filled the form in.
          replyto: d.get('email'),
          name: d.get('name'),
          email: d.get('email'),
          business: d.get('business'),
          website: d.get('website') || '—',
          budget: d.get('budget'),
          timeline: d.get('timeline'),
          services: services.join(', ') || '—',
          message: d.get('message') || '',
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setServices([])
      setStatus('idle')
      // Hand over to the thank-you dialog rather than leaving a filled-in form
      // sitting behind a success message.
      onClose()
      setThanks(true)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <dialog
        ref={ref}
        onClose={onClose}
        onClick={(e) => {
          if (e.target === ref.current) onClose() // click the backdrop
        }}
        className="m-auto w-[min(840px,calc(100vw-32px))] rounded-panel bg-card p-0 text-text backdrop:bg-black/45 backdrop:backdrop-blur-sm"
      >
        <form onSubmit={submit} className="relative max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-pill bg-text text-bg transition-opacity hover:opacity-80"
          >
            <X size={15} strokeWidth={2.2} aria-hidden />
          </button>

          <h2 className="t-h4 pr-12">Request a custom quote</h2>
          <p className="t-small mt-2 text-muted">
            Tell me what you’re building and I’ll come back with scope, timeline and a fixed price.
          </p>
          <p className="t-small mt-1 text-muted">
            Fields marked{' '}
            <span className="text-danger" aria-hidden>
              *
            </span>{' '}
            are required.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <Label required>Name</Label>
              <input name="name" required placeholder="Enter your name" className={field} />
            </label>
            <label className="block">
              <Label required>Email</Label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className={field}
              />
            </label>
            <label className="block">
              <Label required>Business name</Label>
              <input
                name="business"
                required
                placeholder="Enter your business name"
                className={field}
              />
            </label>
            <label className="block">
              <Label>Website link</Label>
              <input name="website" placeholder="Enter your website" className={field} />
            </label>
            <label className="block">
              <Label required>Budget</Label>
              <Select name="budget" options={QUOTE_FORM.budgets} />
            </label>
            <label className="block">
              <Label required>Timeline</Label>
              <Select name="timeline" options={QUOTE_FORM.timelines} />
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className="t-small mb-3">
              Services
              <span className="text-danger" aria-hidden>
                {' '}
                *
              </span>
              <span className="text-muted"> — select all that apply</span>
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {QUOTE_FORM.services.map((group, i) => {
                const Icon = ICONS[i] ?? AppWindow
                return (
                  <div key={group.title} className="panel flex flex-col">
                    <p className="t-small flex items-center gap-2 px-4 pt-3 pb-3">
                      <Icon size={15} strokeWidth={1.8} aria-hidden className="text-muted" />
                      {group.title}
                    </p>
                    <div className="card flex flex-1 flex-col gap-2.5 px-4 py-4">
                      {group.options.map((o) => (
                        <label key={o} className="t-small flex cursor-pointer items-start gap-2.5">
                          <input
                            type="checkbox"
                            checked={services.includes(o)}
                            onChange={() => toggle(o)}
                            className="mt-[3px] size-3.5 shrink-0 accent-[var(--text)]"
                          />
                          <span className="text-muted">{o}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </fieldset>

          <label className="mt-6 block">
            <Label>Message</Label>
            <textarea
              name="message"
              rows={4}
              placeholder="Type your message"
              className={`${field} resize-y`}
            />
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button type="submit" disabled={status === 'sending'} className="btn btn-primary">
              <Swap>{status === 'sending' ? 'Sending…' : 'Send request'}</Swap>
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              <Swap>Cancel</Swap>
            </button>

            {status === 'error' && (
              <p className="t-small text-text" role="alert">
                That didn’t send.{' '}
                <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                  Email me instead
                </a>
                .
              </p>
            )}
          </div>
        </form>
      </dialog>

      <ThankYou open={thanks} onClose={() => setThanks(false)} />
    </>
  )
}

/* Separate modal rather than a message inside the form — once it's sent, the
   form has nothing left to say and a filled-in form behind a success note
   invites a second submission. */
function ThankYou({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-auto w-[min(440px,calc(100vw-32px))] rounded-panel bg-card p-0 text-text backdrop:bg-black/45 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-pill bg-surface-2">
          <Check size={22} strokeWidth={2} aria-hidden />
        </span>
        <h2 className="t-h4 mt-5">Thanks — that’s landed.</h2>
        <p className="t-body mt-2 text-muted">
          I read everything myself and reply within one business day, either way.
        </p>
        <button type="button" onClick={onClose} className="btn btn-primary mt-6">
          <Swap>Close</Swap>
        </button>
      </div>
    </dialog>
  )
}
