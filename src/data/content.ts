/* All site copy and data lives here.

   Voice is first person throughout — this is a solo studio, not a "we".
   Anything marked NEEDS REVIEW is drafted copy or a placeholder that should be
   confirmed before the site goes public. */

import { asset } from '@/lib/asset'

export const SITE = {
  name: 'Faisal Amin',
  role: 'Senior Product Designer',
  tagline: 'The design partner for your product.',
  email: 'work.faisalamin@gmail.com',
  linkedin: 'https://www.linkedin.com/in/faisal-amin-83a15320b/',
  github: 'https://github.com/amin-faisal',
  location: 'Islamabad, Pakistan',
  timezone: 'Asia/Karachi',
}

/** Cal.com element-click embed. */
export const CAL = {
  namespace: '30min',
  link: 'faisal-amin/30min',
}

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
]

export const HERO = {
  headline: 'Product design, websites, and design systems for startups. One monthly fee. No contracts.',
  body: "You get a design partner who thinks about your product, not just your pixels. I work alongside your team — research, flows, interface, and the system that holds it together.",
}

export type Brand = { name: string; logo: string }

/** Clients only. Education logos (NUST, Uxcel, Coursera) deliberately excluded. */
const RAW_BRANDS: Brand[] = [
  { name: 'Modalys', logo: '/logos/modalys.webp' },
  { name: 'Natural Heroes', logo: '/logos/natural-heroes.webp' },
  { name: 'Clyro', logo: '/logos/clyro.webp' },
  { name: 'truID', logo: '/logos/truid.webp' },
  { name: 'OctiLearn', logo: '/logos/octilearn.webp' },
  { name: 'ChipXprt', logo: '/logos/chipxprt.webp' },
  { name: 'Takhleeq', logo: '/logos/takhleeq.webp' },
  { name: 'Face44', logo: '/logos/face44.webp' },
]

/* Paths are prefixed once, here, so no component has to remember to do it. */
export const BRANDS: Brand[] = RAW_BRANDS.map((b) => ({ ...b, logo: asset(b.logo) }))

export type CaseStudy = {
  slug: string
  name: string
  logo: string
  tag: string
  year: string
  title: string
  summary: string
  /** Headline outcome. Omitted where there isn't a verified number. */
  result?: string
  /** Full write-up. Empty array renders the "in progress" state. */
  sections: { heading: string; body: string }[]
  /** Cover art. Null renders a labelled placeholder block. */
  cover: string | null
}

/* Content ported from the portfolio repo. Only claims that already existed
   there are repeated here — nothing about outcomes is invented. */
