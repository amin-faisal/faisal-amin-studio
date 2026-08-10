import type { Metadata } from 'next'
import ContactContent from '@/components/sections/ContactContent'
import Footer from '@/components/Footer'
import { SITE } from '@/data/content'

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description:
    'Book a call, request a custom quote, or just send an email. Product design, web design and design audits.',
}

export default function ContactPage() {
  return (
    <main>
      <ContactContent />
      <Footer />
    </main>
  )
}
