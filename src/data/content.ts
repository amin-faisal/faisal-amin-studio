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
  photo: asset('/faisal-photo.png'),
}

/** Cal.com element-click embed. */
export const CAL = {
  namespace: '30min',
  link: 'faisal-amin/30min',
}

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

export const HERO = {
  headline: 'Product design, websites, and design systems for startups. One monthly fee. No contracts.',
  body: "You get a design partner who thinks about your product, not just your pixels. I work alongside your team — research, flows, interface, and the system that holds it together.",
}

/* Logos are single-colour SVGs rendered as CSS masks (see LogoMark), so each
   one carries its own viewBox size — they share a 55-unit height but range
   from 127 to 223 wide, and a fixed width would distort most of them. */
export type Logo = { src: string; brand: string; w: number; h: number }

const logo = (file: string, w: number, h = 55): Logo => ({
  src: asset(`/logos/${file}`),
  // Full-colour export, used for the hover state. Naming is by convention:
  // modalys.svg -> modalys-brand.svg.
  brand: asset(`/logos/${file.replace('.svg', '-brand.svg')}`),
  w,
  h,
})

export const LOGOS = {
  modalys: logo('modalys.svg', 165),
  naturalHeroes: logo('natural-heroes.svg', 202),
  clyro: logo('clyro.svg', 127),
  truid: logo('truid.svg', 142),
  octilearn: logo('octilearn.svg', 214),
  chipxprt: logo('chipxprt.svg', 217),
  takhleeq: logo('takhleeq.svg', 223),
  face44: logo('face44.svg', 136),
  sync: logo('sync.svg', 101),
} as const

export type Brand = { name: string; logo: Logo }

/** Clients only. Education logos (NUST, Uxcel, Coursera) deliberately excluded. */
export const BRANDS: Brand[] = [
  { name: 'Modalys', logo: LOGOS.modalys },
  { name: 'Natural Heroes', logo: LOGOS.naturalHeroes },
  { name: 'Clyro', logo: LOGOS.clyro },
  { name: 'truID', logo: LOGOS.truid },
  { name: 'OctiLearn', logo: LOGOS.octilearn },
  { name: 'ChipXprt', logo: LOGOS.chipxprt },
  { name: 'Takhleeq', logo: LOGOS.takhleeq },
  { name: 'Face44', logo: LOGOS.face44 },
]

export type CaseStudy = {
  slug: string
  name: string
  logo: Logo | null
  /** Shown on cards in place of the year. */
  service: string
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
  /** Optional extras for the eight-section template. Anything omitted renders
      its placeholder state rather than collapsing the section. */
  detail?: {
    meta?: { label: string; value: string }[]
    problemTitle?: string
    problemBullets?: { lead?: string; text: string }[]
    solutionBullets?: { lead?: string; text: string }[]
    research?: string[]
    researchBullets?: { lead?: string; text: string }[]
    uxDesign?: string[]
    uxBullets?: { lead?: string; text: string }[]
    resultBullets?: { lead?: string; text: string }[]
    /** Real client quotes only. */
    feedback?: { quote: string; name: string; role: string }
  }
}

/* Content ported from the portfolio repo. Only claims that already existed
   there are repeated here — nothing about outcomes is invented. */
