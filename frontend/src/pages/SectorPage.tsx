import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { SECTORS, SRC, ADS_NOTE } from '../data/secteurs'
import { ICONS } from '../data/icons'
import type { OfferPage, ProfilePage, Sector, Step } from '../data/secteurs.types'
import '../styles/volcan.css'

/* Page d'un secteur : situation actuelle, constats, puis les trois offres avec leur chronologie.
   La page recruteur suit le même cadre avec un profil technique. */

const SITE = 'https://portfolio-jet-tau-73.vercel.app'
const LINKEDIN = 'https://www.linkedin.com/in/kenny-pignolet'
const CONTACT = '/portfolio#contact'

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Relance une animation CSS portée par une classe. */
const replay = (node: Element | null | undefined, cls: string) => {
  if (!node || reduced()) return
  node.classList.remove(cls); void (node as HTMLElement).offsetWidth; node.classList.add(cls)
}

/* Apparition au défilement : visible par défaut, masqué seulement si l'observateur est actif. */
function useReveal(root: React.RefObject<HTMLElement>, selector: string, stagger: (n: Element, i: number) => number) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    const targets = [...el.querySelectorAll(selector)]
    targets.forEach((n, i) => { n.classList.add('rv'); (n as HTMLElement).style.setProperty('--d', stagger(n, i) + 'ms') })
    if (reduced() || !('IntersectionObserver' in window)) return
    el.classList.add('rv-ready')
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target) }
    }), { threshold: 0.12 })
    targets.forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [root, selector, stagger])
}

function Nav({ slug }: { slug: string }) {
  return (
    <div className="sp-nav">
      <Link className="sp-brand" to="/">Kenny Pignolet</Link>
      <div className="sp-links">
        <Link className="sp-extra" to="/portfolio">Portfolio</Link>
        <a className="sp-extra" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <Link className="sp-back" to="/" state={{ from: slug }}>Changer de secteur</Link>
      </div>
    </div>
  )
}

function Foot() {
  return (
    <footer className="sp-foot">
      <span>Kenny Pignolet, développeur web freelance en Île-de-France</span>
      <a href="https://github.com/kenway974" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <Link to="/portfolio">Portfolio complet</Link>
    </footer>
  )
}

const offerStagger = (n: Element, i: number) => (n.matches('.sit label') ? (i % 5) * 70 : 0)

