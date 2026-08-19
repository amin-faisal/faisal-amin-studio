'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { X, AppWindow, Globe, ClipboardCheck } from 'lucide-react'
import { Swap } from '@/components/ui'
import { FORM, QUOTE_FORM, SITE } from '@/data/content'

/* Custom-quote request.

   Submits straight to a form endpoint so the enquiry lands in the inbox
   without the visitor having to send anything themselves. Until FORM.accessKey
   is filled in there's nowhere to POST to, so it degrades to opening a
   pre-filled email rather than silently failing. */

const ICONS = [AppWindow, Globe, ClipboardCheck]

/* Explicit words rather than an asterisk: an asterisk means nothing until
   you've found the legend explaining it, and there isn't one. Red is reserved
   for this single use across the whole site. */
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="t-small mb-2 block">
      {children}{' '}
      <span className={required ? 'text-danger' : 'text-muted'}>
        ({required ? 'required' : 'optional'})
      </span>
    </span>
  )
}

const field =
  'w-full rounded-inner bg-surface-2 px-4 py-3 t-small text-text outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-text/15'

export default function QuoteForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [services, setServices] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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
      setStatus('sent')
      form.reset()
      setServices([])
    } catch {
      setStatus('error')
    }
  }

  return (
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
            <select name="budget" required defaultValue="" className={field}>
              <option value="" disabled>
                Select…
              </option>
              {QUOTE_FORM.budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <Label required>Timeline</Label>
            <select name="timeline" required defaultValue="" className={field}>
              <option value="" disabled>
                Select…
              </option>
              {QUOTE_FORM.timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="mt-6">
          <legend className="t-small mb-3">
            Services <span className="text-danger">(required)</span>
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
            <Swap>{status === 'sent' ? 'Close' : 'Cancel'}</Swap>
          </button>

          {status === 'sent' && (
            <p className="t-small text-text" role="status">
              Thanks — that’s landed. I’ll reply within one business day.
            </p>
          )}
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
  )
}
