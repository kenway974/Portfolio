import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import ServiceCard from '../components/ServiceCard'
import { getService } from '../data/services'

const SUGGESTED = ['creation-site-vitrine', 'application-web-sur-mesure', 'automatisation-ia']

/** Page introuvable : non indexée, avec des chemins pour retrouver son chemin. */
export default function NotFound() {
  const suggested = SUGGESTED.map(getService).filter(s => s !== undefined)
  return (
    <div className="content-page">
      <Seo
        title="Page introuvable | Kenny Pignolet, développeur web freelance"
        description="Cette page n’existe pas ou a été déplacée. Retrouvez les services, les réalisations et le blog de Kenny Pignolet, développeur web freelance."
        path="/404"
        noindex
      />
      <div className="container">
        <header className="content-header">
          <p className="label">Erreur 404</p>
          <h1 className="content-header__title">Cette page est introuvable</h1>
          <p className="content-header__lead">
            Elle a peut-être été déplacée ou supprimée. Voici de quoi retrouver votre chemin.
          </p>
          <div className="content-header__actions">
            <Link to="/" className="btn-primary">Retour à l'accueil</Link>
            <Link to="/diagnostic" className="btn-ghost">Identifier mes besoins</Link>
          </div>
        </header>
        <section className="content-block" aria-labelledby="suggestions">
          <h2 id="suggestions" className="content-block__title">Les services les plus demandés</h2>
          <div className="card-grid">
            {suggested.map(s => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
