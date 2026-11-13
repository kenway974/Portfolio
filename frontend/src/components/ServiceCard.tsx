import { Link } from 'react-router-dom'
import type { Service } from '../data/services'

export default function ServiceCard({ service, className = '' }: { service: Service; className?: string }) {
  return (
    <Link to={`/services/${service.slug}`} className={`content-card ${className}`}>
      <span className="content-card__kicker">{service.category}</span>
      <h3 className="content-card__title">{service.name}</h3>
      <p className="content-card__text">{service.summary}</p>
      {service.price && <p className="content-card__price">Dès <strong>{service.price.from}</strong></p>}
      <span className="content-card__more">En savoir plus →</span>
    </Link>
  )
}
