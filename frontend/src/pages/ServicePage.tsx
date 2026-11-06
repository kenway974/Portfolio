import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import RichText from '../components/RichText'
import RealisationCard from '../components/RealisationCard'
import CtaBand from '../components/CtaBand'
import { getService } from '../data/services'
import { getRealisation } from '../data/realisations'
import { serviceSchema } from '../seo'

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getService(slug) : undefined
  if (!service) return <Navigate to="/services" replace />

  const projects = service.projects.map(getRealisation).filter(r => r !== undefined)
  const related = service.related.map(getService).filter(s => s !== undefined)

  return (
    <div className="content-page">
      <Seo
        title={service.title}
        description={service.description}
        path={`/services/${service.slug}`}
        image={`services/${service.slug}`}
        jsonLd={serviceSchema(service)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Services', '/services'], [service.name, `/services/${service.slug}`]]} />

        <header className="content-header">
          <p className="label">{service.category}</p>
          <h1 className="content-header__title">{service.h1}</h1>
          <p className="content-header__lead">{service.lead}</p>
          <div className="content-header__actions">
            <Link to="/#contact" className="btn-primary">Demander un devis gratuit <span aria-hidden="true">→</span></Link>
            {projects.length > 0 && <a href="#realisations" className="btn-ghost">Voir des exemples</a>}
          </div>
        </header>

        <section className="content-block" aria-labelledby="inclus">
          <h2 id="inclus" className="content-block__title">Ce que je vous propose</h2>
          <div className="feature-grid">
            {service.includes.map(item => (
              <div key={item.title} className="feature">
                <h3 className="feature__title">{item.title}</h3>
                <p className="feature__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="content-block content-sections">
          {service.sections.map(section => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <div className="content-prose">
                <RichText blocks={section.body} />
              </div>
            </section>
          ))}
        </div>

        {projects.length > 0 && (
          <section id="realisations" className="content-block" aria-labelledby="exemples">
            <h2 id="exemples" className="content-block__title">Exemples de réalisations</h2>
            <div className="card-grid">
              {projects.map(p => <RealisationCard key={p.slug} item={p} />)}
            </div>
          </section>
        )}

        {service.faq.length > 0 && (
          <section className="content-block" aria-labelledby="faq">
            <h2 id="faq" className="content-block__title">Questions fréquentes</h2>
            <div className="faq">
              {service.faq.map(f => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="content-block" aria-labelledby="lies">
            <h2 id="lies" className="content-block__title">Services complémentaires</h2>
            <div className="link-list">
              {related.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="btn-ghost">{s.name}</Link>
              ))}
              <Link to="/services" className="btn-ghost">Tous les services</Link>
            </div>
          </section>
        )}

        <CtaBand />
      </div>
    </div>
  )
}
