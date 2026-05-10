import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.css'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
  }

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Wordmark */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">✦</span> Alex Moreau
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Primary navigation">
          <button onClick={() => scrollTo('about')}>{t('nav.about')}</button>
          <button onClick={() => scrollTo('projects')}>{t('nav.projects')}</button>
          <Link to="/blog">{t('nav.blog')}</Link>
          <button onClick={() => scrollTo('contact')}>{t('nav.contact')}</button>
        </nav>

        <div className="navbar__actions">
          {/* Language toggle */}
          <button
            className="lang-toggle"
            onClick={toggleLang}
            aria-label="Switch language"
          >
            {i18n.language === 'en' ? 'FR' : 'EN'}
          </button>

          {/* CTA */}
          <button
            className="btn-primary navbar__cta"
            onClick={() => scrollTo('contact')}
          >
            {t('hero.cta')}
          </button>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <button onClick={() => scrollTo('about')}>{t('nav.about')}</button>
        <button onClick={() => scrollTo('projects')}>{t('nav.projects')}</button>
        <Link to="/blog">{t('nav.blog')}</Link>
        <button onClick={() => scrollTo('contact')}>{t('nav.contact')}</button>
        <button className="lang-toggle" onClick={toggleLang}>
          {i18n.language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
        </button>
      </div>
    </header>
  )
}
