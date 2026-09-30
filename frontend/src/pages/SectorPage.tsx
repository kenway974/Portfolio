import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/* Appelle cb à chaque image où la fenêtre défile ou change de taille (au plus une fois par image). */
function useScrollTick(cb: () => void, active = true) {
  const fn = useRef(cb)
  fn.current = cb
  useEffect(() => {
    if (!active || reduced()) return
    let raf = 0
    const run = () => { raf = 0; fn.current() }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [active])
}

/* Fait défiler le nombre d'un texte (« 1 200 € », « 99 % ») de 0 jusqu'à sa valeur, puis remet le texte exact. */
const counting = new WeakMap<HTMLElement, number>()
function countUp(node: HTMLElement | null | undefined, dur = 900) {
  if (!node || reduced()) return
  const full = node.dataset.full ?? node.textContent ?? ''
  node.dataset.full = full
  const m = full.match(/\d[\d   ]*\d|\d/)
  if (!m) return
  const num = m[0]
  const to = Number(num.replace(/\D/g, ''))
  if (!to) return
  const sep = (num.match(/[   ]/) || [' '])[0]
  const fmt = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, sep)
  cancelAnimationFrame(counting.get(node) || 0)
  const t0 = performance.now()
  const tick = (now: number) => {
    const t = clamp01((now - t0) / dur)
    node.textContent = t < 1 ? full.replace(num, fmt(Math.round(to * easeOut(t)))) : full
    if (t < 1) counting.set(node, requestAnimationFrame(tick))
  }
  counting.set(node, requestAnimationFrame(tick))
}
const inView = (n: Element | null | undefined) => {
  if (!n) return false
  const r = n.getBoundingClientRect()
  return r.top < window.innerHeight && r.bottom > 0
}

/* Accroche : les mots montent un à un, comme de la chaleur. */
function Hook({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <h1 className="sp-hook">
      {words.map((w, i) => (
        <span key={i}><span className="w" style={{ '--w': i } as React.CSSProperties}>{w}</span>{i < words.length - 1 ? ' ' : ''}</span>
      ))}
    </h1>
  )
}

/* Chiffres des constats mis en valeur (ils défilent à l'apparition). */
const withStats = (text: string): ReactNode =>
  text.split(/(\d+[   ]?%)/).map((part, i) => (i % 2 ? <b key={i} className="stat">{part}</b> : part))

/* Bascule entre les constats et les offres : la section reste à l'écran pendant qu'on défile ;
   la fissure rouge se referme et devient un fil doré, les points s'alignent comme les étapes d'une frise. */
