import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import ServiceCard from '../components/ServiceCard'
import CtaBand from '../components/CtaBand'
import services, { SERVICE_CATEGORIES } from '../data/services'
import { servicesListSchema } from '../seo'

const DESCRIPTION = 'Sites vitrines, e-commerce, applications web et mobiles, API, automatisation et IA, SEO, sécurité et maintenance : tous les services d\'un développeur web freelance.'

export default function ServicesList() {
  return (
    <div className="content-page">
      <Seo
        title="Services de développement web freelance | Kenny Pignolet"
        description={DESCRIPTION}
        path="/services"
        imageAlt="Services — Kenny Pignolet, développeur web freelance"
        jsonLd={servicesListSchema(services, DESCRIPTION)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Services', '/services']]} />

        <header className="content-header">
          <p className="label">Services</p>
          <h1 className="content-header__title">Services de développement web</h1>
          <p className="content-header__lead">
            De la création de votre site à l'automatisation de vos tâches, je conçois, développe et maintiens
            les outils numériques des TPE et PME, partout en France. Un seul interlocuteur, du cadrage à la mise
            en ligne, puis dans la durée.
          </p>
        </header>

        {SERVICE_CATEGORIES.map(category => (
          <section key={category} className="category-block" aria-labelledby={`cat-${category}`}>
            <h2 id={`cat-${category}`} className="category-block__title">{category}</h2>
            <div className="card-grid">
              {services.filter(s => s.category === category).map(s => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </section>
        ))}

        <CtaBand
          title="Vous ne savez pas par où commencer ?"
          text="Expliquez-moi votre situation et vos objectifs : je vous oriente vers la solution la plus simple qui répond vraiment à votre besoin."
        />
      </div>
    </div>
  )
}
