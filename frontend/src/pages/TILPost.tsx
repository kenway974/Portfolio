import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import entries from '../data/til.json'
import './TILPost.css'

const DOMAIN_COLORS: Record<string, string> = {
  'Front': 'domain--front',
  'Back': 'domain--back',
  'Infrastructure': 'domain--infra',
  'Base de données': 'domain--db',
  'DevOps': 'domain--devops',
  'Outils': 'domain--tools',
}

function renderPratique(text: string): React.ReactNode[] {
  return text.split('\n').map((line, i) => {
    if (line.trim() === '') return <br key={i} />
    if (/^(CREATE|SELECT|INSERT|UPDATE|DELETE|EXPLAIN|nslookup|dig|npm|yarn|git|\d+\.)/.test(line.trim())) {
      return <code key={i} className="til-code-line">{line}</code>
    }
    if (line.startsWith('#')) {
      return <span key={i} className="til-code-comment">{line}</span>
    }
    return <p key={i} className="til-pratique-text">{line}</p>
  })
}

export default function TILPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  const entry = entries.find(e => e.slug === slug)
  if (!entry) return <Navigate to="/til" replace />

  return (
    <div className="til-post-page">
      <div className="container">
        <Link to="/til" className="post-back">{t('til.back')}</Link>

        <header className="til-post-header">
          <div className="post-meta">
            <span className={`til-domain-badge ${DOMAIN_COLORS[entry.domaine] ?? ''}`}>
              {entry.domaine}
            </span>
            <span className="post-date">
              {new Date(entry.date).toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          </div>
          <h1 className="post-title">{entry.title}</h1>
        </header>

        <div className="post-divider" aria-hidden="true" />

        <div className="til-sections">
          <div className="til-section til-section--explication">
            <div className="til-section__label">
              <span className="til-section__icon">📖</span>
              {t('til.fields.explication')}
            </div>
            <p className="til-section__content">{entry.explication}</p>
          </div>

          <div className="til-section til-section--metaphore">
            <div className="til-section__label">
              <span className="til-section__icon">💡</span>
              {t('til.fields.metaphore')}
            </div>
            <blockquote className="til-metaphore-quote">{entry.metaphore}</blockquote>
          </div>

          <div className="til-section til-section--exemple">
            <div className="til-section__label">
              <span className="til-section__icon">🌐</span>
              {t('til.fields.exemple')}
            </div>
            <p className="til-section__content">{entry.exemple}</p>
          </div>

          <div className="til-section til-section--pratique">
            <div className="til-section__label">
              <span className="til-section__icon">⚙️</span>
              {t('til.fields.pratique')}
            </div>
            <div className="til-pratique-block">
              {renderPratique(entry.pratique)}
            </div>
          </div>
        </div>

        <div className="til-synthese-block">
          <span className="til-synthese-label">{t('til.fields.synthese')}</span>
          <p className="til-synthese-text">{entry.synthese}</p>
        </div>

        <div className="post-cta">
          <Link to="/til" className="btn-ghost">{t('til.back')}</Link>
        </div>
      </div>
    </div>
  )
}
