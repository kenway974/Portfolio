import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { SECTORS } from '../data/secteurs'
import '../styles/volcan.css'

/* Écran d'accueil : le visiteur choisit son secteur sur une roue qui tourne autour du volcan,
   puis la page du secteur s'ouvre depuis le cratère. */

const SITE = 'https://portfolio-jet-tau-73.vercel.app'

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
const mod = (v: number) => ((v % N) + N) % N

const el = (tag: string, cls?: string) => {
  const n = document.createElement(tag)
  if (cls) n.className = cls
  return n
}

export default function Welcome() {
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
    const timers: number[] = []
    const target = () => mod(Math.round(to))

    const geom = () => {
      const w = stage.clientWidth, h = stage.clientHeight
      const narrow = w < 560
      return narrow
        ? { w, h, narrow, ax: 50, ay: 60, half: 58, cy: h * 0.385, rx: w * 0.34, ry: h * 0.15 }
        : { w, h, narrow, ax: 50, ay: 76, half: 26, cy: h * 0.505, rx: Math.min(w * 0.36, h * 0.62), ry: h * 0.235 }
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
        const fade = clamp01((HALF - Math.abs(d)) / 0.55)
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
      const path = '/' + SECTORS[target()].slug
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
      timers.push(window.setTimeout(() => navigate(path), 1560))
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
    markActive()
    draw()
    stage.focus({ preventScroll: true })

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      ro.disconnect()
      deco.remove()
    }
  }, [navigate, fromSlug])

  return (
    <div className="vx vx-stage">
      <Head>
        <title>Kenny Pignolet, développeur web freelance en Île-de-France</title>
        <meta name="description" content="Sites, fiches Google et publicité locale pour les artisans, instituts, garages, avocats et ESN d'Île-de-France. Choisissez votre secteur : situation, offres à partir de 300 € et délais réalistes." />
        <meta property="og:title" content="Kenny Pignolet, développeur web freelance en Île-de-France" />
        <meta property="og:url" content={`${SITE}/`} />
        <link rel="canonical" href={`${SITE}/`} />
      </Head>
      <div className="stage" ref={stageRef} tabIndex={0} role="region"
        aria-label="Choix du secteur. Flèches gauche et droite pour tourner, Entrée pour ouvrir.">
        <div className="ui">
          <div className="hello">
            <h1 className="who">Kenny Pignolet, développeur web freelance en Île-de-France</h1>
            <p className="q">Vous êtes… ?</p>
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
            <a className="w-alt" href="/portfolio">Voir le portfolio complet</a>
            <nav className="sr-only" aria-label="Accès direct aux secteurs">
              {SECTORS.map(s => <a key={s.slug} href={`/${s.slug}`}>{s.name}</a>)}
            </nav>
          </div>
        </div>
        <div className="landing" hidden />
        <div className="ring" />
      </div>
    </div>
  )
}
