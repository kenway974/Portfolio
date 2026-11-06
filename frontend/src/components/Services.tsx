import { Link } from 'react-router-dom'
import { t } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ServiceCard from './ServiceCard'
import { getService } from '../data/services'
import './Services.css'

// Services mis en avant sur l'accueil ; la liste complète est sur /services.
const FEATURED = [
  'creation-site-vitrine',
  'site-e-commerce',
  'application-web-sur-mesure',
  'automatisation-ia',
  'api-donnees',
  'seo-performance',
]

export default function Services() {
  const ref = useScrollReveal<HTMLElement>()
  const featured = FEATURED.map(getService).filter(s => s !== undefined)

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        <p className="label reveal">{t('services.label')}</p>
        <h2 className="section-heading reveal reveal-delay-1">{t('services.heading')}</h2>
        <div className="card-grid services__grid">
          {featured.map((s, i) => (
            <ServiceCard key={s.slug} service={s} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`} />
          ))}
        </div>
        <div className="services__more reveal">
          <Link to="/services" className="btn-ghost">{t('services.all')}</Link>
        </div>
      </div>
    </section>
  )
}
