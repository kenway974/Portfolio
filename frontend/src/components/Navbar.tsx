import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.css'

const LINKEDIN = 'https://www.linkedin.com/in/kenny-pignolet'

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

  useEffect(() => { setMenuOpen(false) }, [location])

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
  }

  const scrollTo = (id: string) => {
    if (location.pathname !== '/portfolio') {
      window.location.href = `/portfolio#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link
          to="/portfolio"
          className="navbar__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="navbar__logo-mark">✦</span> Kenny Pignolet
        </Link>

        <nav className="navbar__links" aria-label="Primary navigation">
          <button onClick={() => scrollTo('services')}>{t('nav.services')}</button>
          <button onClick={() => scrollTo('projects')}>{t('nav.projects')}</button>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">{t('nav.linkedin')}</a>
          <Link to="/blog">{t('nav.blog')}</Link>
          <button onClick={() => scrollTo('contact')}>{t('nav.contact')}</button>
        </nav>

        <div className="navbar__actions">
          <button
            className="lang-toggle"
            onClick={toggleLang}
            aria-label="Switch language"
          >
            {i18n.language === 'en' ? 'FR' : 'EN'}
          </button>

          <button
            className="btn-primary navbar__cta"
            onClick={() => scrollTo('contact')}
          >
            {t('nav.cta')}
          </button>

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

      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <button onClick={() => scrollTo('services')}>{t('nav.services')}</button>
        <button onClick={() => scrollTo('projects')}>{t('nav.projects')}</button>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">{t('nav.linkedin')}</a>
        <Link to="/blog">{t('nav.blog')}</Link>
        <button onClick={() => scrollTo('contact')}>{t('nav.contact')}</button>
        <button className="lang-toggle" onClick={toggleLang}>
          {i18n.language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
        </button>
      </div>
    </header>
  )
}
