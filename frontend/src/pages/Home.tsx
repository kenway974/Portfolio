import { Head } from 'vite-react-ssg'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Process from '../components/Process'
import About from '../components/About'
import BlogPreview from '../components/BlogPreview'
import TILPreview from '../components/TILPreview'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kenny Pignolet — Développeur web freelance</title>
        <meta name="description" content="Développeur web freelance originaire de La Réunion. J'aide les TPE et PME à construire une présence en ligne qui attire, convainc et convertit — sans la complexité d'une agence." />
        <meta property="og:title" content="Kenny Pignolet — Développeur web freelance" />
        <meta property="og:description" content="Sites vitrines, e-commerce, landing pages et APIs sur mesure. Simple, sans agence." />
        <meta property="og:url" content="https://portfolio-jet-tau-73.vercel.app/" />
        <link rel="canonical" href="https://portfolio-jet-tau-73.vercel.app/" />
      </Head>
      <Hero />
      <Services />
      <Projects />
      <Process />
      <About />
      <TILPreview />
      <BlogPreview />
      <Contact />
    </>
  )
}
