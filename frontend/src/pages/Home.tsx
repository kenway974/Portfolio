import Seo from '../components/Seo'
import { homeSchema } from '../seo'
import Hero from '../components/Hero'
import SectorWheel from '../components/SectorWheel'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Process from '../components/Process'
import About from '../components/About'
import BlogPreview from '../components/BlogPreview'
import Contact from '../components/Contact'

const TITLE = 'Développeur web freelance : sites & applications | Kenny Pignolet'
const DESCRIPTION = 'Développeur web freelance : sites vitrines, e-commerce, landing pages, API et automatisations sur mesure pour TPE et PME, partout en France. Réponse sous 48h.'

export default function Home() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/"
        imageAlt="Kenny Pignolet — Développeur web freelance"
        jsonLd={homeSchema(DESCRIPTION)}
      />
      <Hero />
      <SectorWheel />
      <Services />
      <Projects />
      <Process />
      <About />
      <BlogPreview />
      <Contact />
    </>
  )
}
