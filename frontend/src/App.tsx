import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SkipLink from './components/SkipLink'

/** Gère le défilement lors des navigations : vers l'ancre (#services…) ou en haut de page. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash, key])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <SkipLink />
      <Navbar />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
