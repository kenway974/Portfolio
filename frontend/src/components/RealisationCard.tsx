import { Link } from 'react-router-dom'
import type { Realisation } from '../data/realisations'

export default function RealisationCard({ item, className = '' }: { item: Realisation; className?: string }) {
  return (
    <Link to={`/realisations/${item.slug}`} className={`content-card ${className}`}>
      <div className="content-card__head">
        <span className="content-card__logo" aria-hidden="true">{item.logo}</span>
        <span className={`kind-badge kind-badge--${item.kind === 'Démo' ? 'demo' : 'real'}`}>{item.kind}</span>
      </div>
      <h3 className="content-card__title">{item.name}</h3>
      <p className="content-card__kicker">{item.sector}</p>
      <p className="content-card__text">{item.summary}</p>
      <div className="content-card__tags">
        {item.tech.slice(0, 4).map(t => <span key={t} className="tech-tag">{t}</span>)}
      </div>
      <span className="content-card__more">Voir le projet →</span>
    </Link>
  )
}
