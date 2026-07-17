import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'
import entries from '../data/til.json'
import './TILPreview.css'

const DOMAIN_COLORS: Record<string, string> = {
  'Front': 'domain--front',
  'Back': 'domain--back',
  'Infrastructure': 'domain--infra',
  'Base de données': 'domain--db',
  'DevOps': 'domain--devops',
  'Outils': 'domain--tools',
  'Fondamentaux': 'domain--fondamentaux',
  'Tests': 'domain--tests',
  'Qualité': 'domain--qualite',
  'IA & Automatisation': 'domain--ia',
}

export default function TILPreview() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()

  const preview = entries.slice(0, 3)

  return (
    <section id="til" className="til-preview" ref={ref}>
      <div className="container">
        <div className="til-preview__header">
          <p className="label reveal">{t('til.label')}</p>
          <h2 className="section-heading reveal reveal-delay-1">{t('til.heading')}</h2>
          <Link to="/til" className="btn-ghost reveal reveal-delay-2">{t('til.all')}</Link>
        </div>

        <div className="til-preview__grid">
          {preview.map((entry, i) => (
            <Link
              key={entry.id}
              to={`/til/${entry.slug}`}
              className={`til-card reveal reveal-delay-${i + 2}`}
            >
              <div className="til-card__meta">
                <span className={`til-domain-badge ${DOMAIN_COLORS[entry.domaine] ?? ''}`}>
                  {entry.domaine}
                </span>
                <span className="blog-card__date">
                  {new Date(entry.date).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
              </div>
              <h3 className="til-card__title">{entry.title}</h3>
              <p className="til-card__synthese">{entry.synthese}</p>
              <span className="til-card__read">{t('til.read')}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