const RAW_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'modalys',
    name: 'Modalys',
    logo: '/logos/modalys.webp',
    tag: 'Occupational Healthcare',
    year: '2026',
    title: 'Rebuilding a UK occupational health platform end to end',
    summary:
      'Four clinical modules, two very different audiences, one design system. I led information architecture and user flows across the whole platform, simplifying processes like organisation structures and employee onboarding.',
    result: '500+ organisations · 60K+ people covered',
    cover: null,
    sections: [
      {
        heading: 'The problem',
        body: 'Occupational health runs on processes that are genuinely complicated — organisation hierarchies, referral chains, clinical records. The existing product exposed all of that complexity directly to the user, and both clinicians and employers were slower for it.',
      },
      {
        heading: 'What I did',
        body: 'Built the information architecture and user flows across four core modules, then the high-fidelity UI and the design system underneath it. Progressive disclosure did most of the heavy lifting: show the one decision that matters now, keep the rest reachable but out of the way.',
      },
      {
        heading: 'Outcome',
        body: 'The platform now serves 500+ organisations covering 60K+ people, on a single design system shared across every module.',
      },
    ],
  },
  {
    slug: 'truid',
    name: 'truID',
    logo: '/logos/truid.webp',
    tag: 'Biometric Identity',
    year: '2025',
    title: 'Identity verification banks and telcos actually finish',
    summary:
      'Touchless fingerprint, face liveness and document checks in a single flow — designed so a first-time user gets through it without help, on whatever phone they own.',
    result: '2.6M+ verifications at one bank · under 30s per check',
    cover: null,
    sections: [
      {
        heading: 'The problem',
        body: 'Identity verification fails at the moments where users are least patient. Every extra instruction, retry or unexplained rejection is someone abandoning an account opening.',
      },
      {
        heading: 'What I did',
        body: 'Designed one continuous flow across three very different capture types, with the states that actually matter — retry, poor lighting, document mismatch — treated as first-class screens rather than error toasts.',
      },
      {
        heading: 'Outcome',
        body: '2.6M+ verifications at a single bank, with checks completing in under 30 seconds.',
      },
    ],
  },
  {
    slug: 'natural-heroes',
    name: 'Natural Heroes',
    logo: '/logos/natural-heroes.webp',
    tag: 'E-commerce',
    year: '2025',
    title: 'Selling ingredients, not just products',
    summary:
      'A Dutch DIY skincare brand selling raw natural ingredients — storefront and buying experience for a catalogue that keeps growing.',
    result: '100K+ orders a year · €350K+ monthly revenue',
    cover: null,
    sections: [
      {
        heading: 'The problem',
        body: 'A catalogue of raw ingredients is harder to shop than a catalogue of finished products. People arrive knowing the result they want, not the ingredient list that gets them there.',
      },
      {
        heading: 'What I did',
        body: 'Restructured the storefront and buying experience around what customers are actually trying to make, so the catalogue could keep growing without the navigation collapsing under it.',
      },
      {
        heading: 'Outcome',
        body: 'The store handles 100K+ orders a year at €350K+ monthly revenue.',
      },
    ],
  },
  {
    slug: 'octilearn',
    name: 'OctiLearn',
    logo: '/logos/octilearn.webp',
    tag: 'EdTech',
    year: '2025',
    title: 'An e-learning platform students sign up to in two steps',
    summary:
      'Sign-up flow, flashcards, AI integration and simulations for IGCSE and O/A-Level students.',
    result: '3,000+ pre-launch sign-ups · sign-up cut from 8 steps to 2',
    cover: null,
    sections: [
      {
        heading: 'What I did',
        body: 'Designed the platform end to end — sign-up, flashcards, AI integration and simulations — and rebuilt the registration flow from eight steps down to two.',
      },
      {
        heading: 'Outcome',
        body: '3,000+ students signed up before launch.',
      },
    ],
  },
  {
    slug: 'takhleeq',
    name: 'Takhleeq',
    logo: '/logos/takhleeq.webp',
    tag: 'EdTech E-commerce',
    year: '2024',
    title: 'Elements Learning, from research to shipped storefront',
    summary:
      'Led UI/UX for an EdTech e-commerce platform, grounded in 50+ research sessions across institutions.',
    result: '1,000+ sales in 6 months · 40% shorter iteration cycles',
    cover: null,
    sections: [
      {
        heading: 'What I did',
        body: 'Ran 50+ research sessions across institutions and turned them into a storefront and buying flow, with development-ready outputs that cut design iteration cycles by 40%.',
      },
    ],
  },
  {
    slug: 'face44',
    name: 'Face44',
    logo: '/logos/face44.webp',
    tag: 'AI SaaS',
    year: '2026',
    title: 'Crop.photo — marketing site and platform',
    summary:
      'Designed and improved the marketing website and SaaS platform, translating business requirements into UI focused on usability, layout and clarity.',
    cover: null,
    sections: [],
  },
  {
    slug: 'clyro',
    name: 'Clyro',
    logo: '/logos/clyro.webp',
    tag: 'Design Studio',
    year: '2025',
    title: '50+ SaaS products across AI, fintech and e-commerce',
    summary:
      'Led UX/UI across a large portfolio — including a 10,000-employee intranet and an AI tool reading CAD drawings at up to 93% accuracy.',
    cover: null,
    sections: [],
  },
  {
    slug: 'chipxprt',
    name: 'ChipXprt',
    logo: '/logos/chipxprt.webp',
    tag: 'Product Design',
    year: '2025',
    title: 'ChipXprt',
    summary: 'Case study in progress.',
    cover: null,
    sections: [],
  },
]

