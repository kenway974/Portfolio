import { useEffect, useRef } from 'react'
import { clamp01, easeInOut, useMotionAllowed, useScrollTick } from './motion'

/* Bascule entre les problèmes et l'appel à l'action : la section reste à l'écran pendant qu'on défile ;
   la fissure rouge se referme et devient un fil doré, les points s'alignent. */
export default function Shift({ n, from, to }: { n: number; from: string; to: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const live = useMotionAllowed()
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
        <p className="shift-t shift-a">{from}</p>
        <div className="shift-stage">
          <div className="shift-draw">
            <svg className="shift-crack" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d={d0} vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          {pts.map((q, i) => <span key={i} className="shift-dot" style={{ left: q.x + '%', top: q.y + '%', '--i': i } as React.CSSProperties} />)}
        </div>
        <p className="shift-t shift-b">{to}</p>
      </div>
    </div>
  )
}
