import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import RichText from '../components/RichText'
import RealisationCard from '../components/RealisationCard'
import CtaBand from '../components/CtaBand'
import realisations, { getRealisation } from '../data/realisations'
import { getService } from '../data/services'
import { realisationSchema } from '../seo'

export default function RealisationPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getRealisation(slug) : undefined
  if (!item) return <Navigate to="/realisations" replace />

  const services = item.services.map(getService).filter(s => s !== undefined)
  const others = realisations.filter(r => r.slug !== item.slug).slice(0, 3)

  return (
    <div className="content-page">
      <Seo
        title={item.title}
        description={item.description}
        path={`/realisations/${item.slug}`}
        image={`realisations/${item.slug}`}
        jsonLd={realisationSchema(item)}
      />
      <div className="container">
        <Breadcrumbs items={[['Accueil', '/'], ['Réalisations', '/realisations'], [item.name, `/realisations/${item.slug}`]]} />

        <header className="content-header">
          <div className="content-header__meta">
            <span className={`kind-badge kind-badge--${item.kind === 'Démo' ? 'demo' : 'real'}`}>
              {item.kind}{item.kindNote ? ` · ${item.kindNote}` : ''}
            </span>
            <span className="label">{item.sector}</span>
          </div>
          <h1 className="content-header__title">{item.h1}</h1>
          <p className="content-header__lead">{item.lead}</p>
          <div className="content-card__tags">
            {item.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
          {(item.url || item.repo) && (
            <div className="content-header__actions">
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {item.urlLabel ?? 'Voir le site'} <span aria-hidden="true">↗</span>
                </a>
              )}
              {item.repo && (
                <a href={item.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Code source sur GitHub ↗
                </a>
              )}
            </div>
          )}
        </header>

        <div className="content-block content-sections">
          <section>
            <h2>Contexte</h2>
            <div className="content-prose"><RichText blocks={item.context} /></div>
          </section>
          <section>
            <h2>Enjeux</h2>
            <div className="content-prose"><RichText blocks={item.challenges.map(c => `- ${c}`)} /></div>
          </section>
        </div>

        <section className="content-block" aria-labelledby="realise">
          <h2 id="realise" className="content-block__title">Ce qui a été réalisé</h2>
          <div className="feature-grid">
            {item.features.map(f => (
              <div key={f.title} className="feature">
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="content-block content-sections">
          <section>
            <h2>Résultat</h2>
            <div className="content-prose"><RichText blocks={item.outcome} /></div>
          </section>
        </div>

        {services.length > 0 && (
          <section className="content-block" aria-labelledby="services-lies">
            <h2 id="services-lies" className="content-block__title">Services mobilisés</h2>
            <div className="link-list">
              {services.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="btn-ghost">{s.name}</Link>
              ))}
            </div>
          </section>
        )}

        <section className="content-block" aria-labelledby="autres">
          <h2 id="autres" className="content-block__title">Autres réalisations</h2>
          <div className="card-grid">
            {others.map(r => <RealisationCard key={r.slug} item={r} />)}
          </div>
        </section>

        <CtaBand title="Un projet similaire ?" />
      </div>
    </div>
  )
}
