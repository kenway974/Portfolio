/* Outils d'animation des pages secteur : mouvement réduit, défilement, apparition, compteurs. */
import { useEffect, useRef, useSyncExternalStore } from 'react'

export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const noSubscribe = () => () => {}

/** Vrai dans le navigateur quand les animations sont autorisées ; faux au build (rendu statique). */
export const useMotionAllowed = () => useSyncExternalStore(noSubscribe, () => !reduced(), () => false)

/* Appelle cb à chaque image où la fenêtre défile ou change de taille (au plus une fois par image). */
export function useScrollTick(cb: () => void, active = true) {
  const fn = useRef(cb)
  useEffect(() => { fn.current = cb })
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
export function countUp(node: HTMLElement | null | undefined, dur = 900) {
  if (!node || reduced()) return
  const full = node.dataset.full ?? node.textContent ?? ''
  node.dataset.full = full
  const m = full.match(/\d[\d \u00a0\u202f]*\d|\d/)
  if (!m) return
  const num = m[0]
  const to = Number(num.replace(/\D/g, ''))
  if (!to) return
  const sep = (num.match(/[ \u00a0\u202f]/) || [' '])[0]
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

/* Apparition au défilement : visible par défaut, masqué seulement si l'observateur est actif. */
export function useReveal(root: React.RefObject<HTMLElement | null>, selector: string, stagger: (n: Element, i: number) => number) {
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
