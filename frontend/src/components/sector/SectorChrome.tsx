/* Éléments communs des pages secteur : en-tête de navigation, titre animé, pied de page. */
import { Link } from 'react-router-dom'
import { site } from '../../seo'

/* Titre : les mots montent un à un, comme de la chaleur. */
export function Hook({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <h1 className="sp-hook">
      {words.map((w, i) => (
        <span key={i}><span className="w" style={{ '--w': i } as React.CSSProperties}>{w}</span>{i < words.length - 1 ? ' ' : ''}</span>
      ))}
    </h1>
  )
}

export function SectorNav({ slug }: { slug: string }) {
  return (
    <header className="sp-nav">
      <Link className="sp-brand" to="/">Kenny Pignolet</Link>
      <nav className="sp-links" aria-label="Navigation principale">
        <Link className="sp-extra" to="/services">Services</Link>
        <Link className="sp-extra" to="/realisations">Réalisations</Link>
        <Link className="sp-back" to="/#secteurs" state={{ from: slug }}>Changer de secteur</Link>
      </nav>
    </header>
  )
}

export function SectorFooter() {
  return (
    <footer className="sp-foot">
      <span>Kenny Pignolet, développeur web freelance</span>
      <nav className="sp-foot-links" aria-label="Liens du pied de page">
        <Link to="/">Accueil</Link>
        <Link to="/services">Services</Link>
        <Link to="/realisations">Réalisations</Link>
        <Link to="/diagnostic">Diagnostic</Link>
        <Link to="/contact">Contact</Link>
        {site.sameAs.map(url => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer">
            {url.includes('linkedin') ? 'LinkedIn' : 'GitHub'}
          </a>
        ))}
      </nav>
    </footer>
  )
}
