import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
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
  const mobileMenuRef = useRef<HTMLElement>(null)

  // Menu mobile fermé : ses liens ne doivent pas être atteignables au clavier.
  // Posé par le DOM, car React 18 et React 19 ne typent pas l'attribut inert de la même façon.
  useEffect(() => {
    mobileMenuRef.current?.toggleAttribute('inert', !menuOpen)
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Kenny Pignolet, retour à l'accueil">
          <span className="navbar__logo-mark" aria-hidden="true">✦</span> Kenny Pignolet
        </Link>

        <nav className="navbar__links" aria-label="Navigation principale">
          {LINKS.map(l => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
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
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        aria-label="Navigation mobile"
      >
        {LINKS.map(l => <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</NavLink>)}
      </nav>
    </header>
  )
}
