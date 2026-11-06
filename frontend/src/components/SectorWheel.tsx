import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SECTORS, sectorPath } from '../data/secteurs'
import '../styles/volcan.css'

/* Bloc « Vous êtes… ? » de l'accueil : le visiteur choisit son secteur sur une roue qui tourne
   autour du volcan, puis la page du secteur s'ouvre depuis le cratère. */

const BEAMS = [
  { a: -90, top: 14, delay: 0.0, dur: 5.6, max: .18 },
  { a: -45, top: 20, delay: 0.4, dur: 6.0, max: .24 },
  { a: 0, top: 24, delay: 0.1, dur: 6.4, max: .30 },
  { a: 45, top: 20, delay: 0.7, dur: 5.8, max: .24 },
  { a: 90, top: 14, delay: 0.25, dur: 5.4, max: .18 },
]
const N = SECTORS.length
const VISIBLE = Math.min(7, N)    // places sur l'orbite (au plus 7)
const STEP = 360 / VISIBLE        // écart entre deux places
const HALF = VISIBLE / 2          // au-delà, l'entrée attend sous le volcan
const DURATION = 720
const SWIPE = 35                  // glisser : un cran par geste, au lâcher
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)
const INTRO_DELAY = 700           // ouverture : la roue fait un tour complet…
const INTRO_SPIN = 1700           // …et ralentit jusqu'au secteur de départ
const mod = (v: number) => ((v % N) + N) % N

const el = (tag: string, cls?: string) => {
  const n = document.createElement(tag)
  if (cls) n.className = cls
  return n
}

