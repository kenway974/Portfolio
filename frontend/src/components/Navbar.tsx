import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { t } from '../i18n'
import './Navbar.css'

// Vrais liens <a href> : Google peut les suivre, contrairement aux boutons JS.
const LINKS = [
  { to: '/services', label: t('nav.services') },
  { to: '/realisations', label: t('nav.projects') },
  { to: '/blog', label: t('nav.blog') },
  { to: '/contact', label: t('nav.contact') },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark" aria-hidden="true">✦</span> Kenny Pignolet
        </Link>

        <nav className="navbar__links" aria-label="Navigation principale">
          {LINKS.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </nav>

        <div className="navbar__actions">
          <Link to="/contact" className="btn-primary navbar__cta">
            {t('nav.cta')}
          </Link>

          <button
            className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        aria-label="Navigation mobile"
      >
        {LINKS.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
      </nav>
    </header>
  )
}
