/* Page d'un secteur : les problèmes fréquents du métier, ce qu'ils coûtent, et un appel à l'action. */
import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs'
import Shift from './Shift'
import { Hook } from './SectorChrome'
import { Footnotes, SourceList } from './Sources'
import { contactMessage, sourceOrder } from './text'
import { countUp, reduced, useReveal } from './motion'
import { sectorPath } from '../../data/secteurs'
import type { ProblemsPage, Sector } from '../../data/secteurs.types'

/* Les pourcentages des constats sont mis en valeur (ils défilent à l'apparition). */
const withStats = (text: string): ReactNode =>
  text.split(/(\d+[  ]?%)/).map((part, i) => (i % 2 ? <b key={i} className="stat">{part}</b> : part))

const stagger = (n: Element, i: number) => (n.matches('.pb') ? (i % 2) * 90 : 0)

export default function ProblemsView({ sector, page }: { sector: Sector; page: ProblemsPage }) {
  const root = useRef<HTMLDivElement>(null)
  useReveal(root, '.sp-h2, .sp-sub, .pb, .sp-note, .sp-cta', stagger)

  // Chaque chiffre défile une fois, quand il arrive à l'écran.
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window) || !root.current) return
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { io.unobserve(e.target); countUp(e.target as HTMLElement, 1100) }
    }), { rootMargin: '0px 0px -20% 0px' })
    root.current.querySelectorAll('.stat').forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [])

  const order = sourceOrder([...page.problems.flatMap(p => p.facts), { src: page.note?.src ? [page.note.src] : [] }])
  const path = sectorPath(sector.slug)

  return (
    <div className="sp" ref={root}>
      <header>
        <Breadcrumbs items={[['Accueil', '/'], [sector.name, path]]} />
        <p className="sp-who">{page.who}</p>
        <Hook text={page.h1} />
        <p className="sp-intro">{page.intro}</p>
        <div className="sp-actions">
          <a className="btn" href="#problemes">Voir les problèmes fréquents</a>
          <Link className="btn btn-ghost" to="/diagnostic">Faire le diagnostic gratuit</Link>
        </div>
      </header>

      <section id="problemes" aria-labelledby="problemes-titre">
        <h2 className="sp-h2" id="problemes-titre">Ce qui vous freine peut-être aujourd’hui</h2>
        <p className="sp-sub">
          {page.problems.length} situations fréquentes, et ce qu’elles coûtent à votre activité.
          Vous vous reconnaissez dans l’une d’elles ? Dites-le-moi en un clic.
        </p>
        <ol className="pb-list">
          {page.problems.map((p, i) => (
            <li key={p.title} className="pb">
              <article aria-labelledby={`pb-${i}`}>
                <span className="pb-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="pb-title" id={`pb-${i}`}>{p.title}</h3>
                <ul className="facts">
                  {p.facts.map(f => <li key={f.text}>{withStats(f.text)}<Footnotes src={f.src} order={order} /></li>)}
                </ul>
                <div className="pb-impact">
                  <p className="pb-impact-h">Ce que ça vous coûte</p>
                  <p>{p.impact}</p>
                </div>
                <div className="pb-actions">
                  <Link className="btn btn-sm" to="/contact" state={{ service: p.service, message: contactMessage(sector.name, p.title) }}>
                    C’est mon cas
                  </Link>
                  <Link className="pb-link" to={`/services/${p.service}`}>Comment on règle ça →</Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <Shift n={page.problems.length} from="Voilà ce qui vous coûte aujourd’hui." to="Voilà ce qu’on peut changer ensemble." />

      {page.note && (
        <aside className="sp-note" aria-label="Bon à savoir">
          <p><b>Bon à savoir :</b> {page.note.text}
            {page.note.src && <Footnotes src={[page.note.src]} order={order} />}
          </p>
        </aside>
      )}

      <section className="sp-cta" aria-labelledby="cta-titre">
        <h2 className="sp-h2" id="cta-titre">Vous vous reconnaissez dans l’une de ces situations ?</h2>
        <p>
          Dites-moi où vous en êtes : je vous réponds sous 48 heures avec une première analyse, sans engagement.
          Vous continuez votre activité, je m’occupe de la mise en place.
        </p>
        <div className="sp-actions">
          <Link className="btn" to="/contact" state={{ message: contactMessage(sector.name) }}>Parlons de votre situation</Link>
          <Link className="btn btn-ghost" to="/diagnostic">Faire le diagnostic gratuit</Link>
        </div>
      </section>

      <SourceList order={order} />
    </div>
  )
}