function Shift({ n }: { n: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)
  useEffect(() => { if (!reduced()) setLive(true) }, [])
  const count = Math.max(3, n)
  const pts = Array.from({ length: count }, (_, i) => ({
    x: 12 + (76 * i) / (count - 1),
    y: 50 + (i % 2 ? 1 : -1) * (22 + (i % 3) * 7),
  }))
  const tick = () => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const run = r.height - window.innerHeight
    const p = run > 0 ? clamp01(-r.top / run) : 1
    const draw = clamp01((p + 0.12) / 0.3)
    const flat = easeInOut(clamp01((p - 0.28) / 0.42))
    const glow = clamp01((p - 0.72) / 0.22)
    el.style.setProperty('--draw', draw.toFixed(3))
    el.style.setProperty('--flat', flat.toFixed(3))
    el.style.setProperty('--glow', glow.toFixed(3))
    const ys = pts.map(q => q.y + (50 - q.y) * flat)
    const path = el.querySelector('.shift-crack path')
    if (path) {
      const mid = (a: number, b: number, k: number) => 50 + ((a + b) / 2 - 50 + (k % 2 ? 9 : -9)) * (1 - flat)
      let d = `M0 ${(50 + 12 * (1 - flat)).toFixed(2)}`
      pts.forEach((q, i) => {
        if (i > 0) d += ` L${((pts[i - 1].x + q.x) / 2).toFixed(2)} ${mid(ys[i - 1], ys[i], i).toFixed(2)}`
        d += ` L${q.x.toFixed(2)} ${ys[i].toFixed(2)}`
      })
      d += ` L100 ${(50 - 10 * (1 - flat)).toFixed(2)}`
      path.setAttribute('d', d)
    }
    el.querySelectorAll<HTMLElement>('.shift-dot').forEach((dot, i) => { dot.style.top = ys[i] + '%' })
  }
  useScrollTick(tick, live)
  useEffect(() => { if (live) tick() })
  const d0 = `M0 62 ${pts.map((q, i) => (i > 0 ? `L${(pts[i - 1].x + q.x) / 2} ${(pts[i - 1].y + q.y) / 2 + (i % 2 ? 9 : -9)} ` : '') + `L${q.x} ${q.y}`).join(' ')} L100 40`
  return (
    <div className={`shift${live ? ' is-live' : ''}`} ref={ref} aria-hidden="true">
      <div className="shift-pin">
        <p className="shift-t shift-a">Voilà ce qui se passe aujourd’hui.</p>
        <div className="shift-stage">
          <div className="shift-draw">
            <svg className="shift-crack" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d={d0} vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          {pts.map((q, i) => <span key={i} className="shift-dot" style={{ left: q.x + '%', top: q.y + '%', '--i': i } as React.CSSProperties} />)}
        </div>
        <p className="shift-t shift-b">Voilà ce qui peut changer, et quand.</p>
      </div>
    </div>
  )
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

  useReveal(root, '.sit-q, .sit label, .facts-box, .sp-h2, .sp-sub, .car, .packs-foot, .sp-cta, .sp-sources', offerStagger)

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

  /* Nouvelle situation : les constats se rejouent et leurs chiffres défilent. */
  const countStats = () => factsRef.current?.querySelectorAll<HTMLElement>('.stat').forEach(b => countUp(b, 1100))
  useEffect(() => {
    if (first.current) { first.current = false; return }
    replay(factsRef.current, 'play')
    if (inView(factsRef.current)) countStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sit])

  /* Première apparition des constats et des packs : les chiffres et le prix défilent une fois. */
  const carRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return
      io.unobserve(e.target)
      if (e.target === factsRef.current) countStats()
      else countUp(slideRefs.current[currentRef.current]?.querySelector<HTMLElement>('.pack-price b'))
    }), { threshold: 0, rootMargin: '0px 0px -30% 0px' })  /* un pack peut être plus haut que l'écran */
    if (factsRef.current) io.observe(factsRef.current)
    if (carRef.current) io.observe(carRef.current)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const currentRef = useRef(0)
  currentRef.current = current
  const firstTab = useRef(true)
  useEffect(() => {
    if (firstTab.current) { firstTab.current = false; return }
    countUp(slideRefs.current[current]?.querySelector<HTMLElement>('.pack-price b'), 700)
  }, [current])

  /* Frise pilotée par le défilement : le fil doré descend avec la lecture,
     chaque étape s'allume quand il l'atteint et s'éteint si l'on remonte. */
  const [tlLive, setTlLive] = useState(false)
  useEffect(() => {
    if (reduced()) return
    /* Classe posée à la main : useReveal ajoute aussi les siennes sur cette racine. */
    root.current?.classList.add('tl-live')
    setTlLive(true)
  }, [])
  const tlTick = () => {
    const line = window.innerHeight * 0.66
    const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
    /* Toutes les mesures d'abord, puis toutes les écritures : pas de recalcul de mise en page par étape. */
    const reads = tlRefs.current.map(tl => {
      if (!tl) return null
      const r = tl.getBoundingClientRect()
      const lis = [...tl.querySelectorAll('li')]
      return { tl, q: atEnd ? 1 : clamp01((line - r.top - 8) / Math.max(1, r.height - 16)), lis, lit: lis.map(li => atEnd || li.getBoundingClientRect().top + 12 < line) }
    })
    reads.forEach(m => {
      if (!m) return
      m.tl.style.setProperty('--q', m.q.toFixed(3))
      m.lis.forEach((li, i) => li.classList.toggle('lit', m.lit[i]))
    })
  }
  useScrollTick(tlTick, tlLive)
  useEffect(() => { if (tlLive) tlTick() })

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
  const layered = page.cumulative !== false
  return (
    <div className="sp" ref={root}>
      <header><p className="sp-who">{page.who}</p><Hook text={page.hook} /></header>
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
            {s.facts.map((f, i) => <li key={sit + '-' + i} style={{ '--i': i } as React.CSSProperties}>{withStats(f.text)}{fn(f)}</li>)}
          </ul>
        </div>
      </section>
      <Shift n={s.facts.length} />
      <section>
        <h2 className="sp-h2">Ce que chaque pack change, et quand</h2>
        <p className="sp-sub">{page.sub ?? (page.cumulative === false ? 'Trois façons de travailler ensemble, selon votre besoin.' : 'Trois offres, de la plus simple à la plus complète. Chacune contient la précédente.')}</p>
        <div className="car" ref={carRef}>
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
                  {layered && i > 0 && (
                    /* Couches : le pack se pose sur les précédents, comme les strates d'un volcan. */
                    <div className="strata" aria-hidden="true">
                      {page.packs.slice(0, i).reverse().map((p, j) => (
                        <span key={p.num} style={{ '--j': j, '--n': i } as React.CSSProperties}>{p.num} · {p.name}</span>
                      ))}
                    </div>
                  )}
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

const profileStagger = (n: Element, i: number) => (n.matches('.pf-proj, .pf-skill') ? (i % 4) * 80 : 0)

function ProfileView({ page }: { page: ProfilePage }) {
  const root = useRef<HTMLDivElement>(null)
  useReveal(root, '.sp > section, .pf-skill, .pf-proj', profileStagger)
  return (
    <div className="sp" ref={root}>
      <header><p className="sp-who">{page.who}</p><Hook text={page.hook} /><p className="pf-intro">{page.intro}</p></header>
      <section>
        <h2 className="sp-h2">Ce que je sais faire</h2>
        <div className="pf-skills">
          {page.skills.map(g => (
            <div className="pf-skill" key={g.label}>
              <h3 className="pf-skill-h">{g.label}</h3>
              <ul className="pk-items">
                {g.items.map(x => <li key={x.g}><span className="pk-gain">{x.g}</span><span className="pk-how">{x.h}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
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
        <h2 className="sp-h2">Les outils que j’utilise</h2>
        <p className="sp-sub">Une compétence n’est pas un outil : ceux-là sont ceux que je connais aujourd’hui, pas une limite.</p>
        <dl className="pf-stack">
          {page.stack.map(g => <div key={g.label}><dt>{g.label}</dt><dd>{g.items.map(x => <span key={x}>{x}</span>)}</dd></div>)}
        </dl>
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
  /* Arrivée depuis la roue : la page s'ouvre depuis le cratère. Arrivée directe : pas d'attente. */
  const viaCrater = (useLocation().state as { via?: string } | null)?.via === 'crater'
  /* Lueur de braise en bas de l'écran : rouge en haut de page, dorée en arrivant aux offres et au devis. */
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
    </>
  )
}