const RAW_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'doodh-wala',
    name: 'Doodh Wala',
    logo: null,
    service: 'Personal Project · Product · Website',
    tag: 'Personal Project',
    year: '2026',
    title: 'Bringing the neighbourhood milkman online',
    summary:
      'A personal project. The daily milk round is one of the most dependable services in Pakistan and one of the least digitised — Doodh Wala is what it looks like when that round gets a real product around it.',
    cover: null,
    detail: {
      meta: [
        { label: 'Industry', value: 'Consumer / Delivery' },
        { label: 'Type', value: 'Personal project' },
        { label: 'Engagement', value: 'Product and website design' },
      ],
    },
    sections: [],
  },
  {
    slug: 'modalys',
    name: 'Modalys',
    logo: LOGOS.modalys,
    service: 'Product Design',
    tag: 'Occupational Healthcare',
    year: '2026',
    title: 'Rebuilding a UK occupational health platform end to end',
    summary:
      'Four clinical modules, two very different audiences, one design system. I led information architecture and user flows across the whole platform, simplifying processes like organisation structures and employee onboarding.',
    result: '500+ organisations · 60K+ people covered',
    cover: null,
    detail: {
      meta: [
        { label: 'Industry', value: 'Occupational Healthcare' },
        { label: 'Headquarters', value: 'United Kingdom' },
        { label: 'Engagement', value: 'End-to-end product design' },
      ],
      problemTitle: 'Where complexity leaked into the interface',
      problemBullets: [
        {
          lead: 'Organisation hierarchies',
          text: 'were modelled in the UI exactly as they exist in the database, so setting one up meant understanding the data model first.',
        },
        {
          lead: 'Referral chains spanned modules',
          text: 'with no single view of where a case actually was.',
        },
        {
          lead: 'Two audiences, one interface',
          text: 'clinicians and employers need very different things, and both were served the same dense screens.',
        },
        {
          lead: 'Employee onboarding stalled',
          text: 'because every field was presented at once, whether or not it applied.',
        },
      ],
      solutionBullets: [
        {
          lead: 'Progressive disclosure',
          text: 'surfaces the one decision that matters now and keeps the rest reachable but out of the way.',
        },
        {
          lead: 'A shared design system',
          text: 'across all four modules, so a pattern learned in one is a pattern known everywhere.',
        },
        {
          lead: 'Role-aware flows',
          text: 'so clinicians and employers each get the view their job actually needs.',
        },
      ],
    },
    sections: [
      {
        heading: 'Overview',
        body: 'Modalys is a UK occupational health platform used by employers and clinicians. I led design end to end across four clinical modules — information architecture, user flows, high-fidelity UI, and the design system holding them together.',
      },
      {
        heading: 'Problem',
        body: 'Occupational health runs on processes that are genuinely complicated — organisation hierarchies, referral chains, clinical records. The existing product exposed all of that complexity directly to the user, and both clinicians and employers were slower for it.',
      },
      {
        heading: 'Solution',
        body: 'Built the information architecture and user flows across four core modules, then the high-fidelity UI and the design system underneath. Progressive disclosure did most of the heavy lifting: show the one decision that matters now, keep the rest reachable but out of the way.',
      },
      {
        heading: 'Impact',
        body: 'The platform now serves 500+ organisations covering 60K+ people, on a single design system shared across every module.',
      },
    ],
  },
  {
    slug: 'natural-heroes',
    name: 'Natural Heroes',
    logo: LOGOS.naturalHeroes,
    service: 'Website Design',
    tag: 'E-commerce',
    year: '2025',
    title: 'Selling ingredients, not just products',
    summary:
      'A Dutch DIY skincare brand selling raw natural ingredients — storefront and buying experience for a catalogue that keeps growing.',
    result: '100K+ orders a year · EUR 350K+ monthly revenue',
    cover: null,
    detail: {
      meta: [
        { label: 'Industry', value: 'E-commerce' },
        { label: 'Headquarters', value: 'Netherlands' },
        { label: 'Engagement', value: 'Storefront & buying experience' },
      ],
      problemTitle: 'A catalogue that outgrew its own navigation',
    },
    sections: [
      {
        heading: 'Overview',
        body: 'Natural Heroes is a Dutch DIY skincare brand selling raw natural ingredients. I worked on the storefront and the buying experience for a catalogue that keeps growing.',
      },
      {
        heading: 'Problem',
        body: 'A catalogue of raw ingredients is harder to shop than a catalogue of finished products. People arrive knowing the result they want, not the ingredient list that gets them there.',
      },
      {
        heading: 'Solution',
        body: 'Restructured the storefront and buying experience around what customers are actually trying to make, so the catalogue could keep growing without the navigation collapsing under it.',
      },
      {
        heading: 'Impact',
        body: 'The store handles 100K+ orders a year at EUR 350K+ monthly revenue.',
      },
    ],
  },
  {
    slug: 'sync',
    name: 'Sync',
    logo: LOGOS.sync,
    service: 'Website Design',
    tag: 'Website',
    year: '2026',
    title: 'Sync',
    summary: 'Website design. The write-up for this one is still in progress.',
    cover: null,
    sections: [],
  },
  {
    slug: 'truid',
    name: 'truID',
    logo: LOGOS.truid,
    service: 'Product + Website Design',
    tag: 'Biometric Identity',
    year: '2025',
    title: 'Identity verification banks and telcos actually finish',
    summary:
      'Touchless fingerprint, face liveness and document checks in a single flow — designed so a first-time user gets through it without help, on whatever phone they own.',
    result: '2.6M+ verifications at one bank · under 30s per check',
    cover: null,
    sections: [
      {
        heading: 'Overview',
        body: 'truID verifies identity for banks and telcos, combining touchless fingerprint, face liveness and document checks. I designed the verification flow end to end.',
      },
      {
        heading: 'Problem',
        body: 'Identity verification fails at the moments where users are least patient. Every extra instruction, retry or unexplained rejection is someone abandoning an account opening.',
      },
      {
        heading: 'Solution',
        body: 'Designed one continuous flow across three very different capture types, with the states that actually matter — retry, poor lighting, document mismatch — treated as first-class screens rather than error toasts.',
      },
      {
        heading: 'Impact',
        body: '2.6M+ verifications at a single bank, with checks completing in under 30 seconds.',
      },
    ],
  },
  {
    slug: 'octilearn',
    name: 'OctiLearn',
    logo: LOGOS.octilearn,
    service: 'Product Design',
    tag: 'EdTech',
    year: '2025',
    title: 'An e-learning platform students sign up to in two steps',
    summary:
      'Sign-up flow, flashcards, AI integration and simulations for IGCSE and O/A-Level students.',
    result: '3,000+ pre-launch sign-ups · sign-up cut from 8 steps to 2',
    cover: null,
    sections: [
      {
        heading: 'Overview',
        body: 'OctiLearn is an e-learning platform for IGCSE and O/A-Level students, covering flashcards, AI-assisted study and simulations.',
      },
      {
        heading: 'Solution',
        body: 'Designed the platform end to end — sign-up, flashcards, AI integration and simulations — and rebuilt the registration flow from eight steps down to two.',
      },
      {
        heading: 'Impact',
        body: '3,000+ students signed up before launch.',
      },
    ],
  },
]

