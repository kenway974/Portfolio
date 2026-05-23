import { useTranslation } from 'react-i18next'
import './Hero.css'

export default function Hero() {
  const { t } = useTranslation()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      <div className="hero__stars" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            opacity: 0.2 + Math.random() * 0.5,
          }} />
        ))}
      </div>

      <div className="container hero__content">
        <span className="hero__badge reveal">{t('hero.badge')}</span>
        <h1 className="hero__headline reveal reveal-delay-1">
          {t('hero.headline')}
        </h1>
        <p className="hero__sub reveal reveal-delay-2">
          {t('hero.sub')}
        </p>
        <div className="hero__actions reveal reveal-delay-3">
          <button className="btn-primary" onClick={() => scrollTo('contact')}>
            {t('hero.cta')} <span aria-hidden="true">→</span>
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('projects')}>
            {t('hero.ctaSecondary')}
          </button>
        </div>

        <div className="hero__scroll-hint reveal reveal-delay-4" aria-hidden="true">
          <span className="scroll-line" />
          <span className="scroll-text">{t('hero.scroll')}</span>
        </div>
      </div>
    </section>
  )
}
