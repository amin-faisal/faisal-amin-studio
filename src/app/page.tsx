import Hero from '@/components/sections/Hero'
import WorkGrid from '@/components/sections/WorkGrid'
import Showcase from '@/components/sections/Showcase'
import Kpis from '@/components/sections/Kpis'
import ProblemSolution from '@/components/sections/ProblemSolution'
import CaseCarousel from '@/components/sections/CaseCarousel'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Pricing from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import Faq from '@/components/sections/Faq'
import About from '@/components/sections/About'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkGrid />
      <Showcase />
      <Kpis />
      <ProblemSolution />
      <CaseCarousel />
      <Process />
      <Services />
      <Pricing />
      <Testimonials />
      <Faq />
      <About />
      <Footer />
    </main>
  )
}