export const CASE_STUDIES: CaseStudy[] = RAW_CASE_STUDIES.map((c) => ({
  ...c,
  cover: c.cover ? asset(c.cover) : null,
}))

export const caseStudyBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)

/* ───────────────────────────────────────────────────────────
   Case study template

   Every case study renders the same eight sections in the same order, so the
   sticky TOC means the same thing on every page. Written content is pulled
   from each study's `sections` where it exists; the rest fall back to shared
   or placeholder copy, clearly marked.

   `visuals` is how many image slots the section gets. Four renders the
   one-big / two-up / one-big arrangement; one renders a single wide frame.
   ─────────────────────────────────────────────────────────── */

export type CaseBlock = {
  heading: string
  title?: string
  body?: string[]
  bullets?: { lead?: string; text: string }[]
  meta?: { label: string; value: string }[]
  steps?: { num: string; title: string; body: string; points: string[] }[]
  visuals?: number
  /** Renders the "nothing here yet" state instead of empty space. */
  pending?: boolean
}

/** NEEDS REVIEW — this is your standard process, not a per-client one. */
const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Research & Discovery',
    body: 'Understanding the users, the workflows and the business goals before a single screen exists.',
    points: ['User research', 'Stakeholder interviews', 'Competitive analysis', 'Feature prioritisation'],
  },
  {
    num: '02',
    title: 'Information Architecture',
    body: 'Mapping the journey, finding the friction, and giving the product a structure worth building on.',
    points: ['Journey mapping', 'User flows', 'Wireframing', 'Prototype testing'],
  },
  {
    num: '03',
    title: 'Visual & Interaction Design',
    body: 'High-fidelity UI and the design system underneath it, built to survive the product growing.',
    points: ['UI design', 'Visual direction', 'Interaction states', 'Usability testing'],
  },
  {
    num: '04',
    title: 'Dev Support & Delivery',
    body: 'Staying involved through build, so what ships is what was designed.',
    points: ['Design handoff', 'Feedback loops', 'Launch support', 'Post-launch optimisation'],
  },
]

const PLACEHOLDER = (what: string) => [
  `${what} for this project hasn’t been written up yet. Replace this in CASE_STUDIES → detail in src/data/content.ts.`,
]

