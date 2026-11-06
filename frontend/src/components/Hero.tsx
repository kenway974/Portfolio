import { Link } from 'react-router-dom'
import { t } from '../i18n'
import Volcano from './Volcano'
import './Hero.css'

// Positions pseudo-aléatoires mais déterministes : identiques au build (SSG)
// et dans le navigateur, pour éviter les erreurs d'hydratation.
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const STARS = Array.from({ length: 60 }, (_, i) => ({
  left: `${seeded(i, 1) * 100}%`,
  top: `${seeded(i, 2) * 100}%`,
  animationDelay: `${seeded(i, 3) * 4}s`,
  animationDuration: `${2 + seeded(i, 4) * 3}s`,
  width: `${1 + seeded(i, 5) * 2}px`,
  height: `${1 + seeded(i, 5) * 2}px`,
  opacity: 0.2 + seeded(i, 6) * 0.5,
}))

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <Volcano />

      <div className="hero__stars" aria-hidden="true">
        {STARS.map((style, i) => <span key={i} className="star" style={style} />)}
      </div>

      <div className="container hero__content">
        <h1 className="hero__badge reveal">{t('hero.badge')}</h1>
        <p className="hero__headline reveal reveal-delay-1">
          {t('hero.headline')}
        </p>
        <p className="hero__sub reveal reveal-delay-2">
          {t('hero.sub')}
        </p>
        <div className="hero__actions reveal reveal-delay-3">
          <Link to="/#contact" className="btn-primary">
            {t('hero.cta')} <span aria-hidden="true">→</span>
          </Link>
          <Link to="/realisations" className="btn-ghost">
            {t('hero.ctaSecondary')}
          </Link>
        </div>

        <div className="hero__scroll-hint reveal reveal-delay-4" aria-hidden="true">
          <span className="scroll-line" />
          <span className="scroll-text">{t('hero.scroll')}</span>
        </div>
      </div>
    </section>
  )
}