export const CASE_STUDIES: CaseStudy[] = RAW_CASE_STUDIES.map((c) => ({
  ...c,
  logo: asset(c.logo),
  cover: c.cover ? asset(c.cover) : null,
}))

export const caseStudyBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)

/** The hero hover-card grid — first six. The rest live behind "+3 more". */
export const WORK = CASE_STUDIES.slice(0, 6).map((c) => ({
  name: c.name,
  logo: c.logo,
  href: `/work/${c.slug}`,
  comingSoon: c.sections.length === 0,
}))

/** Cases shown in the auto-advancing carousel. */
export const FEATURED_CASES = CASE_STUDIES.filter((c) => c.sections.length > 0).slice(0, 5)

export const KPIS = [
  { value: '100K+ users', label: 'across the products I’ve designed.' },
  { value: '50+ platforms', label: 'across AI, fintech, healthcare and e-commerce.' },
  { value: '$500K+ MARR', label: 'generated by my design work.' },
  { value: '3,000+ sign-ups', label: 'pre-launch, on my first shipped product.' },
]

export const PROBLEMS = [
  'Visitors land on your site and leave without signing up.',
  'You have to explain your product before people take it seriously.',
  'Users get confused during onboarding and drop off.',
]

export const SOLUTIONS = [
  'Your site converts because the flow is clear and the design earns trust on sight.',
  'Your product looks like it’s backed by a serious team, because it is.',
  'Users get it on their own, no walkthrough needed.',
]

export const PROCESS = {
  title: 'From first call to first delivery in 48 hours',
  body:
    'Every engagement is led by me directly. You’re not handed to a project manager or a junior — the person you talk to is the person doing the work.',
  steps: [
    {
      title: '1. Book a call',
      body: 'We talk through your product, your goals, and what you need most right now. A real conversation, not a sales script.',
    },
    {
      title: '2. We set up a shared channel',
      body: 'Slack, or wherever you already work. Share briefs however you like — a Loom, a doc, a rough sketch on a napkin.',
    },
    {
      title: '3. Design starts immediately',
      body: 'You see progress every other business day, backed by someone thinking about the bigger picture, not just the ticket.',
    },
    {
      title: '4. Adjust as you go',
      body: 'No salaries, no benefits, no overhead. Senior design at a fraction of the cost. Pause or cancel anytime.',
    },
  ],
}

/* Graphic design and brand identity are deliberately absent — not offered. */
export const SERVICES = [
  {
    title: 'Product Design',
    points: ['Web Apps', 'Mobile Apps', 'Design Systems', 'Information Architecture', 'High-fidelity UI'],
  },
  {
    title: 'Web Design',
    points: ['Landing Pages', 'Multi-page Websites', 'Framer Development', 'Responsive Systems'],
  },
  {
    title: 'Design Audit',
    points: [
      'Heuristic & Usability Review',
      'Design System Consistency',
      'WCAG 2.1 Accessibility Pass',
      'Prioritised Recommendations',
    ],
  },
]