/** Assembles the eight-section template for one case study. */
export function caseBlocks(study: CaseStudy): CaseBlock[] {
  const find = (h: string) => study.sections.find((s) => s.heading === h)
  const overview = find('Overview')
  const problem = find('Problem')
  const solution = find('Solution')
  const impact = find('Impact')
  const d = study.detail ?? {}

  return [
    {
      heading: 'Overview',
      body: overview ? [overview.body] : PLACEHOLDER('An overview'),
      meta: d.meta,
      visuals: 4,
      pending: !overview,
    },
    {
      heading: 'Problem',
      title: d.problemTitle,
      body: problem ? [problem.body] : PLACEHOLDER('The problem'),
      bullets: d.problemBullets,
      visuals: 4,
      pending: !problem,
    },
    {
      heading: 'Solution',
      body: solution ? [solution.body] : PLACEHOLDER('The solution'),
      bullets: d.solutionBullets,
      visuals: 4,
      pending: !solution,
    },
    {
      heading: 'Design Process',
      title: `A user-centred design process for ${study.name}`,
      body: [
        `The process below is how every engagement runs, ${study.name} included: understand the problem properly, give it a structure, design it, then stay involved while it ships.`,
      ],
      steps: PROCESS_STEPS,
    },
    {
      heading: 'Research',
      body: d.research ?? PLACEHOLDER('Research'),
      bullets: d.researchBullets,
      visuals: 4,
      pending: !d.research,
    },
    {
      heading: 'UX Design',
      body: d.uxDesign ?? PLACEHOLDER('UX design work'),
      bullets: d.uxBullets,
      visuals: 4,
      pending: !d.uxDesign,
    },
    {
      heading: 'Results and Outcomes',
      body: impact ? [impact.body] : PLACEHOLDER('Results'),
      bullets: d.resultBullets,
      visuals: 1,
      pending: !impact,
    },
    {
      heading: 'Client Feedback',
      body: d.feedback ? [d.feedback.quote] : undefined,
      meta: d.feedback ? [{ label: d.feedback.name, value: d.feedback.role }] : undefined,
      // No invented quotes — the section says so plainly until there's a real one.
      pending: !d.feedback,
    },
  ]
}

/** Anchor id for a case study section heading — shared by the TOC and the
    headings themselves so they can't drift apart. */
export const sectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** The hero hover-card grid — one row of six. */
export const WORK = CASE_STUDIES.map((c) => ({
  name: c.name,
  logo: c.logo,
  href: `/work/${c.slug}`,
  comingSoon: c.sections.length === 0,
}))

/** Cases shown in the auto-advancing carousel — all of them, in order. */
export const FEATURED_CASES = CASE_STUDIES

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
    points: [
      'Web Apps',
      'Mobile Apps',
      'Design Systems',
      'Information Architecture',
      'UX Audits & Accessibility',
    ],
  },
  {
    title: 'Web Design',
    points: [
      'Landing Pages',
      'Multi-page Websites',
      'Framer Development',
      'Responsive Systems',
      'UX Audits & Accessibility',
    ],
  },
]

export const PRICING = {
  plans: [
    {
      id: 'fortnight',
      label: '2 weeks',
      price: '$2,000',
      period: '/2 weeks',
      body: 'A focused two-week sprint. Best when you have one clear thing to ship and a date to hit.',
      cadence: 'New designs or iterations every other business day',
      capacity: {
        title: 'In a typical sprint, you could get',
        body: 'A landing page designed and built, or a core product flow taken from wireframe to final screens.',
      },
    },
    {
      id: 'monthly',
      label: '1 month',
      price: '$3,200',
      period: '/month',
      body: 'An ongoing design partner for your product. Pause or cancel anytime.',
      cadence: 'New designs or iterations every other business day',
      capacity: {
        title: 'In a typical month, you could get',
        body: 'A landing page designed and built, a core set of product screens, and a working design system to hold it together.',
      },
    },
  ],
  retainer: {
    title: 'Design Retainer',
    badge: 'Limited Time Discount',
    points: [
      'Senior-led design from strategy to final screens',
      'All services included in one package',
      'Private Slack channel for briefs, feedback and delivery',
      'Weekly calls to align on priorities and direction',
      'Cancel anytime. Pause for up to 60 days.',
    ],
  },
  custom: {
    title: 'Custom Project',
    body: 'Scoped work with clear brief. Tell me its shape and I’ll come back with scope, timeline and a fixed price.',
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

/* SAMPLE CONTENT — none of these are real people and none of these quotes were
   said by anyone. They exist so the section can be designed against realistic
   copy. `sample: true` renders a visible marker, which stays until these are
   replaced with genuine client quotes: an invented testimonial on a live site
   is the one thing here a visitor would have no way to tell apart from a real
   one. */
export type Testimonial = { quote: string; name: string; role: string; avatar?: string }

export const TESTIMONIALS_ARE_SAMPLES = true

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'He asked better questions than we did. Two calls in, the roadmap had changed — and it was the right change.',
    name: 'Sample Name',
    role: 'Co-founder, Sample Co.',
  },
  {
    quote:
      'The first delivery landed two days after the kickoff call, and it kept arriving at that pace. We stopped planning around design being the bottleneck.',
    name: 'Sample Name',
    role: 'Head of Product, Sample Co.',
  },
  {
    quote:
      'Our onboarding drop-off was the thing nobody could fix. He rebuilt the flow, and the numbers moved in the first week.',
    name: 'Sample Name',
    role: 'CEO, Sample Co.',
  },
]

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


