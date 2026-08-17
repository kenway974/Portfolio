import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Head } from 'vite-react-ssg'
import entries from '../data/til.json'
import './TILPost.css'

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

const CODE_STARTS = /^(CREATE|SELECT|INSERT|UPDATE|DELETE|EXPLAIN|ALTER|BEGIN|COMMIT|ROLLBACK|nslookup|dig|npm|yarn|git|pip\d*|python\d*|source|uvicorn|docker|gcc|valgrind|curl|pg_dump|aws|php|FROM\s|WORKDIR|COPY\s|RUN\s|EXPOSE|CMD|ENV\s|\d+\.)/

function renderPratique(text: string): React.ReactNode[] {
  return text.split('\n').map((line, i) => {
    if (line.trim() === '') return <br key={i} />
    if (line.startsWith('#')) return <span key={i} className="til-code-comment">{line}</span>
    const trimmed = line.trimStart()
    const isCode =
      CODE_STARTS.test(trimmed) ||
      trimmed.startsWith('//') ||
      /^[{}$@|><!]/.test(trimmed) ||
      line !== trimmed
    return isCode
      ? <code key={i} className="til-code-line">{line}</code>
      : <p key={i} className="til-pratique-text">{line}</p>
  })
}

export default function TILPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  const entry = entries.find(e => e.slug === slug)
  if (!entry) return <Navigate to="/til" replace />

  return (
    <div className="til-post-page">
      <Head>
        <title>{entry.title} — TIL | Kenny Pignolet</title>
        <meta name="description" content={entry.synthese} />
        <meta property="og:title" content={`${entry.title} — TIL`} />
        <meta property="og:description" content={entry.synthese} />
        <meta property="og:url" content={`https://portfolio-jet-tau-73.vercel.app/til/${entry.slug}`} />
        <link rel="canonical" href={`https://portfolio-jet-tau-73.vercel.app/til/${entry.slug}`} />
      </Head>
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
