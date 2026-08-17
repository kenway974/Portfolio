import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Head } from 'vite-react-ssg'
import entries from '../data/til.json'
import './TILList.css'

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

export default function TILList() {
  const { t } = useTranslation()
  const [activeDomain, setActiveDomain] = useState<string>('Tous')

  const domains = ['Tous', ...Array.from(new Set(entries.map(e => e.domaine)))]
  const filtered = activeDomain === 'Tous'
    ? entries
    : entries.filter(e => e.domaine === activeDomain)

  return (
    <div className="til-list-page">
      <Head>
        <title>Today I Learned — Kenny Pignolet</title>
        <meta name="description" content="39 concepts techniques appris et synthétisés : front-end, back-end, bases de données, DevOps, tests et IA. Le journal d'apprentissage d'un développeur fullstack." />
        <meta property="og:title" content="Today I Learned — Kenny Pignolet" />
        <meta property="og:url" content="https://portfolio-jet-tau-73.vercel.app/til" />
        <link rel="canonical" href="https://portfolio-jet-tau-73.vercel.app/til" />
      </Head>
      <div className="container">
        <div className="til-list-page__header">
          <p className="label">{t('til.label')}</p>
          <h1 className="section-heading">{t('til.heading')}</h1>
          <p className="til-list-page__desc">{t('til.desc')}</p>
        </div>

        <div className="category-filter" role="tablist" aria-label="Filtrer par domaine">
          {domains.map(d => (
            <button
              key={d}
              role="tab"
              aria-selected={activeDomain === d}
              className={`category-btn${activeDomain === d ? ' category-btn--active' : ''}`}
              onClick={() => setActiveDomain(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="til-list-page__grid">
          {filtered.map(entry => (
            <Link
              key={entry.id}
              to={`/til/${entry.slug}`}
              className="til-list-card"
            >
              <div className="til-list-card__meta">
                <span className={`til-domain-badge ${DOMAIN_COLORS[entry.domaine] ?? ''}`}>
                  {entry.domaine}
                </span>
                <span className="blog-card__date">
                  {new Date(entry.date).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="til-list-card__title">{entry.title}</h2>
              <p className="til-list-card__synthese">{entry.synthese}</p>
              <span className="til-list-card__read">{t('til.read')}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
