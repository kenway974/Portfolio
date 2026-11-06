/* Page d'un secteur (ou profil recruteur) : mise en page immersive, sans le menu du site. */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import SkipLink from '../components/SkipLink'
import ProblemsView from '../components/sector/ProblemsView'
import ProfileView from '../components/sector/ProfileView'
import { SectorFooter, SectorNav } from '../components/sector/SectorChrome'
import { clamp01, useScrollTick } from '../components/sector/motion'
import { SECTORS, sectorPath } from '../data/secteurs'
import { sectorSchema } from '../seo'
import '../styles/volcan.css'

export default function SectorPage({ slug }: { slug: string }) {
  const sector = SECTORS.find(s => s.slug === slug)
  if (!sector) throw new Error(`Secteur inconnu : ${slug}`)
  const page = sector.page
  const path = sectorPath(slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  /* Arrivée depuis la roue : la page s'ouvre depuis le cratère. Arrivée directe : pas d'attente. */
  const viaCrater = (useLocation().state as { via?: string } | null)?.via === 'crater'
  /* Lueur de braise en bas de l'écran : rouge en haut de page, dorée en arrivant à l'appel à l'action. */
  const glowRef = useRef<HTMLDivElement>(null)
  useScrollTick(() => {
    const el = glowRef.current
    if (!el) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    el.style.setProperty('--pg', (max > 0 ? clamp01(window.scrollY / max) : 0).toFixed(3))
  })

  return (
    <>
      {/* Hors de .vx-page : son container-type pourrait servir de repère au position: fixed. */}
      <div className="vx sp-glow" ref={glowRef} aria-hidden="true" />
      <div className={`vx vx-page${viaCrater ? ' from-crater' : ''}`}>
        <Seo
          title={page.title}
          description={page.description}
          path={path}
          image={path.slice(1)}
          imageAlt={page.h1}
          jsonLd={sectorSchema(sector)}
        />
        <SkipLink />
        <SectorNav slug={slug} />
        <main id="contenu">
          {page.kind === 'profile' ? <ProfileView page={page} /> : <ProblemsView sector={sector} page={page} />}
        </main>
        <SectorFooter />
      </div>
    </>
  )
}