export default function SectorWheel() {
  const stageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const fromSlug = (location.state as { from?: string } | null)?.from

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const replay = (node: HTMLElement, cls: string) => {
      if (REDUCE) return
      node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls)
    }
    const deco = el('div')
    deco.style.display = 'contents'
    stage.prepend(deco)

    for (let i = 0; i < 55; i++) {
      const s = el('span', 'star')
      const size = 1 + Math.random() * 2
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 60}%;width:${size}px;height:${size}px;` +
        `--o:${(0.2 + Math.random() * 0.5).toFixed(2)};--d:${(2 + Math.random() * 3).toFixed(1)}s;--delay:${(Math.random() * 4).toFixed(1)}s`
      deco.append(s)
    }
    const beamWraps = BEAMS.map(b => {
      const w = el('div', 'beam-wrap')
      const beam = el('div', 'beam')
      beam.style.cssText = `--dur:${b.dur}s;--delay:${b.delay}s;--max:${b.max}`
      w.append(beam)
      deco.append(w)
      return w
    })
    const mountain = el('div', 'mountain')
    const crater = el('div', 'crater')
    deco.append(mountain, crater)

    const ui = stage.querySelector<HTMLElement>('.ui')!
    const landing = stage.querySelector<HTMLElement>('.landing')!
    const ring = stage.querySelector<HTMLElement>('.ring')!
    const pitch = ui.querySelector<HTMLElement>('.w-pitch')!
    const items = [...ui.querySelectorAll<HTMLButtonElement>('.w-item')]

    const start = Math.max(0, SECTORS.findIndex(s => s.slug === fromSlug))
    let rot = start, from = start, to = start, t0 = 0, raf = 0, busy = false
    /* Ouverture : jouée à l'arrivée sur le site, pas au retour depuis une page secteur. */
    const INTRO = !REDUCE && !fromSlug
    let spread = INTRO ? 0 : 1, introRaf = 0
    const timers: number[] = []
    const target = () => mod(Math.round(to))

    const hello = ui.querySelector<HTMLElement>('.hello')!
    const bottom = ui.querySelector<HTMLElement>('.w-bottom')!

    /* L'orbite se cale dans l'espace libre : sous le titre avec un vrai écart,
       au-dessus du texte du bas et du cratère. */
    const geom = () => {
      const w = stage.clientWidth, h = stage.clientHeight
      const narrow = w < 560
      const ay = narrow ? 62 : 76
      const gap = narrow ? 39 : 58                        // écart titre / première entrée
      const top = hello.offsetTop + hello.offsetHeight + gap + 20
      const low = Math.min(bottom.offsetTop - 54, h * ay / 100 - (narrow ? 50 : 12))
      const ry = Math.max(40, (low - top) / 1.9)          // les entrées du bas sont à 0,9 × ry sous le centre
      return narrow
        ? { w, h, narrow, ax: 50, ay, half: 58, cy: top + ry, rx: w * 0.34, ry }
        : { w, h, narrow, ax: 50, ay, half: 26, cy: top + ry, rx: Math.min(w * 0.36, h * 0.62), ry }
    }
    type Geom = ReturnType<typeof geom>
    const drawDecor = (g: Geom) => {
      mountain.style.clipPath = `polygon(${g.ax}% ${g.ay}%, ${g.ax - g.half}% 100%, ${g.ax + g.half}% 100%)`
      crater.style.left = g.ax + '%'
      crater.style.top = g.ay + '%'
      const apexY = g.h * g.ay / 100
      beamWraps.forEach((w, i) => {
        const b = BEAMS[i]
        const rad = b.a * Math.PI / 180
        const toTop = Math.cos(rad) > 0.01 ? (apexY + 20) / Math.cos(rad) : Infinity
        const toSide = Math.abs(Math.sin(rad)) > 0.01 ? (g.w / 2 + 20) / Math.abs(Math.sin(rad)) : Infinity
        const len = Math.min(toTop, toSide)
        const width = g.h * b.top / 100
        Object.assign(w.style, {
          left: g.ax + '%', bottom: (100 - g.ay) + '%',
          width: width + 'px', height: len + 'px', marginLeft: (-width / 2) + 'px',
          transform: `rotate(${b.a}deg)`,
        })
      })
    }

    /* Chaque entrée a une distance d (en places) au secteur actif.
       Au-delà de la moitié de l'orbite, elle s'efface sous le volcan et attend son tour. */
    const draw = () => {
      const g = geom()
      drawDecor(g)
      const cx = g.w / 2
      items.forEach((b, i) => {
        const label = g.narrow ? SECTORS[i].short : SECTORS[i].name
        if (b.textContent !== label) b.textContent = label
        let d = ((i - rot) % N + N) % N
        if (d > N / 2) d -= N
        const dc = Math.max(-HALF, Math.min(HALF, d))
        const rad = (-90 + dc * STEP) * Math.PI / 180
        const x = cx + g.rx * Math.cos(rad)
        const y = g.cy + g.ry * Math.sin(rad)
        const top = clamp01(1 - Math.abs(d))
        const fade = clamp01((HALF - Math.abs(d)) / 0.55) * clamp01(spread * 1.6)
        const scale = 0.9 + 0.2 * top
        b.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale.toFixed(3)})`
        b.style.opacity = (fade * (0.8 + 0.2 * top)).toFixed(3)
        b.style.pointerEvents = fade < 0.5 ? 'none' : ''
        b.style.visibility = fade <= 0 ? 'hidden' : ''
        b.style.zIndex = String(Math.round(y))
      })
    }
    const markActive = () => {
      const a = target()
      items.forEach((b, i) => { b.classList.toggle('is-active', i === a); b.tabIndex = i === a ? 0 : -1 })
      replay(items[a], 'pulse')
      pitch.textContent = SECTORS[a].pitch
    }
    const tick = (now: number) => {
      const t = clamp01((now - t0) / DURATION)
      rot = from + (to - from) * easeOut(t)
      draw()
      raf = t < 1 ? requestAnimationFrame(tick) : 0
    }
    const step = (d: number) => {
      if (busy || !d) return
      if (introRaf) { cancelAnimationFrame(introRaf); introRaf = 0; spread = 1 }
      from = rot
      to = Math.round(to) + d
      markActive()
      if (REDUCE) { rot = to; draw(); return }
      t0 = performance.now()
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const goTo = (i: number) => {
      let d = mod(i) - target()
      if (d > N / 2) d -= N
      if (d < -N / 2) d += N
      step(d)
    }

    /* Ouverture : un disque noir sort du cratère, puis la page du secteur prend le relais. */
    const open = () => {
      if (busy) return
      busy = true
      const path = sectorPath(SECTORS[target()].slug)
      if (REDUCE) { navigate(path); return }
      const g = geom()
      const x = g.w * g.ax / 100, y = g.h * g.ay / 100
      const R = Math.hypot(Math.max(x, g.w - x), Math.max(y, g.h - y)) + 30
      stage.classList.add('is-opening')
      landing.style.transition = 'none'
      landing.style.clipPath = `circle(0px at ${x}px ${y}px)`
      landing.hidden = false
      Object.assign(ring.style, { transition: 'none', left: x + 'px', top: y + 'px', width: R * 2 + 'px', height: R * 2 + 'px', transform: 'translate(-50%, -50%) scale(0)', opacity: '1' })
      void landing.offsetWidth
      timers.push(window.setTimeout(() => {
        landing.style.transition = 'clip-path 1.05s var(--reveal)'
        landing.style.clipPath = `circle(${R}px at ${x}px ${y}px)`
        ring.style.transition = 'transform 1.05s var(--reveal), opacity .35s ease .72s'
        ring.style.transform = 'translate(-50%, -50%) scale(1)'
        ring.style.opacity = '0'
      }, 480))
      timers.push(window.setTimeout(() => navigate(path, { state: { via: 'crater' } }), 1560))
    }

    items.forEach((b, i) => { b.onclick = () => (i === target() ? open() : goTo(i)) })
    ui.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach(b => { b.onclick = () => step(Number(b.dataset.dir)) })
    ui.querySelector<HTMLButtonElement>('[data-enter]')!.onclick = open
    stage.onkeydown = e => {
      if (busy) return
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
      if (e.key === 'Enter' && e.target === stage) { e.preventDefault(); open() }
    }
    let x0: number | null = null
    stage.onpointerdown = e => { x0 = e.clientX }
    stage.onpointerup = e => {
      if (x0 == null) return
      const dx = e.clientX - x0
      x0 = null
      if (Math.abs(dx) >= SWIPE) step(dx < 0 ? 1 : -1)
    }
    stage.onpointercancel = () => { x0 = null }
    const ro = new ResizeObserver(draw)
    ro.observe(stage)
    ro.observe(hello)
    markActive()
    draw()

    /* L'ouverture se joue quand la roue arrive à l'écran, pas au chargement de la page. */
    let io: IntersectionObserver | undefined
    if (INTRO) {
      stage.classList.add('intro')
      let i0 = 0
      const introTick = (now: number) => {
        spread = clamp01((now - i0) / INTRO_SPIN)
        rot = to - N * (1 - easeOut(spread))
        draw()
        introRaf = spread < 1 ? requestAnimationFrame(introTick) : 0
      }
      io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        io?.disconnect()
        stage.classList.add('intro-play')
        timers.push(window.setTimeout(() => { i0 = performance.now(); introRaf = requestAnimationFrame(introTick) }, INTRO_DELAY))
        timers.push(window.setTimeout(() => stage.classList.remove('intro', 'intro-play'), 2800))
      }, { threshold: 0.35 })
      io.observe(stage)
    }

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(introRaf)
      stage.classList.remove('intro')
      timers.forEach(clearTimeout)
      ro.disconnect()
      io?.disconnect()
      deco.remove()
    }
  }, [navigate, fromSlug])

  return (
    <section id="secteurs" className="vx wheel-section" aria-labelledby="secteurs-titre">
      <div className="container">
        <div className="stage" ref={stageRef} tabIndex={0} role="region"
          aria-label="Choix du secteur. Flèches gauche et droite pour tourner, Entrée pour ouvrir.">
          <div className="ui">
            <div className="hello">
              <p className="who">Des offres pensées pour votre métier</p>
              <h2 id="secteurs-titre" className="q">Vous êtes… ?</h2>
            </div>
            {SECTORS.map(s => (
              <button key={s.slug} className="w-item" type="button">{s.name}</button>
            ))}
            <div className="w-bottom">
              <p className="w-pitch" aria-live="polite">{SECTORS[0].pitch}</p>
              <div className="w-controls">
                <button className="round" type="button" data-dir="-1" aria-label="Secteur précédent">‹</button>
                <button className="btn" type="button" data-enter="">Entrer</button>
                <button className="round" type="button" data-dir="1" aria-label="Secteur suivant">›</button>
              </div>
              <Link className="w-alt" to="/diagnostic">Vous ne savez pas ? Faites le diagnostic</Link>
              <nav className="sr-only" aria-label="Accès direct aux secteurs">
                {SECTORS.map(s => <Link key={s.slug} to={sectorPath(s.slug)}>{s.name}</Link>)}
              </nav>
            </div>
          </div>
          <div className="landing" hidden />
          <div className="ring" />
        </div>
      </div>
    </section>
  )
}