function OfferView({ page }: { page: OfferPage }) {
  const root = useRef<HTMLDivElement>(null)
  const [sit, setSit] = useState(0)
  const [swapping, setSwapping] = useState(false)
  const [current, setCurrent] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const factsRef = useRef<HTMLUListElement>(null)
  const tlRefs = useRef<(HTMLOListElement | null)[]>([])
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const scrollTimer = useRef(0)
  const first = useRef(true)

  useReveal(root, '.sp > header, .sit-q, .sit label, .facts-box, .sp-h2, .sp-sub, .car, .packs-foot, .sp-cta, .sp-sources', offerStagger)

  const s = page.situations[sit]
  const tlFor = (k: number): Step[] => [...(page.packs[k].pre || []), ...((s.starts && s.starts[k]) || page.packs[k].lead || []), ...page.packs[k].steps]
  const order: string[] = []
  const add = (x: { src?: string[] }) => (x.src || []).forEach(k => { if (!order.includes(k)) order.push(k) })
  s.facts.forEach(add)
  page.packs.forEach((_, k) => tlFor(k).forEach(add))
  const fn = (x: { src?: string[] }): ReactNode => (x.src || []).map(k => (
    <a key={k} className="fn" href={SRC[k].url} target="_blank" rel="noopener noreferrer" title={SRC[k].label}>{order.indexOf(k) + 1}</a>
  ))

  /* Hauteur du carrousel ajustée au pack affiché. */
  const fitHeight = () => {
    const sl = slideRefs.current[current]
    if (sl && track.current) track.current.style.height = sl.offsetHeight + 'px'
  }
  useEffect(() => {
    if (!track.current) return
    const ro = new ResizeObserver(fitHeight)
    ro.observe(track.current)
    slideRefs.current.forEach(sl => sl && ro.observe(sl))
    fitHeight()
    return () => ro.disconnect()
  })

  /* Nouvelle situation : les constats et la chronologie visible se rejouent. */
  useEffect(() => {
    if (first.current) { first.current = false; return }
    replay(factsRef.current, 'play')
    replay(tlRefs.current[current], 'play')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sit])

  const chooseSit = (i: number) => {
    if (reduced()) { setSit(i); return }
    setSwapping(true)
    window.setTimeout(() => { setSit(i); setSwapping(false) }, 200)
  }

  const setTab = (i: number) => {
    if (i !== current) replay(tlRefs.current[i], 'play')
    setCurrent(i)
  }
  const goSlide = (i: number) => {
    const n = Math.max(0, Math.min(page.packs.length - 1, i))
    const t = track.current, sl = slideRefs.current[n]
    if (t && sl) t.scrollTo({ left: sl.offsetLeft - t.offsetLeft, behavior: reduced() ? 'auto' : 'smooth' })
    setTab(n)
    return n
  }
  const onScroll = () => {
    const t = track.current
    if (!t) return
    window.clearTimeout(scrollTimer.current)
    scrollTimer.current = window.setTimeout(() => setTab(Math.round(t.scrollLeft / t.clientWidth)), 80)
  }
  const tabsKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = goSlide(current + d)
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role=tab]')[n]?.focus()
  }

  const sw = `swap${swapping ? ' is-swapping' : ''}`
  return (
    <div className="sp" ref={root}>
      <header><p className="sp-who">{page.who}</p><h1 className="sp-hook">{page.hook}</h1></header>
      <section>
        <p className="sit-q" id="sit-q">Aujourd’hui…</p>
        <fieldset className="sit" aria-labelledby="sit-q">
          {page.situations.map((x, i) => (
            <label key={i}>
              <input type="radio" name="sit" value={i} checked={i === sit} onChange={() => chooseSit(i)} />
              <span>{x.label}</span>
            </label>
          ))}
        </fieldset>
        <div className={`facts-box ${sw}`}>
          <h2 className="facts-h">Ce qui se passe aujourd’hui</h2>
          <ul className="facts" ref={factsRef}>
            {s.facts.map((f, i) => <li key={sit + '-' + i} style={{ '--i': i } as React.CSSProperties}>{f.text}{fn(f)}</li>)}
          </ul>
        </div>
      </section>
      <section>
        <h2 className="sp-h2">Ce que chaque pack change, et quand</h2>
        <p className="sp-sub">{page.sub ?? (page.cumulative === false ? 'Trois façons de travailler ensemble, selon votre besoin.' : 'Trois offres, de la plus simple à la plus complète. Chacune contient la précédente.')}</p>
        <div className="car">
          <div className="car-tabs" role="tablist" aria-label="Packs" onKeyDown={tabsKey}>
            {page.packs.map((k, i) => (
              <button key={i} type="button" role="tab" id={`tab${i}`} aria-controls={`slide${i}`}
                aria-selected={i === current} tabIndex={i === current ? 0 : -1} onClick={() => goSlide(i)}>{k.num}</button>
            ))}
          </div>
          <div className="car-track" tabIndex={-1} ref={track} onScroll={onScroll}>
            {page.packs.map((k, i) => (
              <article key={i} className={`car-slide${i === current ? ' is-current' : ''}`} role="tabpanel" id={`slide${i}`}
                aria-labelledby={`tab${i}`} ref={n => { slideRefs.current[i] = n }}>
                <div className="pk-head">
                  <h3 className="pack-name">{k.name}</h3>
                  <div className="pack-price">
                    <span className="from">À partir de</span>
                    <b>{k.price}</b>
                    {k.ads && <span className="ads">{k.ads}</span>}
                    <span className="delay">{k.delay}</span>
                  </div>
                </div>
                <ul className="pk-items">
                  {k.base && <li className="is-base"><span className="pk-gain">Tout le {page.packs[i - 1].num.toLowerCase()}</span></li>}
                  {k.items.map((x, j) => <li key={j}><span className="pk-gain">{x.g}</span><span className="pk-how">{x.h}</span></li>)}
                </ul>
                <ol className={`tl ${sw}`} ref={n => { tlRefs.current[i] = n }}>
                  {tlFor(i).map((st, j) => (
                    <li key={sit + '-' + j} style={{ '--i': j } as React.CSSProperties}>
                      <span className="tl-ico" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[st.icon] || '' }} />
                      <span className="tl-when">{st.when}</span>
                      <span className="tl-title">{st.title}</span>
                      <p className="tl-text">{st.text}{fn(st)}</p>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
          <div className="car-nav">
            <button className="round" type="button" onClick={() => goSlide(current - 1)} aria-label="Pack précédent">‹</button>
            <button className="round" type="button" onClick={() => goSlide(current + 1)} aria-label="Pack suivant">›</button>
          </div>
        </div>
        <div className="packs-foot">
          {page.packs.some(k => k.ads) && <p><b>Budget pub :</b> {ADS_NOTE}</p>}
          {page.note && (
            <p><b>Règles de la profession :</b> {page.note}
              {page.noteSrc && <> <a className="fn" href={SRC[page.noteSrc].url} target="_blank" rel="noopener noreferrer">source</a></>}
            </p>
          )}
        </div>
      </section>
      <section className="sp-cta">
        <p>Dites-moi où vous en êtes : je vous réponds sous 24 heures avec un devis gratuit et le pack qui vous correspond. Je m’occupe de la mise en place, vous continuez votre activité.</p>
        <a className="btn" href={CONTACT}>Demander un devis gratuit</a>
      </section>
      <ol className="sp-sources">
        {order.map(k => <li key={k}><a href={SRC[k].url} target="_blank" rel="noopener noreferrer">{SRC[k].label}</a></li>)}
      </ol>
    </div>
  )
}

const profileStagger = (n: Element, i: number) => (n.matches('.pf-proj') ? (i % 4) * 80 : 0)

function ProfileView({ page }: { page: ProfilePage }) {
  const root = useRef<HTMLDivElement>(null)
  useReveal(root, '.sp > header, .sp > section, .pf-proj', profileStagger)
  return (
    <div className="sp" ref={root}>
      <header><p className="sp-who">{page.who}</p><h1 className="sp-hook">{page.hook}</h1><p className="pf-intro">{page.intro}</p></header>
      <section>
        <h2 className="sp-h2">Ce que je sais faire</h2>
        <dl className="pf-stack">
          {page.stack.map(g => <div key={g.label}><dt>{g.label}</dt><dd>{g.items.map(x => <span key={x}>{x}</span>)}</dd></div>)}
        </dl>
      </section>
      <section className="pf-projects-wrap">
        <h2 className="sp-h2">Projets à regarder en premier</h2>
        <div className="pf-projects">
          {page.projects.map(pr => (
            <article className="pf-proj" key={pr.name}>
              <p className="pf-proves">{pr.proves}</p>
              <h3 className="pack-name">{pr.name}</h3>
              <p className="pf-desc">{pr.desc}</p>
              <p className="pf-tech">{pr.stack}</p>
              <a className="pf-link" href={pr.url} target="_blank" rel="noopener noreferrer">{pr.link}</a>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="sp-h2">Comment je travaille</h2>
        <ul className="facts pf-work">{page.work.map((w, i) => <li key={i} style={{ '--i': i } as React.CSSProperties}>{w}</li>)}</ul>
      </section>
      <section className="sp-cta">
        <div className="pf-links">
          {page.links.map(l => <a key={l.url} className="btn" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>)}
          <a className="btn btn-ghost" href={CONTACT}>Me contacter</a>
        </div>
        <p>{page.cvNote}</p>
      </section>
    </div>
  )
}

export default function SectorPage({ slug }: { slug: string }) {
  const sector = SECTORS.find(s => s.slug === slug) as Sector
  const page = sector.page
  const title = page.kind === 'profile'
    ? 'Recruteurs : profil de Kenny Pignolet, développeur web'
    : `${sector.name} : offres et délais | Kenny Pignolet`
  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  return (
    <div className="vx vx-page">
      <Head>
        <title>{title}</title>
        <meta name="description" content={sector.pitch} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={sector.pitch} />
        <meta property="og:url" content={`${SITE}/${slug}`} />
        <link rel="canonical" href={`${SITE}/${slug}`} />
      </Head>
      <Nav slug={slug} />
      {page.kind === 'profile' ? <ProfileView page={page} /> : <OfferView page={page} />}
      <Foot />
    </div>
  )
}