/* Ported from the portfolio repo — same claims, no new ones. */
/* Icon filenames were inferred from each file's brand colour — Figma from its
   palette, Illustrator from #FF9A00, Jitter from #7A40ED. Swap a path here if
   any of them landed on the wrong tool. */
export const TOOLS = [
  { name: 'Figma', icon: asset('/tools/figma.svg') },
  { name: 'FigJam', icon: asset('/tools/figjam.svg') },
  { name: 'Framer', icon: asset('/tools/framer.svg') },
  { name: 'Jitter', icon: asset('/tools/jitter.svg') },
  { name: 'Illustrator', icon: asset('/tools/illustrator.svg') },
  { name: 'LottieFiles', icon: asset('/tools/lottie.svg') },
  { name: 'Miro', icon: asset('/tools/miro.svg') },
  { name: 'ClickUp', icon: asset('/tools/clickup.svg') },
  { name: 'Claude', icon: asset('/tools/claude.svg') },
  { name: 'VS Code', icon: asset('/tools/vscode.svg') },
]

export const EXPERIENCE = [
  {
    period: 'Feb 2026 — Present',
    company: 'Modalys',
    role: 'Senior Product Designer',
    desc: 'Leading end-to-end design of an occupational healthcare SaaS — research and IA through to high-fidelity UI and the design system. Built the information architecture and user flows across four core modules, simplifying processes like organisation structures and employee onboarding.',
    highlights: ['Healthcare SaaS', 'Design system', '4 core modules', 'Progressive disclosure'],
  },
  {
    period: 'Dec 2025 — Jan 2026',
    company: 'Face44',
    role: 'Multidisciplinary Designer',
    desc: 'Designed and improved the marketing website and SaaS platform for Crop.photo, translating business requirements into functional UI focused on usability, layout and clarity.',
    highlights: ['Crop.photo', 'Marketing site', 'SaaS platform'],
  },
  {
    period: 'Apr 2024 — Nov 2025',
    company: 'Clyro',
    role: 'Mid-level UX Designer → Senior UX Designer',
    desc: 'Led UX/UI for 50+ SaaS projects across AI, fintech, healthcare and e-commerce — including a 10,000-employee intranet for Vedanta Group and Alpherra, an AI tool reading CAD drawings at up to 93% accuracy. Improved developer handoff through structured components and interaction patterns.',
    highlights: ['50+ SaaS projects', 'AI · fintech · e-commerce', 'Design systems', 'Developer handoff'],
  },
  {
    period: 'Aug 2024 — Jul 2025',
    company: 'OctiLearn',
    role: 'Product Designer (Contract)',
    desc: 'Designed an e-learning platform for IGCSE and O/A-Level students: sign-up flow, flashcards, AI integration and simulations. 3,000+ users signed up pre-launch and the sign-up flow went from eight steps to two.',
    highlights: ['3,000+ pre-launch sign-ups', 'Sign-up: 8 → 2 steps', 'AI integration'],
  },
  {
    period: 'Jun 2023 — Mar 2024',
    company: 'Takhleeq',
    role: 'UX Designer',
    desc: 'Led UI/UX for Elements Learning, an EdTech e-commerce platform — 1,000+ sales within six months. Ran 50+ research sessions across institutions and cut design iteration cycles by 40% through development-ready outputs.',
    highlights: ['1,000+ sales', '50+ research sessions', '-40% iteration cycles'],
  },
]

export const EDUCATION = [
  {
    period: '2024 — 2025',
    title: 'Product Designer Certification',
    place: 'Uxcel',
    href: 'https://app.uxcel.com/certificates/ZLD5VD507XMQ?utm_source=share-certificate',
  },
  { period: '2020 — 2024', title: 'BE Mechanical Engineering', place: 'NUST, Islamabad' },
  {
    period: '2023',
    title: 'Google UX Design Specialization',
    place: 'Coursera',
    href: 'https://coursera.org/share/f083fe29ecb91f54063eab6e435d41db',
  },
]

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
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contact', href: '/contact' },
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
