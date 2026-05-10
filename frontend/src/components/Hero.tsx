import { useTranslation } from 'react-i18next'
import './Hero.css'

export default function Hero() {
  const { t } = useTranslation()

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" aria-label="Introduction">
      {/* Background orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      {/* Star dots */}
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
        <p className="hero__greeting reveal">
          {t('hero.greeting')}
        </p>
        <h1 className="hero__name reveal reveal-delay-1">
          {t('hero.name')}
          <span className="hero__role reveal reveal-delay-2"> — {t('hero.role')}</span>
        </h1>
        <p className="hero__tagline reveal reveal-delay-3">
          {t('hero.tagline')}
        </p>
        <div className="hero__actions reveal reveal-delay-4">
          <button className="btn-primary" onClick={scrollToContact}>
            {t('hero.cta')} <span aria-hidden="true">→</span>
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