export const PRICING = {
  retainer: {
    title: 'Monthly Retainer',
    badge: 'Limited Time Discount',
    body: 'An ongoing design partner for your product. Pause or cancel anytime.',
    // NEEDS REVIEW — $2,500 is confirmed; the struck-through "was" price is not.
    priceWas: '$3,500/month',
    priceNow: '$2,500/month',
    points: [
      'Senior-led design from strategy to final screens',
      'New designs or iterations every other business day',
      'All services included in one package',
      'Private Slack channel for briefs, feedback and delivery',
      'Weekly calls to align on priorities and direction',
      'Cancel anytime. Pause for up to 60 days.',
    ],
    footnote: {
      title: 'In a typical month, you could get',
      body: 'A landing page designed and built, a core set of product screens, and a working design system to hold it together.',
    },
  },
  custom: {
    title: 'Custom Project',
    body: 'For scoped work with a clear brief, timeline and deliverables. Same quality, fixed price.',
    points: [
      'Defined scope, deliverables and timeline upfront',
      'Senior-led design from kickoff to delivery',
      'Best fit when you need a specific outcome, not ongoing support',
    ],
  },
}

/* NEEDS REVIEW — drafted answers, check they match how you actually work. */
export const FAQ = [
  {
    q: 'How much can we get done in a month?',
    a: 'More than you’d expect from a queue-based agency. A typical month covers something like a full landing page, a core product flow, and the system pieces that keep both consistent. Scope flexes — we agree priorities weekly.',
  },
  {
    q: 'Can I use it for just one month?',
    a: 'Yes. There’s no contract and no minimum term. Plenty of teams start with a single month to clear a specific backlog, then come back when the next push starts.',
  },
  {
    q: 'What if I’m not happy with the work?',
    a: 'You’ll see progress every other business day, so there’s no scenario where you wait weeks to find out something is off. If a direction isn’t working we change it early, and you can cancel at the end of any month.',
  },
  {
    q: 'How fast can you start?',
    a: 'Usually within a few days of the first call, depending on current capacity. If I can’t start when you need me, I’ll tell you that on the call rather than after you’ve paid.',
  },
  {
    q: 'Do you offer branding or graphic design?',
    a: 'No. I focus on product design, web design and design audits. If you need brand identity work I’m happy to point you toward someone who does it well.',
  },
]

/* Intentionally empty. Real quotes from real clients only — the section
   renders its own empty state until there's something true to put in it. */
export type Testimonial = { quote: string; name: string; role: string; avatar?: string }
export const TESTIMONIALS: Testimonial[] = []

export const ABOUT = {
  title: 'Hey, I’m Faisal.',
  paragraphs: [
    'I’m a senior product designer working on SaaS platforms across AI, fintech, healthcare and e-commerce. Over 50 of them so far — everything from a 10,000-employee intranet to an AI tool reading CAD drawings at 93% accuracy.',
    'Most of that work has one thing in common: the product was complicated and the interface didn’t have to be. I like the problems where the real work is structure — information architecture, progressive disclosure, deciding what a user should never have to see.',
    'I work directly with the people building the product. You’re not handing tasks to a queue; you’re working with the person who does the design, and I care about whether the thing actually ships.',
    'If that sounds like the kind of partnership you’re after, let’s talk. I’d like to hear what you’re building.',
  ],
  name: 'Faisal Amin',
  role: 'Senior Product Designer',
}

/* NEEDS REVIEW — budget and timeline bands are sensible defaults, not yours. */
export const QUOTE_FORM = {
  budgets: ['Under $2,500', '$2,500 – $5,000', '$5,000 – $10,000', '$10,000+', 'Not sure yet'],
  timelines: ['As soon as possible', '2 – 4 weeks', '1 – 2 months', '3+ months', 'Flexible'],
  services: SERVICES.map((s) => ({ title: s.title, options: s.points })),
}

export const FOOTER_LINKS = [
  {
    heading: 'Work',
    links: CASE_STUDIES.slice(0, 3).map((c) => ({ label: c.name, href: `/work/${c.slug}` })),
    more: { label: `+${Math.max(CASE_STUDIES.length - 3, 0)} more`, href: '/work' },
  },
  {
    heading: 'Go to',
    links: [
      { label: 'Services', href: '/#services' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'About', href: '/#about' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'LinkedIn', href: SITE.linkedin },
      { label: 'GitHub', href: SITE.github },
      { label: 'Email Me', href: `mailto:${SITE.email}` },
    ],
  },
]
